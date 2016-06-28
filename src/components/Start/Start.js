import React from 'react';

import SvgIcon from 'react-svg-icons';
import { Button, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';

export default React.createClass({

  // getInitialState() {
  //   return {
  //      loggedIn: false,
  //   };
  // },

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
    // this.setState({ loggedIn: true });
  },

  render() {

    // if (this.props.loggedIn) {

      return (
      <div className="container-fluid start">
        <Row>
          <Col sm={12} className="text-center">
            <p>
              <SvgIcon name='app/alo_logo' color='#FFFFFF'/>
            </p>
            {this.props.loggedIn}            
            <p>
              <Button bsSize="large" className="startButton" onClick={this.onClickStart}>

                <FormattedMessage id='getstarted'/>

              </Button>
            </p>
          </Col>
        </Row>
      </div>
    );

   //  } else {

	  // return (
   //    <div className="container-fluid start">
   //      <Row>
   //        <Col sm={12} className="text-center">
   //          <p>
   //            <SvgIcon name='app/alo_logo' color='#FFFFFF'/>
   //          </p>
   //          <p>
			// 	<FormattedMessage id='loginrequired'/>
			// </p>
			// <p>
   //            <Button bsSize="large" className="loginButton" onClick={this.onClickLogin}>

   //              <FormattedMessage id='logmein'/>

   //            </Button>
   //          </p>
   //        </Col>
   //      </Row>
   //    </div>
   //  );

      
    // }

  }
});