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
        <p key={activity.id}>
          <Button bsStyle="primary" bsSize="small" onClick={this.props.onClickActivity.bind(null, activity.id)}>
            {activity.name}
          </Button>
        </p>
      );
    }

    // number of activities that day
    var numberofActivities = '';
    if (this.props.day.activities.length > 0) {
      numberofActivities = <p><span className="number">{this.props.day.activities.length}</span></p>;
    }

    return (
      <Col className="calendar-sm-1 calendar-xs-7 height100 bottom-buffer">
        <div className={divClass}>
          <h4>{this.props.day.date.format('DD')}</h4>
          {monthName}
          {isToday}
          <span className="hidden-xs hidden-sm">{this.props.day.activities.map(activityItem, this)}</span>
          <span className="hidden-md hidden-lg">{numberofActivities}</span>
        </div>
      </Col>
    );
  }
});
