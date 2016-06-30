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
      view: this.props.view // upcoming or month
    };
  },

  setView(_view) {
    
    // Conditionally showing the #pleasewait overlay (if we are opening the calendar)
    var overlay = document.getElementById('pleasewait');
    if ( overlay ) {
      if ( _view === 'month' ) {
        overlay.style.display = 'block';
      } else {
        overlay.style.display = 'none';
      }
    } else {
      console.log("could not find overlay");
    }

    this.setState({ view: _view });
    
    // Performing the actual view change with a zero delay (technical trick so the DOM is modified to show the #pleasewait overlay before the data update time overhead occurs)
    setTimeout( function() {
      window.location.assign("#/activities/" + _view);
    }.bind(this), 0 );

  },

  componentWillReceiveProps: function(nextProps) {
    // in case the props are set again by parent component, we need to update state
    if (nextProps.view !== this.state.view) {
      this.setState({ view: nextProps.view });
    }
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
