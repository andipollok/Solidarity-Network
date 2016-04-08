import React from 'react';
import classNames from 'classnames';
import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import moment from 'moment';

import Reflux from 'reflux';
import DataActions from '../../stores/DataActions';
import DataStore from '../../stores/DataStore';
import LanguageActions from '../../stores/LanguageActions';
import LanguageStore from '../../stores/LanguageStore';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Listitem from './AgendaListitem';


export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status') ],

  getInitialState: function() {
    return {
      activities: [],
      activitiesFuture: [],
      foundActivities: false,
      foundActivitiesFuture: false
    };
  },

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
    StatusActions.setArea('agenda');
  },

  onClickActivity(id) {
    window.location.assign("#/activity/" + id);
  },

  onClickCalendar() {
    window.location.assign("#/agenda/");
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || !this.state.data || !this.state.data.loaded.all || !this.state.status || !this.state.status.community) {
      return <div></div>;
    }
    var myDate = moment({
      year: this.props.params.year,
      month: this.props.params.month - 1,
      day: this.props.params.day
      }
    );
    if (!myDate.isValid()) {
      return <div>Invalid date</div>;
    }

    var myActivities = [];
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

    myActivities = myActivities.filter(
      function(activity) {
        // check if this activity is on the given day
        if (moment(activity.date).isSame(myDate, 'day')) {
          return true;
        }
      }.bind(this));

    // console.log("found activities on the date", myDate.format(), myActivities.length);    

    var community = Helpers.getCommunityFromStatus(this);

    var activityItem = function(activity) {
      return ( <Listitem key={activity.id} data={activity} showTime={true} onClickHandler={this.onClickActivity}></Listitem> );
    }.bind(this);

    var header = 
      <div className="jumbotron container text-center">
        <h1><FormattedMessage id='agenda_in' values={{communityName: community.name}}/></h1>
      </div>;
  
    var Component = {};
    
    if (myActivities.length === 0) {
      // no events found
      Component = <Col className="container text-center box white half"><h2><FormattedMessage id='noactivities' values={{communityName: community.name}}/></h2></Col>;
    }
    else {
      Component = <Row>{myActivities.map(activityItem, this)}</Row>;
    }

    return (
      <div className="container agenda">
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
