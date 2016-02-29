import React from 'react';
import {Link}  from 'react-router';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';

import Listitem from './WhatsnewListitem';


export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status')],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  onClickSelectActivity(id) {
    window.location.assign("#/activity/" + id);
  },

  render() {

    if (!this.state.language || (this.state.language && !this.state.language.loaded)) {
      return <div></div>;
    }

    if (this.state.status && this.state.status.community) {
      if (this.state.data && this.state.data.communities && this.state.data.communities[this.state.status.community]) {
        var communityName = this.state.data.communities[this.state.status.community].name;
      }
    }

    var whatsnewItem = function(item) {
      return ( <Listitem key={item.id} data={item} onClickHandler={this.onClickSelectActivity}></Listitem> );
    }.bind(this);

    var list = [];
    if (this.state.data.loaded.whatsnew) {
      Object.keys(this.state.data.whatsnew).map(function(id) {

        // -todo- check if this item is relevant to user!

        var item = this.state.data.whatsnew[id];

        // load activity
        item.activity = {};
        if (this.state.data.loaded.activities && item.activityId) {
          item.activity = this.state.data.activities[item.activityId];
        }

        // load person
        item.person = {};
        if (this.state.data.loaded.people && item.personId) { // item.personId is actually always there, checked in datastore
          item.person = this.state.data.people[item.personId];
        }

        // load group
        item.group = {};
        if (this.state.data.loaded.groups && item.groupId) {
          item.group = this.state.data.groups[item.groupId];
        }

        list.push(item);
      }.bind(this))
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
