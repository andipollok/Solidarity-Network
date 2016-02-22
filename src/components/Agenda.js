import React from 'react';
import classNames from 'classnames';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';

import ListActivity from './ListActivity';

export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status')],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  onClickSelectActivity(id) {
    console.log("Clicked on activity " + id);
  },

  render() {
    var communityName = "",
        communityComponent = "";

    if (this.state.status && this.state.status.community) {
      if (this.state.data && this.state.data.loaded.communities && this.state.data.communities[this.state.status.community]) {
        communityName = this.state.data.communities[this.state.status.community].name;
        communityComponent = <span>in {communityName}</span>;
      }
    }

    var activityItem = function(id) {
      var d = this.state.data.activities[id];
      return ( <ListActivity key={id} data={d} onClickHandler={this.onClickSelectActivity}></ListActivity> );
    }.bind(this);

    var myActivities = [],
        foundActivities = false,
        loadedData = false;

    if (this.state.data && this.state.data.loaded.activities && this.state.data.groups && this.state.data.loaded.groups && this.state.status && this.state.status.community) {
      loadedData = true;
      myActivities = Object.keys(this.state.data.activities).filter(
        function(activityID) {
          // check if this activity is in a group that is in this community
          var activity = this.state.data.activities[activityID];
          var groupID = activity.group;
          if (this.state.data.groups[groupID]) {
            var communityID = this.state.data.groups[groupID].community;
            return communityID === this.state.status.community;
          }
          else {
            return false;
          }
        }.bind(this));
      if (myActivities.length > 0) { foundActivities = true; }
    }

    var listActivities = <div className="container">{myActivities.map(activityItem, this)}</div>;
    if (!foundActivities && loadedData) {
      listActivities = <div className="container centered box white half"><h2>Sorry, there are no activities planned in {communityName}.</h2></div>;
    }
    if (!loadedData) {
      listActivities = <div className="container centered box white half"><h2>Loading…</h2></div>;
    }

    return (
      <div>
        <div className="jumbotron container centered">
          <h1>Agenda {communityComponent}</h1>
        </div>{loadedData} {foundActivities}
          {listActivities}
      
      </div>
    );
  }
});
