import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';


import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import IconActivity from '../General/IconActivity';

export default React.createClass({

  mixins: [ Reflux.connect(StatusStore, 'status') ],

  showTypeSelector() {
    window.location.assign("#/activities/type");
  },

  showAllTypes() {
    StatusActions.clearActivityTypes();
    StatusActions.forceTrigger();
  },

  render() {

    var data = this.props.data;

    var text = (
        <p>
          These are activities of all types.<br />
          Are you looking for a certain kind of activity?
        </p>
    );
    var selectButton = <Button bsSize="large" className="padded" onClick={ this.showTypeSelector }>Choose activity type</Button>

    var activityItem = function(id) {
      var type = Helpers.getActivityTypeById(id, data);

      return (
        <span key={id}>
          <IconActivity type={type} area="activities" isOnSolid="true" size="small"/>
          {type.name}&nbsp;
        </span> );
    }.bind(this);

    if (data.status.selectedActivityTypes.length > 0) {
      text = <span>
          <p>
            These are all 
            { data.status.selectedActivityTypes.map(activityItem, this) }
            activities
          </p>
        </span>

      var selectButton = <Button bsSize="large" className="padded" onClick={ this.showTypeSelector }>Choose other activity type</Button>
      var resetButton = <Button bsSize="large" className="padded" onClick={ this.showAllTypes }>Show all</Button>
    }

    return (
      <Row className="box padded infobox buffer text-center">

        {text}

        <p>{selectButton}</p>

        <p>{resetButton}</p>

      </Row>
    );
  }
});
