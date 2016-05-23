import React from 'react';
import moment from 'moment';

import { Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Listitem from './Calendaritem';
import TypeSelectorButton from '../General/TypeSelectorButton';
import ViewSelectorButtons from './ViewSelectorButtons';


export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('stories');
    StatusActions.showBackButton(false);
    StatusActions.setTitle(<FormattedMessage id='nav_stories' defaultMessage='Stories'/>);
    StatusActions.setSecondaryNav(<ViewSelectorButtons data={this.props.data} view='month'/>);
    StatusActions.forceTrigger();
  },

  getInitialState() {

    var date = moment();

    return {
      month: moment().startOf('month'), // stores first of month
    }
  },

  onClickStory(id) {
    window.location.assign("#/story/" + id);
  },

  onClickDay(date) {
    window.location.assign("#/stories/" + date.format("DD/MM/YYYY"));
  },

  onClickPrevMonth() {
    this.setState({ month: this.state.month.subtract(1, 'month') });
  },

  onClickNextMonth() {
    this.setState({ month: this.state.month.add(1, 'month') });
  },

  render() {

    var data = this.props.data;

    var days = [], weeks = [];
    var i=0;
    var startDate = this.state.month.clone().startOf('month').isoWeekday(1);
    var endDate = this.state.month.clone().startOf('month').add(1, 'month').isoWeekday(7);

    for (var date = startDate.clone(); date.diff(endDate) <= 0; date.add(1, 'days')) {
      // find activities
      var storiesFound = data.stories.filter(
        function(story) {
          // check if activity is on that day
          if(moment(story.date).isSame(date, 'day')) {
            return true;
          }
        }.bind(this));
      days.push({
        number: i,
        id: date.format(),
        date: date.clone(),
        name: "Day " + date.format('DD'),
        stories: storiesFound
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

    var weekItem = function(week) {
      return (
        <Row key={'week'+week.number} className="calendar-row calendar-week">
          { week.days.map(dayItem, this) }
        </Row>);
    }.bind(this);

    var dayItem = function(day) {
      return (
        <Listitem key={'day'+day.id} day={day} activeMonth={this.state.month} onClickDay={this.onClickDay} onClickStory={this.onClickStory}/>
      );
    }.bind(this);

    var dayHeader = function(dayName) {
      return (
        <Col key={'header'+dayName} className="calendar-sm-1 calendar-header bottom-buffer grey text-center">
          {dayName}
        </Col>
      );
    }

    // moment.localeData().firstDayOfWeek() is 0 for sunday and 1 for monday.
    // unfortunately, moment.weekdaysShort() always starts with Sunday ...
    // so we need to manipulate that
    var weekdays = Helpers.rotateArray(moment.weekdaysShort(), moment.localeData().firstDayOfWeek());

    return (
      <div className="container">

        <div className="calendar">
          <Row className="calendar-row">
            <Col className="calendar-xs-1 text-center">
              <h3 onClick={this.onClickPrevMonth}>&lt;</h3>
            </Col>
            <Col className="calendar-xs-5 text-center">
              <h2>{Helpers.capitalizeFirstLetter(this.state.month.format('MMMM YYYY'))}</h2>
            </Col>
            <Col className="calendar-xs-1 text-center">
              <h3 onClick={this.onClickNextMonth}>&gt;</h3>
            </Col>
          </Row>
          <Row className="calendar-row hidden-xs">
            {weekdays.map(dayHeader, this)}
          </Row>
            {weeks.map(weekItem, this)}
        </div>
      </div>
    );
  }
});
