import React from 'react';
import classNames from 'classnames';
import { Button, ButtonGroup, Col } from 'react-bootstrap';

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

    // var divClass = classNames( 'col-md-2', 'box', 'half', 'white', 'linked', 'padded', 'text-center', 'agenda',
    //   {
    //     'selected': false
    //   }
    // ); // selected may be needed later

    var group = Helpers.getGroupById(this.props.data.groupId, this);
    var owner = Helpers.getPersonById(group.ownerId, this);

    return (
      <Col className="calendar-sm-1 bottom-buffer" onClick={this.props.onClickHandler.bind(null, this.props.data.id)}>
        <div className="linked box half white padded">
          <h4>{this.props.data.name}</h4>
        </div>
      </Col>
    );
  }
});
