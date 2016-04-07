import React from 'react';
import classNames from 'classnames';
import { Col } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import Helpers from '../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Icon from './Icon';

export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data') ],

  componentDidMount() {
    DataActions.forceTrigger();
  },

  render() {

    if (this.state.data && this.state.data.loaded.all) {

      var group = Helpers.getGroupById(this.props.data.groupId, this);
      var owner = Helpers.getPersonById(group.ownerId, this);

      var type = Helpers.getActivityTypeById(this.props.data.typeId, this);
      var icon = <Icon type={'activity-' + type.name} area='agenda' fill='solid' shape='hexagon'/>;

      // &nbsp;<span className="grey">(<FormattedRelative value={this.props.data.date} />)</span>
      //  <p><FormattedMessage id="group" defaultMessage="Group"/> {group.name}
      // &nbsp;<FormattedMessage id="by" defaultMessage="by"/> {owner.name}</p>
    }

    if (this.props.showDate) {
      var date = <p>
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

    if (this.props.showTime) {
      var time = <p>
            <FormattedMessage id="startingat" defaultMessage="Starting at"/>
            &nbsp;<FormattedTime
                    value={this.props.data.date}
                    minute="2-digit"
                    hour="numeric" />
          </p>
    }

    return (

      <Col md={4} sm={6} className="bottom-buffer" onClick={this.props.onClickHandler.bind(null, this.props.data.id)}>

        <div className="card solid linked padded text-center solid">

          {icon}

          <h2>{this.props.data.name}</h2>

          {date}

          {time}


        </div>
      </Col>
    );
  }
});
