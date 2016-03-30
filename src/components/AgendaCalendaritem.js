import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { Col } from 'react-bootstrap';

import Helpers from '../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button } from 'react-bootstrap';

import Icon from './Icon';

export default React.createClass({

  render() {

    // add month name if it's the first of the month or the first day displayed
    if (this.props.day.date.get('date') === 1 || this.props.day.number === 0) {
      var monthName = <p className="grey">{Helpers.capitalizeFirstLetter(this.props.day.date.format('MMM'))}</p>;
    }

    // add classes if it's a weekend or if it's today
    var divClass = classNames(['box linked expand white text-center agenda calendar'], {
      weekend: this.props.day.date.isoWeekday() === 6 || this.props.day.date.isoWeekday() === 7,
      today: this.props.day.date.isSame(moment(), 'day')
    });
    // add message if it's today
    if (this.props.day.date.isSame(moment(), 'day')) {
      var isToday = <p className="grey"><FormattedMessage id="today" defaultMessage="Today"/></p>;
    }

    // each activity for this day
    var activityItem = function(activity) {
      return (
        <p key={activity.id} className="small">
          {activity.name}
        </p>
      );
    }

    // number of activities that day
    var numberofActivities = '';
    if (this.props.day.activities.length > 0) {
      numberofActivities = <p><span className="number">{this.props.day.activities.length}</span></p>;
    }

    var listActivities = this.props.day.activities.map(activityItem, this);

    return (
      <Col className="calendar-xs-1 height100 bottom-buffer" onClick={this.props.onClickDay.bind(null, this.props.day.date)}>
        <div className={divClass}>
          <h4>{this.props.day.date.format('D')}</h4>
          {monthName}
          {isToday}
          <span>{numberofActivities}</span>
        </div>
      </Col>
    );
  }
});
