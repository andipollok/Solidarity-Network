import React from 'react';

import SvgIcon from 'react-svg-icons';
import { Button, Row, Col } from 'react-bootstrap';
import {Link}  from 'react-router';
import { FormattedMessage } from 'react-intl';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';

export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('start');
    StatusActions.setTitle(null);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  // onClickStart() {
  //   window.location.assign('#/activities/type');
  // },

  onClickActivities() {
    window.location.assign('#/activities/type');
  },

  onClickStories() {
    window.location.assign('#/stories');
  },


  render() {

    return (
      <div className="container-fluid start">
        <Row>
          <Col sm={12} className="text-center">
            <p>
              <SvgIcon name='app/alo_logo' color='#FFFFFF'/>
            </p>
            <p>

              <Button bsSize="large" className="showActivities" onClick={this.onClickActivities}>
                <FormattedMessage id='takemetoactivities'/>
              </Button>

              <Button bsSize="large" className="showStories" onClick={this.onClickStories}>
                <FormattedMessage id='takemetostories'/>
              </Button>
        
            </p>
          </Col>
        </Row>
      </div>
    );

    // return (
    //   <div className="container-fluid start">
    //     <Row>
    //       <Col sm={12} className="text-center">
    //         <p>
    //           <SvgIcon name='app/alo_logo' color='#FFFFFF'/>
    //         </p>
    //         <p>
    //           <Button bsSize="large" className="startButton" onClick={this.onClickStart}>

    //             <FormattedMessage id='getstarted'/>

    //           </Button>
    //         </p>
    //       </Col>
    //     </Row>
    //   </div>
    // );

  }

});