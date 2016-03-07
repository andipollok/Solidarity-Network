import React from 'react';
import moment from 'moment';

import { Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import Helpers from '../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Listitem from './AgendaCalendaritem';

export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language') ],

  getInitialState() {

    var date = moment();

    return {
      startDate: moment().startOf('month').isoWeekday(1),
      endDate: moment().startOf('month').add(1, 'month').isoWeekday(6),
      month: date.format('M'),
      monthName: date.format('MMMM'),
      year: date.format('Y'),
      days: [],
      weeks: []
    }
  },

  componentDidMount() {
    LanguageActions.forceTrigger();
    this.getDays();
  },

  getDays() {
    var days = [], weeks = [];
    var i=0;

    for (var date = this.state.startDate.clone(); date.diff(this.state.endDate) <= 0; date.add(1, 'days')) {
      // find activities on that date
      var activitiesFound = this.props.activities.filter(function(activity) {
          if (moment(activity.date).isSame(date, 'day')) {
            return true;
          }
        });
      days.push({
        number: i,
        id: date.format(),
        date: date.clone(),
        name: "Day " + date.format('DD'),
        activities: activitiesFound
      });
      i++;
    }
    var i=0;
    // split days up into chunks of 7 for each week
    var daysTemp = days;
    while (daysTemp.length > 0) {
      weeks.push(
        { number: i,
          days: daysTemp.splice(0, 7)
          // maybe start and end date or week number, but not needed now
      });
      i++;
    }

    this.setState({days: days, weeks: weeks});
  },

  onClickSelectActivity(id) {
    console.log("day " + id + " selected");
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || !this.props.activities) {
      return <div></div>;
    }

    var weekItem = function(week) {
      return (
        <Row key={'week'+week.number} className="calendar-row half">
          { week.days.map(dayItem, this) }
        </Row>);
    }.bind(this);

    var dayItem = function(day) {
      return (
        <Listitem key={'day'+day.id} day={day} onClickHandler={this.onClickSelectActivity} />
      );
    }.bind(this);

    var dayHeader = function(dayName) {
      return (
        <Col key={'header'+dayName} className="calendar-sm-1 bottom-buffer grey">
          {dayName}
        </Col>
      );
    }

    return (
      <div className="calendar">
        <Row className="calendar-row text-center">
        <h2>{this.state.monthName}</h2>
        </Row>
        <Row className="calendar-row hidden-xs">
          {moment.weekdaysShort().map(dayHeader, this)}
        </Row>
        { this.state.weeks.map(weekItem, this) } 
      </div>
    );
  }
});
