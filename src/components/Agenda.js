import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import Helpers from '../stores/Helpers.js';

import Listitem from './AgendaListitem';
import Calendar from './AgendaCalendar';


export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status') ],

  getInitialState: function() {
    return { area: 'upcoming' };
  },

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
    StatusActions.setCurrentPage('agenda');
  },

  onClickSelectActivity(id) {
    window.location.assign("#/activity/" + id);
  },

  setArea(_area) {
    this.setState({ area: _area });
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this)) {
      return <div></div>;
    }

    var community = Helpers.getCommunityFromStatus(this);

    var activityItem = function(activity) {
      return ( <Listitem key={activity.id} data={activity} onClickHandler={this.onClickSelectActivity}></Listitem> );
    }.bind(this);

    var activityItemCalendar = function(activity) {
      return ( <CalendarItem key={activity.id} data={activity} onClickHandler={this.onClickSelectActivity}></CalendarItem> );
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
          // check if this activity is in the future
          if(date < now) {
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

    var listActivities = <div className="container">{myActivities.map(activityItem, this)}</div>;

    // var listActivitiesCalendar = <div className="container">{myActivities.map(activityItemCalendar, this)}</div>;
    var calendar = <Calendar activities={myActivities} />;

    var header =  
      <div className="jumbotron container text-center">
        <h1><FormattedMessage id='agenda_in' values={{communityName: community.name}}/></h1>
      </div>
    
    var Component = listActivities;
    if (this.state.area === 'calendar') {
      Component = calendar;
    }

    if (!foundActivities && loadedData) {
      listActivities = <div className="container text-center box white half"><h2><FormattedMessage id='noactivities' values={{communityName: community.name}}/></h2></div>;
    }
    if (!loadedData) {
      listActivities = <div className="container text-center box white half"><h2><FormattedMessage id='loading'/></h2></div>;
    }

    return (
      <div>
        <Col md={12} fluid className="text-center box half padded">
          <ButtonGroup>
            <Button bsSize="large" className="padded" active={ this.state.area === 'upcoming' } onClick={ this.setArea.bind(this, 'upcoming') }>Upcoming</Button>  
            <Button bsSize="large" className="padded" active={ this.state.area === 'calendar' } onClick={ this.setArea.bind(this, 'calendar') }>Calendar</Button>  
          </ButtonGroup>
        </Col>
        {Component}
      </div>
    );
  }
});
