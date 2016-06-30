import React from 'react';
import classNames from 'classnames';
import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import moment from 'moment';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Listitem from './DayItem';
import TypeSelectorButton from '../General/TypeSelectorButton';


export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('activities');
    StatusActions.showBackButton(true);
    StatusActions.setTitle(<FormattedMessage id='nav_activities' />); // will be overwritten with date later
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  getInitialState: function() {
    return {
      activities: [],
      activitiesFuture: [],
      foundActivities: false,
      foundActivitiesFuture: false
    };
  },

  onClickActivity(id) {
    window.location.assign("#/activity/" + id);
  },

  onClickCalendar() {
    window.location.assign("#/activities/");
  },

  render() {

    var data = this.props.data;

    var myDate = moment({
      year: this.props.params.year,
      month: this.props.params.month - 1,
      day: this.props.params.day
      }
    );
    if (!myDate.isValid()) {
      return <div>Invalid date</div>;
    }

    StatusActions.setTitle(<span>
      <FormattedMessage id='activities_on'/>
      &nbsp;
      <FormattedDate
                    value={myDate}
                    day='numeric'
                    month='long'
                    year='numeric' />
      </span>);
    StatusActions.forceTrigger();

    var activities = [];
    activities = data.activities.filter(
      function(activity) {

        // check if this activity is in a community that is in this area
        var community = Helpers.getCommunityById(activity.communityId, data);
        if (!community) {
          return false;
        }
        var area = Helpers.getAreaById(community.areaId, data);
        if (!area || area.id !== data.status.area) {
          return false;
        }

        // check if activity is of selected type(s)
        if (data.status.selectedActivityTypes.length > 0 && data.status.selectedActivityTypes.indexOf(activity.typeId) === -1) {
          return false;
        }
 
        // check if this activity is on the given day
        if (moment(activity.date).isSame(myDate, 'day')) {
          return true;
        }

      }.bind(this));

    // console.log("found activities on the date", myDate.format(), activities.length);    

    var activityItem = function(activity) {
      return ( <Listitem key={activity.id} activity={activity} data={data} showTime={true} showIcon={true} onClickHandler={this.onClickActivity}></Listitem> );
    }.bind(this);
  
    var Component = {};
    
    if (activities.length === 0) {
      // no events found
      Component = <Col className="container text-center box white half"><h2><FormattedMessage id='noactivities' values={{areaName: data.area.name}}/></h2></Col>;
      // also, there is a filter for activity type active
      if (data.status.selectedActivityTypes.length > 0) {
        Component = (
          <Col className="container text-center box white half">
            <h2>
              <FormattedMessage id='noactivitiesfiltered' values={{ 
                areaName: data.area.name, 
                activityTypes: data.status.selectedActivityTypes.map( function(id) {
                  var type = Helpers.getActivityTypeById(id, data);
                  return type.name;
                })
              }} />
            </h2>
          </Col>
        );
      }


    }
    else {
      Component = <Row>{activities.map(activityItem, this)}</Row>;
    }

    return (
      <div className="container activities">

        <Row>
          <Col md={12} className="text-center box bottom-buffer">
            <h1><FormattedDate
                    value={myDate}
                    weekday="long"
                    day="numeric"
                    month="long"
                    year="numeric" /> </h1>
          </Col>
        </Row>

        {Component}

      </div>
    );
  }
});
