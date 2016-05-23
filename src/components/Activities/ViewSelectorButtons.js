import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';


export default React.createClass({

  getInitialState: function() {
    return {
      view: this.props.view === 'month' ? 'month' : 'upcoming' // upcoming or calendar
    };
  },

  setView(_view) {
    this.setState({ view: _view });
    window.location.assign("#/activities/" + _view);
  },

  render() {

    var data = this.props.data;

    return (

      <ButtonGroup>

        <Button
          bsSize="large"
          className="padded" 
          active={ this.state.view === 'upcoming' } 
          onClick={ this.setView.bind(this, 'upcoming') }>

          <FormattedMessage id='activities_upcoming' defaultMessage='Upcoming activities'/>

        </Button>  
        
        <Button
          bsSize="large"
          className="padded"
          active={ this.state.view === 'month' }
          onClick={ this.setView.bind(this, 'month') }>

          <FormattedMessage id='monthly_view' defaultMessage='Monthly view'/> 

        </Button>

      </ButtonGroup>

    );
  }
});
