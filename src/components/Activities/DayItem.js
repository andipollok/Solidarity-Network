import React from 'react';
import classNames from 'classnames';
import { Col } from 'react-bootstrap';

import Helpers from '../../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import IconActivity from '../General/IconActivity';

export default React.createClass({

  render() {

    var data = this.props.data;
    var activity = this.props.activity;

    // var community = Helpers.getCommunityById(activity.communityId, data);

    var type = Helpers.getActivityTypeById(activity.typeId, data);
    
    // check if activity is in the past          
    var isInPast = new Date(activity.date) < new Date();

    // &nbsp;<span className="grey">(<FormattedRelative value={this.props.activity.date} />)</span>
    //  <p><FormattedMessage id="group" defaultMessage="Group"/> {group.name}
    // &nbsp;<FormattedMessage id="by" defaultMessage="by"/> {owner.name}</p>

    if (this.props.showDate) {
      var componentDate = <span>
          <FormattedMessage id="on" defaultMessage="on"/>
          &nbsp;
          <FormattedDate
                    value={activity.date}
                    weekday="long"
                    day="numeric"
                    month="long"
                    year="numeric" />
        </span>
    }

    if (this.props.showIcon) {
      var componentIcon = <IconActivity type={type} area='activities' isOnSolid={false} />;
    }

    if (this.props.showTime) {

      var startingAt;

      if (isInPast === false) {
        // event is in the future
        startingAt = <FormattedMessage id="startingat" defaultMessage=" "/>
      } 
      else {
        // event is in the past
        startingAt = <FormattedMessage id="startedat" defaultMessage=" "/>
      }

      // format start and end time
      var componentTime = <span>
                    {startingAt}&nbsp;<FormattedTime
                          value={activity.date}
                          minute="2-digit"
                          hour="numeric" />
                          </span>

      if (activity.dateEnd) {
        componentTime = <span>
                          <FormattedMessage id="from" />&nbsp;<FormattedTime
                          value={activity.date}
                          minute="2-digit"
                          hour="numeric" />
                          &nbsp;<FormattedMessage id="to" />&nbsp;<FormattedTime
                          value={activity.dateEnd}
                          minute="2-digit"
                          hour="numeric" />
                          </span>
      }
    }

    return (

      <Col md={4} sm={6} className="bottom-buffer" onClick={this.props.onClickHandler.bind(null, activity.id)}>

        <div className="card outline linked padded text-center">

          {componentIcon}

          <h2>{activity.name}</h2>

          <p className="date">
            {componentDate}
            <br />
            {componentTime}
          </p>

        </div>
      </Col>
    );
  }
});
