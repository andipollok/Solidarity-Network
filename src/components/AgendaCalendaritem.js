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

    if (this.props.day.date.get('date') === 1 || this.props.day.number === 0) {
      var monthName = <p className="grey">{this.props.day.date.format('MMM')}</p>;
    }

    var divClass = classNames(['box linked expand white text-center agenda calendar'], {
      weekend: this.props.day.date.isoWeekday() === 6 || this.props.day.date.isoWeekday() === 7,
      today: this.props.day.date.isSame(moment(), 'day')
    });
    if (this.props.day.date.isSame(moment(), 'day')) {
      var isToday = <p className="grey"><FormattedMessage id="today" defaultMessage="Today"/></p>;
    }

    var activityItem = function(activity) {
      // return <div className="activity" key={activity.id}>{activity.name}</div>;
      return <p key={activity.id}><Button bsStyle="primary" bsSize="small" onClick={this.props.onClickActivity.bind(null, activity.id)}>{activity.name}</Button></p>;
    } 

    return (
      <Col className="calendar-sm-1 calendar-xs-7 expand bottom-buffer">
        <div className={divClass}>
          <h4>{this.props.day.date.format('DD')}</h4>
          {monthName}
          {isToday}
          {this.props.day.activities.map(activityItem, this)}
        </div>
      </Col>
    );
  }
});
