import React from 'react';
import classNames from 'classnames';
import { Col } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../../stores/DataActions';
import DataStore from '../../stores/DataStore';
import Helpers from '../../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import IconActivity from '../General/IconActivity';

export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data') ],

  componentDidMount() {
    DataActions.forceTrigger();
  },

  render() {

    if (!this.state.data || !this.state.data.loaded.all) {
      return <div></div>
    }

    var group = Helpers.getGroupById(this.props.data.groupId, this);
    var type = Helpers.getActivityTypeById(this.props.data.typeId, this);
    
    // check if activity is in the past          
    var isInPast = new Date(this.props.data.date) < new Date();

    // &nbsp;<span className="grey">(<FormattedRelative value={this.props.data.date} />)</span>
    //  <p><FormattedMessage id="group" defaultMessage="Group"/> {group.name}
    // &nbsp;<FormattedMessage id="by" defaultMessage="by"/> {owner.name}</p>

    if (this.props.showDate) {
      var componentDate = <p>
          <FormattedMessage id="on" defaultMessage="on"/>
          &nbsp;
          <FormattedDate
                    value={this.props.data.date}
                    weekday="long"
                    day="numeric"
                    month="long"
                    year="numeric" />
        </p>
    }

    if (this.props.showIcon) {
      var componentIcon = <IconActivity type={type} area='agenda' fill='solid' />;
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
/*      var componentTime = <p>
            <FormattedMessage id="startingat" defaultMessage="Starting at"/>
            &nbsp;<FormattedTime
                    value={this.props.data.date}
                    minute="2-digit"
                    hour="numeric" />
          </p>*/

      // format start and end time
      var componentTime = <p>
                    {startingAt}&nbsp;<FormattedTime
                          value={this.props.data.date}
                          minute="2-digit"
                          hour="numeric" />
                          </p>

      if (this.props.data.dateEnd) {
        componentTime = <p>
                        From&nbsp;<FormattedTime
                          value={this.props.data.date}
                          minute="2-digit"
                          hour="numeric" />
                          &nbsp;to&nbsp;<FormattedTime
                          value={this.props.data.dateEnd}
                          minute="2-digit"
                          hour="numeric" />
                          </p>
      }
    }

    return (

      <Col md={4} sm={6} className="bottom-buffer" onClick={this.props.onClickHandler.bind(null, this.props.data.id)}>

        <div className="card solid linked padded text-center solid">

          {componentIcon}

          <h2>{this.props.data.name}</h2>

          {componentDate}

          {componentTime}

        </div>
      </Col>
    );
  }
});
