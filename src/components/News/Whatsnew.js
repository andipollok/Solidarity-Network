import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../../stores/DataActions';
import DataStore from '../../stores/DataStore';
import LanguageActions from '../../stores/LanguageActions';
import LanguageStore from '../../stores/LanguageStore';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Listitem from './WhatsnewListitem';


export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status') ],

  componentWillMount() {
    StatusActions.historyAdd({
      title: 'News',
      url: '',
      pathname: '/whatsnew'
    });
    StatusActions.setArea('whatsnew');
  },

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  onClickSelectItem(url) {
    console.log('click on whatsnew item', url);
    // -todo- for some reason this does not work on ipad!
    window.location.assign('#/' + url);
  },

  render() {
    if (!Helpers.checkLanguageLoaded(this) || !(this.state.status && this.state.status.community) || !(this.state.data && this.state.data.loaded.whatsnew)) {
      return <div></div>;
    }

    var community = Helpers.getCommunityFromStatus(this);

    var list = [];

    list = this.state.data.whatsnew.filter(function(item) {

      // -todo- check if this item is relevant to user!

      // load activity
      item.activity = {};
      if (this.state.data.loaded.activities && item.activityId) {
        item.activity = Helpers.getActivityById(item.activityId, this);
        if (!item.activity) {
          return false;
        }
        // check if that activity is in the user's community
        var group = Helpers.getGroupById(item.activity.groupId, this);
        if (!group) {
          return false;
        }
        var community = Helpers.getCommunityById(group.communityId, this);
        if (community.id !== this.state.status.community) {
          return false; // filter this entry if item is not in the community
        }
      }

      // load person
      item.person = {};
      if (this.state.data.loaded.people && item.personId) { // item.personId is actually always there, checked in datastore
        item.person = Helpers.getPersonById(item.personId, this);
      }

      // load group
      item.group = {};
      if (this.state.data.loaded.groups && item.groupId) {
        item.group = Helpers.getGroupById(item.groupId, this);
        // check if that group is in the user's community
        var community = Helpers.getCommunityById(item.group.communityId, this);
        if (community.id !== this.state.status.community) {
          return false; // filter this entry if item is not in the community
        }
      }

      return true;

    }.bind(this));

    var whatsnewItem = function(item) {
      return ( <Listitem key={item.id} data={item} onClickHandler={this.onClickSelectItem}></Listitem> );
    }.bind(this);

    var Component = {};
    if (list.length === 0) {
      // no events found
      Component = 
      <Row>
        <Col className="container text-center box white half">
          <h2><FormattedMessage id='nowhatsnew' values={{communityName: community.name}}/></h2>
        </Col>
      </Row>;
    }
    else {
      Component = <Row>{list.map(whatsnewItem,this)}</Row>;
    }

    var header = <div className="container text-center">
          <h1><FormattedMessage id='whatsnew_in' values={{communityName: community.name}}/></h1>
        </div>;

    return (
      <div className="container top-buffer whatsnew">
        {Component}
      </div>
    );
  }
});
