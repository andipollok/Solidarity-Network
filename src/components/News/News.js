import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Listitem from './NewsListitem';


export default React.createClass({

  componentWillMount() {
    StatusActions.setArea('news');
  },

  onClickSelectItem(url) {
    window.location.assign('#/' + url);
  },

  render() {

    var data = this.props.data;

    var list = [];

    list = data.whatsnew.filter(function(item) {

      // -todo- check if this item is relevant to user!

      // load activity
      item.activity = {};
      if (data.loaded.activities && item.activityId) {
        item.activity = Helpers.getActivityById(item.activityId, data);
        if (!item.activity) {
          return false;
        }
        // check if that activity is in the user's community
        var group = Helpers.getGroupById(item.activity.groupId, data);
        if (!group) {
          return false;
        }
        var community = Helpers.getCommunityById(group.communityId, data);
        if (community.id !== data.status.community) {
          return false; // filter this entry if item is not in the community
        }
      }

      // load person
      item.person = {};
      if (data.loaded.people && item.personId) { // item.personId is actually always there, checked in datastore
        item.person = Helpers.getPersonById(item.personId, data);
      }

      // load group
      item.group = {};
      if (data.loaded.groups && item.groupId) {
        item.group = Helpers.getGroupById(item.groupId, data);
        // check if that group is in the user's community
        var community = Helpers.getCommunityById(item.group.communityId, data);
        if (community.id !== data.status.community) {
          return false; // filter this entry if item is not in the community
        }
      }

      return true;

    }.bind(this));

    var whatsnewItem = function(item) {
      return ( <Listitem key={item.id} item={item} data={data} onClickHandler={this.onClickSelectItem}></Listitem> );
    }.bind(this);

    var Component = {};
    if (list.length === 0) {
      // no events found
      Component = 
      <Row>
        <Col className="container text-center box white half">
          <h2><FormattedMessage id='nowhatsnew' values={{communityName: data.community.name}}/></h2>
        </Col>
      </Row>;
    }
    else {
      Component = <Row>{list.map(whatsnewItem,this)}</Row>;
    }

    var header = <div className="container text-center">
          <h1><FormattedMessage id='whatsnew_in' values={{communityName: data.community.name}}/></h1>
        </div>;

    return (
      <div className="container top-buffer news">
        {Component}
      </div>
    );
  }
});
