import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import Helpers from '../stores/Helpers.js';

import Listitem from './WhatsnewListitem';


export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status') ],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
    StatusActions.setCurrentPage('whatsnew');
  },

  onClickSelectActivity(id) {
    window.location.assign('#/' + id);
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this)) {
      return <div></div>;
    }

    var communityName = Helpers.getCommunityFromStatus(this).name;

    var whatsnewItem = function(item) {
      return ( <Listitem key={item.id} data={item} onClickHandler={this.onClickSelectActivity}></Listitem> );
    }.bind(this);

    var list = [];
    if (this.state.data.loaded.whatsnew) {
      list = this.state.data.whatsnew.filter(function(item) {

        // -todo- check if this item is relevant to user!

        // load activity
        item.activity = {};
        if (this.state.data.loaded.activities && item.activityId) {
          item.activity = Helpers.getActivityById(item.activityId, this);
          // item.activity = this.state.data.activities[item.activityId];
        }

        // load person
        item.person = {};
        if (this.state.data.loaded.people && item.personId) { // item.personId is actually always there, checked in datastore
          item.person = Helpers.getPersonById(item.personId, this);
          // item.person = this.state.data.people[item.personId];
        }

        // load group
        item.group = {};
        if (this.state.data.loaded.groups && item.groupId) {
          item.group = Helpers.getGroupById(item.groupId, this);
          // item.group = this.state.data.groups[item.groupId];
        }

        return true;

      }.bind(this));

    }

    var header = <div className="container text-center">
          <h1><FormattedMessage id='whatsnew_in' values={{communityName: communityName}}/></h1>
        </div>;

    return (
      <div className="container">
        {list.map(whatsnewItem,this)}
      </div>
    );
  }
});
