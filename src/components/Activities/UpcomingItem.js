import React from 'react';
import classNames from 'classnames';
import { Col } from 'react-bootstrap';

import Helpers from '../../stores/Helpers.js';

import { formatMessage, FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Icon from '../General/Icon';
import IconButton from '../General/IconButton';

import IconActivity from '../General/IconActivity';


export default React.createClass({

  contextTypes: {
    intl: React.PropTypes.object.isRequired,
  },

  render() {

    var data = this.props.data;
    var activity = this.props.activity;
    var layout = this.props.layout;

    var community = Helpers.getCommunityById(activity.communityId, data);

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
                    format="hhmm" />
        </span>
    }

    if (this.props.showIcon) {
      var componentIcon = <IconActivity type={type} area='activities' isOnSolid={false} />;
      var componentIconSmall = <IconActivity type={type} area='activities' isOnSolid={false} size='medium' />;
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
      var componentTimeCard = <span>
                          <Icon 
                            type='time'
                            folder='service'
                            size='medium'
                            color='default'
                            active='false' />
                            <span className="padded">
                              <FormattedTime
                                value={activity.date}
                                minute="2-digit"
                                hour="numeric" />
                            </span>
                          </span>

      if (activity.dateEnd) {
        componentTimeCard = <span className="timeInfo">
                          <Icon 
                            type='time'
                            folder='service'
                            size='medium'
                            color='default'
                            active='false' />
                          <span className="padded">
                            <FormattedTime
                              value={activity.date}
                              minute="2-digit"
                              hour="numeric" />
                            &nbsp;-&nbsp;
                            <FormattedTime
                              value={activity.dateEnd}
                              minute="2-digit"
                              hour="numeric" />
                          </span>
                        </span>
      }

      // format start and end time
      var componentTimeList = <span className="timeInfo">
                                <FormattedTime
                                  value={activity.date}
                                  minute="2-digit"
                                  hour="numeric" />
                              </span>

      if (activity.dateEnd) {
        componentTimeList = <span className="timeInfo">
                              <FormattedTime
                                value={activity.date}
                                minute="2-digit"
                                hour="numeric" />
                              &nbsp;-&nbsp;
                              <FormattedTime
                                value={activity.dateEnd}
                                minute="2-digit"
                                hour="numeric" />
                            </span>
      }

    }

    switch (layout) {

      case "List":
        
        // {componentIcon}
        return (

          <div className="listItem outline linked text-center activity" onClick={this.props.onClickHandler.bind(null, activity.id)}>

            {componentIconSmall}

            <h2>{activity.name}</h2>

            <span className="eventTime">
              <IconButton
                type='time' folder='service'
                color='timeInfo'
                size='medium'
                isActive={true}
                labelAlignment='center' iconPosition='right'
                label="" />
              {componentTimeList}
            </span>

          </div>

        );

      break;

      case "Cards":
      default:

        let buttonLabel = this.context.intl.formatMessage({ id: 'seeactivitydetails' });

        return (

          <Col md={4} sm={6} className="bottom-buffer" onClick={this.props.onClickHandler.bind(null, activity.id)}>

            <div className="card outline fixedheight linked text-center">
              
              <div className="inside">

                {componentIcon}

                <h2>{activity.name}</h2>

                <p className="date">
                  {componentDate}
                  <br />
                  {componentTimeCard}
                </p>
              </div>

              <div className="activityButton">
                {buttonLabel}

                <Icon 
                  type='activity'
                  folder='service'
                  size='small'
                  color='default'
                  isActive={true} />
              </div>

            </div>
          </Col>
        );
        
/* actually we should put an IconButton there, but the outline of the card is 2px (css - 1.5 is not possible) and the iconbutton only 1.5px (svg)

                <IconButton
                  type='activity' folder='service'
                  color='default'
                  size='wide'
                  isActive={true}
                  labelAlignment='center' iconPosition='right'
                  label={buttonLabel} />
*/
      break;

    }

  }
});
