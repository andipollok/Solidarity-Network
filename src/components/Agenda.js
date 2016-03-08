import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import moment from 'moment';

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
    return {
      area: 'calendar',
      activities: [],
      activitiesFuture: [],
      foundActivities: false,
      foundActivitiesFuture: false,
      loadedData: false
    };
  },

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
    StatusActions.setCurrentPage('agenda');
    this.getActivities();
  },

  onClickActivity(id) {
    window.location.assign("#/activity/" + id);
  },

  shouldComponentUpdate() {
    // don't update until data is loaded
    if (this.state.loadedData === false) {
      this.getActivities();
      return false;
    } 
    else {
      return true;
    }
  },

  getActivities() {
    var myActivities = [], myActivitiesFuture = [];
    if (this.state.data && this.state.data.loaded.all && this.state.status && this.state.status.community) {
      this.setState({ loadedData: true });
      myActivities = this.state.data.activities.filter(
        function(activity) {
          // check if this activity is in a group that is in this community
          var group = Helpers.getGroupById(activity.groupId, this);
          if (!group) {
            return false;
          }
          var community = Helpers.getCommunityById(group.communityId, this);
          if (community.id !== this.state.status.community) {
            return false;
          }
          return true;
        }.bind(this));
      myActivitiesFuture = myActivities.filter(
        function(activity) {
          // check if this activity is in the future
          var now = new Date();
          var date = new Date(activity.date);
          if(date < now) {
            return false;
          }
          return true;
        }.bind(this));
      if (myActivitiesFuture.length > 0) { this.setState({foundActivitiesFuture: true }); }
      if (myActivities.length > 0) { this.setState({foundActivities: true }); }
      this.setState({ activities: myActivities, activitiesFuture: myActivitiesFuture });
    }
   
  },

  setArea(_area) {
    this.setState({ area: _area });
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || !this.state.loadedData) {
      return <div></div>;
    }

    var community = Helpers.getCommunityFromStatus(this);

    var activityItem = function(activity) {
      return ( <Listitem key={activity.id} data={activity} onClickHandler={this.onClickActivity}></Listitem> );
    }.bind(this);

    var activityItemCalendar = function(activity) {
      return ( <CalendarItem key={activity.id} data={activity} onClickHandler={this.onClickActivity}></CalendarItem> );
    }.bind(this);

    var listActivities = <Row>{this.state.activitiesFuture.map(activityItem, this)}</Row>;

    var calendar = <Calendar activities={this.state.activities} />;

    var header =  
      <div className="jumbotron container text-center">
        <h1><FormattedMessage id='agenda_in' values={{communityName: community.name}}/></h1>
      </div>
    
    var Component = {};
    if (!this.state.foundActivities) {
      // no events found
      Component = <Col className="container text-center box white half"><h2><FormattedMessage id='noactivities' values={{communityName: community.name}}/></h2></Col>;
    }
    else if (this.state.area === 'calendar') {
      Component = calendar;
    }
    else {
      Component = listActivities;
    }

    return (
      <div className="container">
        <Row>
          <Col md={12} className="text-center box">
            <ButtonGroup>
              <Button bsSize="large" className="padded" active={ this.state.area === 'upcoming' } onClick={ this.setArea.bind(this, 'upcoming') }>Upcoming</Button>  
              <Button bsSize="large" className="padded" active={ this.state.area === 'calendar' } onClick={ this.setArea.bind(this, 'calendar') }>Calendar</Button>  
            </ButtonGroup>
          </Col>
        </Row>
        {Component}

      </div>
    );
  }
});
