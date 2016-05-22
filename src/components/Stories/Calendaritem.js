import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { Col } from 'react-bootstrap';

import Helpers from '../../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button } from 'react-bootstrap';

import Icon from '../General/Icon';

export default React.createClass({
  
  onClick() {
    if (this.props.day.stories.length === 1) {
      this.props.onClickStory(this.props.day.stories[0].id);
    }
    if (this.props.day.stories.length > 1) {
      this.props.onClickDay(this.props.day.date);
    }
  },

  render() {

    // add month name if it's the first of the month or the first day displayed
/*    if (this.props.day.date.get('date') === 1 || this.props.day.number === 0) {
      var monthName = <p className="grey">{Helpers.capitalizeFirstLetter(this.props.day.date.format('MMM'))}</p>;
    }*/

    // add classes if it's a weekend or if it's today
    var divClass = classNames(['box expand white text-center agenda calendar'], {
      weekend: this.props.day.date.isoWeekday() === 6 || this.props.day.date.isoWeekday() === 7,
      today: this.props.day.date.isSame(moment(), 'day'),
      linked: this.props.day.stories.length > 0,
      grey: !this.props.activeMonth.isSame(this.props.day.date, 'month')
    });

    // add class to highlight there is an activity
    var headingClass = classNames( { 
      highlight: this.props.day.stories.length > 0,
      today: this.props.day.date.isSame(moment(), 'day')
    });

    // add message if it's today
    if (this.props.day.date.isSame(moment(), 'day')) {
      // var isToday = <p className="grey"><FormattedMessage id="today" defaultMessage="Today"/></p>;
    }

    // each activity for this day
/*    var activityItem = function(activity) {
      return (
        <p key={activity.id} className="small">
          {activity.name}
        </p>
      );
    }*/

    // number of activities that day
/*    var numberofActivities = '';
    if (this.props.day.activities.length > 0) {
      numberofActivities = <p><span className="number">{this.props.day.activities.length}</span></p>;
    }*/

    // var listActivities = this.props.day.activities.map(activityItem, this);

    var content = <div className={divClass}>
          <h4 className={headingClass}>{this.props.day.date.format('D')}</h4>
        </div>

    if (!this.props.activeMonth.isSame(this.props.day.date, 'month')) {
      content = null;
    }


    return (
      <Col className="calendar-xs-1 height100" onClick={ this.onClick }>
        {content}
      </Col>
    );
  }
});
