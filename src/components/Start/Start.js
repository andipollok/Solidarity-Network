import React from 'react';
import {Link}  from 'react-router';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';

export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('start');
    StatusActions.setTitle(null);
    StatusActions.setSecondaryNav(null);
  },

  render() {

    return (
      <div className="container activities">
        <Row>
          <Col sm={12} className="text-center">
            <h1>Allo!</h1>
          </Col>
        </Row>
      </div>
    );
  }
});