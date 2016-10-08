import React from 'react';

import SvgIcon from 'react-svg-icons';
import { Button, Row, Col } from 'react-bootstrap';
import {Link}  from 'react-router';
import {formatMessage, FormattedMessage} from 'react-intl';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';

import StepBullets from '../General/StepBullets';

import IconButton from '../General/IconButton';

export default React.createClass({

  contextTypes: {
    intl: React.PropTypes.object.isRequired,
  },

  componentWillMount() {
    StatusActions.setPage('splash');
    StatusActions.setTitle(null);
    StatusActions.showPrimaryNav(false);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  onClickStart() {
    window.location.assign('#/start');
  },

  render() {

  let buttonLabel = this.context.intl.formatMessage({ id: 'getstarted' });

  return (
      <div className="container-fluid splash">
        <Row>
          <Col sm={12} className="logo text-center">
            <p>
              <SvgIcon name='app/alo_logo' color='#FFFFFF'/>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="actionButton text-center">
              <div onClick={this.onClickStart}>
                <IconButton
                  type='ok' folder='service'
                  color='start'
                  size='wide'
                  isActive={true}
                  labelAlignment='center' iconPosition='right'
                  label={buttonLabel} />
              </div>
          </Col>
        </Row>
      </div>
    );

  }

});