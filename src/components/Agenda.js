import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import Helpers from '../stores/Helpers.js';

import Calendar from './Calendar';
import Schedule from './Schedule';


export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status') ],

  getInitialState: function() {
    return {
      area: 'schedule' // upcoming or calendar
    };
  },

  componentWillMount() {
    StatusActions.historyAdd({
      title: 'Schedule',
      url: '',
      pathname: '/agenda'
    });
    StatusActions.setArea('agenda');
  },

  componentDidMount() {
    LanguageActions.forceTrigger();
  },

  setArea(_area) {
    this.setState({ area: _area });
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this)) {
      return <div></div>;
    }
  
    var Component = {};

    if (this.state.area === 'calendar') {
      Component = <Calendar />;
    }
    else if (this.state.area === 'schedule') {
      Component = <Schedule />;
    }

    return (
        <div className="container agenda">
          <Row>
            <Col md={12} className="text-center box">
              <ButtonGroup>
                <Button bsSize="large" className="padded" active={ this.state.area === 'schedule' } onClick={ this.setArea.bind(this, 'schedule') }>Schedule</Button>  
                <Button bsSize="large" className="padded" active={ this.state.area === 'calendar' } onClick={ this.setArea.bind(this, 'calendar') }>Calendar</Button>  
              </ButtonGroup>
            </Col>
          </Row>

          {Component}

        </div>
    );
  }
});
