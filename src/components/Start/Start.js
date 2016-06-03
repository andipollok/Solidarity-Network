import React from 'react';
import {Link}  from 'react-router';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';

export default React.createClass({

  getInitialState() {
    return {
       loggedIn: false,
    };
  },

  componentWillMount() {
    StatusActions.setPage('start');
    StatusActions.setTitle(null);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  onClickStart() {
    window.location.assign('#/activities');
  },

  onClickLogin() {
    this.setState({ loggedIn: true });
  },

  render() {

    if (this.state.loggedIn) {

      return (
        <div className="container activities">
          <Row>
            <Col sm={12} className="text-center">
              <h1>alo</h1>
              <Button bsSize="large" className="startButton" onClick={this.onClickStart}>Get started!</Button>
            </Col>
          </Row>
        </div>
      );

    } else {

      return (
        <div className="container activities">
          <Row>
            <Col sm={12} className="text-center">
              <h1>alo</h1>
              You need to log in.
              <br/>
              <Button bsSize="large" className="loginButton" onClick={this.onClickLogin}>Log me in!</Button>
            </Col>
          </Row>
        </div>
      );
      
    }

  }
});