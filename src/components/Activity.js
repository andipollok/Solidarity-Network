import React from 'react';
import classNames from 'classnames';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import Helpers from '../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Icon from './Icon';

export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(DataStore, 'data'), Reflux.connect(StatusStore, 'status') ],

  componentDidMount() {
    LanguageStore.forceTrigger();
    DataActions.forceTrigger();
    StatusActions.forceTrigger();
    StatusActions.setCurrentPage('agenda');
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || !this.props.params.id || !this.state.data || !this.state.data.loaded.activities) {
      return <div></div>;
    }

    var community = Helpers.getCommunityFromStatus(this);
    var activity = Helpers.getActivityById(this.props.params.id, this);
    var group = Helpers.getGroupById(activity.groupId, this);
    var owner = Helpers.getPersonById(group.ownerId, this);

    return (
      <div className="container">
      <Col md={12}>

        <div className="box text-center">

          <Icon type={'activity-' + activity.type} area='agenda' shape='hexagon'/>

          <h1>{activity.name}</h1>

          <h3><FormattedMessage id="on" defaultMessage=" "/>
              &nbsp;<FormattedDate
                    value={activity.date}
                    weekday="long"
                    day="numeric"
                    month="long"
                    year="numeric" /> 
              &nbsp;<span className="grey">(<FormattedRelative value={activity.date} />)</span>
          </h3>

          <h3><FormattedMessage id="startingat" defaultMessage=" "/>
              &nbsp;<FormattedTime
                    value={activity.date}
                    minute="2-digit"
                    hour="numeric" /></h3>

          <p><FormattedMessage id="group" defaultMessage="Group"/> {group.name}
             &nbsp;<FormattedMessage id="by" defaultMessage="by"/> {owner.name}</p>
        </div>
      </Col>
      <Col sm={4}>
        <div className="box linked white text-center">
          <p><Button bsStyle="primary" bsSize="large">Contact {owner.name}</Button></p>
          <p>{owner.name} is hosting this event. You can write him an email or call him on his mobile or landline.</p>
        </div>
      </Col>
      <Col sm={4}>
        <div className="box linked white text-center">
          <p><Button bsStyle="primary" bsSize="large">Keep me posted!</Button></p>
          <p>This remembers the activity in your favourites. You won't have to give your name or email at this point.</p>
        </div>
      </Col>
      <Col sm={4}>
        <div className="box linked white text-center">
          <p><Button bsStyle="primary" bsSize="large">Register</Button></p>
          <p>Let {owner.name} know that you are interested in joining this activity.</p>
        </div>
      </Col>

      </div>
    );
  }
});
