import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Calendar from './Calendar';
import Schedule from './Schedule';


export default React.createClass({

  getInitialState: function() {
    return {
      area: 'schedule' // upcoming or calendar
    };
  },

  componentWillMount() {
/*    StatusActions.historyAdd({
      title: 'Agenda',
      url: '',
      pathname: '/agenda'
    });*/
    StatusActions.setArea('activities');
  },

  setArea(_area) {
    this.setState({ area: _area });
  },

  render() {

    var data = this.props.data;
    var Component = {};

    if (this.state.area === 'calendar') {
      Component = <Calendar data={data}/>;
    }
    else if (this.state.area === 'schedule') {
      Component = <Schedule data={data}/>;
    }

    return (
        <div className="container activities">
          <Row>
            <Col md={12} className="text-center box">
              <ButtonGroup>
                <Button bsSize="large" className="padded" active={ this.state.area === 'schedule' } onClick={ this.setArea.bind(this, 'schedule') }>Upcoming</Button>  
                <Button bsSize="large" className="padded" active={ this.state.area === 'calendar' } onClick={ this.setArea.bind(this, 'calendar') }>Monthly view</Button>  
              </ButtonGroup>
            </Col>
          </Row>

          {Component}

        </div>
    );
  }
});
