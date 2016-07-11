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
    StatusActions.setGotoDestination( "dca" );
    window.location.assign("#/activities/type");
  },

  showAllTypes() {
    StatusActions.clearActivityTypes();
    StatusActions.forceTrigger();
  },

  createNew() {
    // StatusActions.setGotoDestination( "dca" );
    window.location.assign("#/activities/create");
  },

  render() {

    var data = this.props.data;

    var text = (
        <p>
          <FormattedMessage id='typeselector_alltypes1' defaultMessage='These are activities of all types.'/><br />
          <FormattedMessage id='typeselector_alltypes2' defaultMessage='Are you looking for a certain kind of activity?'/>
        </p>
    );
    var selectButton = <Button bsSize="large" className="padded" onClick={ this.showTypeSelector }>
      <FormattedMessage id='typeselector_choose' defaultMessage='Choose activity type'/>
    </Button>

    var activityItem = function(id) {
      var type = Helpers.getActivityTypeById(id, data);

      return (
        <span key={id}>
          <IconActivity type={type} area="activities" isOnSolid="true" size="medium"/>
          {type.name}
        </span> );
    }.bind(this);

    if (data.status.selectedActivityTypes.length > 0) {
      text = <span>
          <p>
            <FormattedMessage id='typeselector_filtered1' defaultMessage='These are all' />&nbsp;
            { data.status.selectedActivityTypes.map(activityItem, this) }&nbsp;
            <FormattedMessage id='typeselector_filtered2' defaultMessage='activities' />
          </p>
        </span>

      var selectButton = <Button bsSize="large" className="padded" onClick={ this.showTypeSelector }>
      
        <FormattedMessage id='typeselector_choosedifferenttype' defaultMessage='Choose a different type of activity'/>
      
      </Button>
      
      var resetButton = <Button bsSize="large" className="padded" onClick={ this.showAllTypes }>

        <FormattedMessage id='typeselector_showall' defaultMessage='Show all'/>

      </Button>
    }

    var createButton = <Button bsSize="large" className="padded" onClick={ this.createNew }>

      <FormattedMessage id='create_new_activity' defaultMessage='Create new'/>

    </Button>

    return (
      <Row className="box padded infobox top-buffer text-center">

        {text}

        <p>{selectButton}</p>

        <p>{resetButton}</p>

        <p>{createButton}</p>

      </Row>
    );
  }
});
