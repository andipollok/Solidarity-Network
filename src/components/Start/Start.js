import React from 'react';
import {Link}  from 'react-router';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';

export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('start');
    StatusActions.setTitle(null);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  onClickStart() {
    window.location.assign('#/activities');
  },

  render() {

    return (
      <div className="container activities">
        <Row>
          <Col sm={12} className="text-center">
            <h1>alo</h1>
            <Button bsSize="large" className="startButton" onClick={this.onClickStart}>

              <FormattedMessage id='getstarted'/>

            </Button>
          </Col>
        </Row>
      </div>
    );
  }
});