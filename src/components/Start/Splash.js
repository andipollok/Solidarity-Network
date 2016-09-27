import React from 'react';

import SvgIcon from 'react-svg-icons';
import { Button, Row, Col } from 'react-bootstrap';
import {Link}  from 'react-router';
import { FormattedMessage } from 'react-intl';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';

import StepBullets from '../General/StepBullets';

export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('start');
    StatusActions.setTitle(null);
    StatusActions.showPrimaryNav(false);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  onClickStart() {
    window.location.assign('#/start');
  },

  render() {

  return (
      <div className="container-fluid splash">
        <Row>
          <Col sm={12} className="text-center">
            <p>
              <SvgIcon name='app/alo_logo' color='#FFFFFF'/>
            </p>
            <p>
              <Button bsSize="large" className="startButton" onClick={this.onClickStart}>

                <FormattedMessage id='getstarted'/>

              </Button>
            </p>
          </Col>
        </Row>
      </div>
    );

  }

});