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

    var divClass = classNames( 'card solid linked padded text-center agenda solid',
      {
        'selected': false
      }
    ); // selected may be needed later

    var group = Helpers.getGroupById(this.props.data.groupId, this);
    var owner = Helpers.getPersonById(group.ownerId, this);

    // &nbsp;<span className="grey">(<FormattedRelative value={this.props.data.date} />)</span>
    //  <p><FormattedMessage id="group" defaultMessage="Group"/> {group.name}
    // &nbsp;<FormattedMessage id="by" defaultMessage="by"/> {owner.name}</p>
    var icon = <Icon type={'activity-' + this.props.data.type} area='agenda' fill='solid' shape='hexagon'/>;

    return (

      <Col md={4} sm={6} className="bottom-buffer" onClick={this.props.onClickHandler.bind(null, this.props.data.id)}>

        <div className={divClass}>

          {icon}

          <h2>{this.props.data.name}</h2>

          <p><FormattedMessage id="on" defaultMessage="on"/>
              &nbsp;<FormattedDate
                    value={this.props.data.date}
                    weekday="long"
                    day="numeric"
                    month="long"
                    year="numeric" /> 
              
          </p>

          <p><FormattedMessage id="startingat" defaultMessage="Starting at"/>
              &nbsp;<FormattedTime
                    value={this.props.data.date}
                    minute="2-digit"
                    hour="numeric" /></p>

        </div>
      </Col>
    );
  }
});
