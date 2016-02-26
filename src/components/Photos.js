import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';

import PhotoList from './PhotoList';

export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status')],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  onClickSelectActivity(id) {
    window.location.assign("#/photos/" + id);
  },

  render() {
    var communityName = "";

    if (this.state.status && this.state.status.community) {
      if (this.state.data && this.state.data.loaded.communities && this.state.data.communities[this.state.status.community]) {
        communityName = this.state.data.communities[this.state.status.community].name;
      }
    }

    var activityItem = function(id) {
      var d = this.state.data.activities[id];
      return ( <PhotoList key={id} data={d} onClickHandler={this.onClickSelectActivity}></PhotoList> );
    }.bind(this);

    var myActivities = [],
        foundActivities = false,
        loadedData = false;

    if (this.state.data && this.state.data.loaded.activities && this.state.data.groups && this.state.data.loaded.groups && this.state.status && this.state.status.community) {
      loadedData = true;
      myActivities = Object.keys(this.state.data.activities).filter(
        function(activityID) {
          var activity = this.state.data.activities[activityID];
          var now = new Date();
          var date = new Date(activity.date);
          // check if this activity is in the past
          if(date > now) {
            return false;
          }
          // check if this activity is in a group that is in this community
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
      listActivities = <div className="container text-center box white half"><h2><FormattedMessage id='nophotos' values={{communityName: communityName}}/></h2></div>;
    }
    if (!loadedData) {
      listActivities = <div className="container text-center box white half"><h2><FormattedMessage id='loading'/></h2></div>;
    }

    var header =
      <div className="jumbotron container text-center">
        <h1><FormattedMessage id='photos_in' values={{communityName: communityName}}/></h1>
      </div>

    return (
      <div>
        {listActivities}
      </div>
    );
  }
});
