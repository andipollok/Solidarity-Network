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

    // Perf.stop();
    // var perfmeas = Perf.getLastMeasurements();
    // console.log("Performance to render " + this.state.view);
    // Perf.printInclusive( perfmeas );
    // Perf.printExclusive( perfmeas );
    // Perf.printWasted( perfmeas );
    // Perf.start();

    // var overlay = document.getElementById('pleasewait');
    // if ( overlay && _view == 'month' ) { overlay.style.display = 'block'; } else { console.log("could not find overlay"); }

    // this.setState({ view: _view });
    // window.location.assign("#/activities/" + _view);


    // console.log("CLICK");
    // console.log(this.props.children.props.route.name);
    // if ( this.props.children.props.route.name == "activities-month" ) { console.log("should show overlay"); } else { console.log("should hide overlay"); }
    var overlay = document.getElementById('pleasewait');
    if ( overlay ) {
      if ( _view == 'month' ) {
        overlay.style.display = 'block';
      } else {
          overlay.style.display = 'none';
      }
    } else {
      console.log("could not find overlay");
    }
    
    // if ( overlay && (this.props.children.props.route.name == "activities-month") ) { overlay.style.display = 'block'; } else { console.log("could not find overlay in App render"); }
    // if ( overlay ) { overlay.style.display = 'block'; } else { console.log("could not find overlay in App render"); }


    setTimeout( function() {
      this.setState({ view: _view });
      window.location.assign("#/activities/" + _view);
    }.bind(this), 0 );

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

            Upcoming activities

        </Button>  
        
        <Button
          bsSize="large"
          className="padded"
          active={ this.state.view === 'month' }
          onClick={ this.setView.bind(this, 'month') }>

            Monthly view

        </Button>

      </ButtonGroup>

    );
  }
});
