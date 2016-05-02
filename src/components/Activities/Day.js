import React from 'react';
import classNames from 'classnames';
import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import moment from 'moment';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Listitem from './AgendaListitem';


export default React.createClass({

  getInitialState: function() {
    return {
      activities: [],
      activitiesFuture: [],
      foundActivities: false,
      foundActivitiesFuture: false
    };
  },

  componentDidMount() {
    StatusActions.setArea('activities');
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

    var activities = [];
    activities = data.activities.filter(
      function(activity) {
        // check if this activity is in a group that is in this community
        var group = Helpers.getGroupById(activity.groupId, data);
        if (!group) {
          return false;
        }
        var community = Helpers.getCommunityById(group.communityId, data);
        if (community.id !== data.status.community) {
          return false;
        }
        return true;
      }.bind(this));

    activities = activities.filter(
      function(activity) {
        // check if this activity is on the given day
        if (moment(activity.date).isSame(myDate, 'day')) {
          return true;
        }
      }.bind(this));

    // console.log("found activities on the date", myDate.format(), activities.length);    

    var activityItem = function(activity) {
      return ( <Listitem key={activity.id} activity={activity} data={data} showTime={true} onClickHandler={this.onClickActivity}></Listitem> );
    }.bind(this);

    var header = 
      <div className="jumbotron container text-center">
        <h1><FormattedMessage id='agenda_in' values={{communityName: data.community.name}}/></h1>
      </div>;
  
    var Component = {};
    
    if (activities.length === 0) {
      // no events found
      Component = <Col className="container text-center box white half"><h2><FormattedMessage id='noactivities' values={{communityName: data.community.name}}/></h2></Col>;
    }
    else {
      Component = <Row>{activities.map(activityItem, this)}</Row>;
    }

    return (
      <div className="container activities">
        <Row>
          <Col md={12} className="text-center box top-buffer bottom-buffer">
            <ButtonGroup>
              <Button bsSize="large" className="padded" onClick={ this.onClickCalendar }>Back to calendar</Button>  
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-center box top-buffer bottom-buffer">
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
