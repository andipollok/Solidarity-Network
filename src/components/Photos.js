import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import Helpers from '../stores/Helpers.js';

import Listitem from './PhotoListitem';


export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status') ],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
    StatusActions.setCurrentPage('photos');
  },

  onClickSelectActivity(id) {
    window.location.assign("#/photos/" + id);
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this)) {
      return <div></div>;
    }

    var community = Helpers.getCommunityFromStatus(this);

    var activityItem = function(activity) {
      return ( <Listitem key={activity.id} data={activity} onClickHandler={this.onClickSelectActivity}></Listitem> );
    }.bind(this);

    var myActivities = [],
        foundActivities = false,
        loadedData = false;

    if (this.state.data && this.state.data.loaded.activities && this.state.data.groups && this.state.data.loaded.groups && this.state.status && this.state.status.community) {
      loadedData = true;
      myActivities = this.state.data.activities.filter(
        function(activity) {
          var now = new Date();
          var date = new Date(activity.date);
          // check if this activity is in the past
          if(date >= now) {
            return false;
          }
          // check if this activity is in a group that is in this community
          var group = Helpers.getGroupById(activity.groupId, this);
          var community = Helpers.getCommunityById(group.communityId, this);
          if (community.id !== this.state.status.community) {
            return false;
          }
          return true;
        }.bind(this));
      if (myActivities.length > 0) { foundActivities = true; }
    }
    myActivities.reverse();

    var listActivities = <Row>{myActivities.map(activityItem, this)}</Row>;
    if (!foundActivities && loadedData) {
      listActivities = <Col className="text-center box white half"><h2><FormattedMessage id='nophotos' values={{communityName: community.name}}/></h2></Col>;
    }
    if (!loadedData) {
      listActivities = <Col className="text-center box white half"><h2><FormattedMessage id='loading'/></h2></Col>;
    }

    return (
      <div className="container">
        {listActivities}
      </div>
    );
  }
});
