import React from 'react';

import SvgIcon from 'react-svg-icons';
import { Button, Row, Col } from 'react-bootstrap';
import { Link }  from 'react-router';
import { FormattedMessage } from 'react-intl';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import Icon from '../General/Icon';

export default React.createClass({

  getInitialState() {
    return {
      step: 1
    };
  },

  componentWillMount() {
    StatusActions.setPage('start');
    StatusActions.setTitle(null);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  onClickActivities() {
    StatusActions.setGotoDestination("#/activities");
    window.location.assign('#/activities/type');
  },

  onClickStories() {
    window.location.assign('#/stories');
  },

  render() {

    switch ( this.state.step ) {
      case 1:
          return (
            <div className="container-fluid start">
              <Row>
                <Col sm={12} className="text-center">
                  <p>
                    <ReactCSSTransitionGroup transitionName="move-up" transitionAppear={true} transitionEnterTimeout={0} transitionLeaveTimeout={0}
                        transitionAppearTimeout={2000}>
                        <SvgIcon name='app/alo_logo' color='#FFFFFF'/>
                    </ReactCSSTransitionGroup>
                  </p>

                    <ReactCSSTransitionGroup transitionName="fade-in1" transitionAppear={true} transitionEnterTimeout={0} transitionLeaveTimeout={0}
                      transitionAppearTimeout={5000}>
                      <p className="item">
                        <Icon type='activity' folder='service' size='large' area='splash'/>
                        <br />
                        <Button bsSize="large" className="showActivities" onClick={this.onClickActivities}>
                          <FormattedMessage id='takemetoactivities'/>
                        </Button>
                      </p>
                    </ReactCSSTransitionGroup>

                    <ReactCSSTransitionGroup transitionName="fade-in2" transitionAppear={true} transitionEnterTimeout={0} transitionLeaveTimeout={0}
                      transitionAppearTimeout={5000}>
                      <p className="item">
                        <Icon type='story' folder='activities' size='large' area='splash'/>
                        <br />
                        <Button bsSize="large" className="showStories" onClick={this.onClickStories}>
                          <FormattedMessage id='takemetostories'/>
                        </Button>
                      </p>
                    </ReactCSSTransitionGroup>
                </Col>
              </Row>
            </div>
          );
          break;

      case 2:
          return (
            <div className="container-fluid start">
              <Row>
                <Col sm={12} className="text-center">
                  <p>
                    <ReactCSSTransitionGroup transitionName="move-up" transitionAppear={true} transitionEnterTimeout={0} transitionLeaveTimeout={0}
                        transitionAppearTimeout={2000}>
                        <SvgIcon name='app/alo_logo' color='#FFFFFF'/>
                    </ReactCSSTransitionGroup>
                  </p>

                    <ReactCSSTransitionGroup transitionName="fade-in1" transitionAppear={true} transitionEnterTimeout={0} transitionLeaveTimeout={0}
                      transitionAppearTimeout={5000}>
                      <p className="item">
                        <Icon type='activity' folder='service' size='large' area='splash'/>
                        <br />
                        <Button bsSize="large" className="showActivities" onClick={this.onClickActivities}>
                          <FormattedMessage id='takemetoactivities'/>
                        </Button>
                      </p>
                    </ReactCSSTransitionGroup>

                    <ReactCSSTransitionGroup transitionName="fade-in2" transitionAppear={true} transitionEnterTimeout={0} transitionLeaveTimeout={0}
                      transitionAppearTimeout={5000}>
                      <p className="item">
                        <Icon type='story' folder='activities' size='large' area='splash'/>
                        <br />
                        <Button bsSize="large" className="showStories" onClick={this.onClickStories}>
                          <FormattedMessage id='takemetostories'/>
                        </Button>
                      </p>
                    </ReactCSSTransitionGroup>
                </Col>
              </Row>
            </div>
          );
          break;


    }

  }

});