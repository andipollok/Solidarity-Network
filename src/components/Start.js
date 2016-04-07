import React from 'react';
import {Link}  from 'react-router';
import { Row, Col } from 'react-bootstrap';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import Helpers from '../stores/Helpers.js';

import ChooseCommunity from './ChooseCommunity';
import Icon from './Icon';

import { FormattedNumber, FormattedMessage } from 'react-intl';


export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status'), Reflux.connect(DataStore, 'data') ],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
    StatusActions.setArea('start');
  },

  clickHandler(p) {
    window.location.assign("#/" + p);
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this)) {
      return <div></div>;
    }

    var communityName = Helpers.getCommunityFromStatus(this).name;

    var welcomeHeader = 
        <div className="jumbotron">
          <div className="container text-center">
            <h1><FormattedMessage id='welcome_in' values={{communityName: communityName}}/></h1>
          </div>
        </div>


    return (

      <div className="container start">

        <Row>
          <Col md={4} className="bottom-buffer" onClick={this.clickHandler.bind(this, "whatsnew")}>
            <div className="box white linked text-center whatsnew">
              <Icon type='whatsnew' area='whatsnew' shape='empty'/>
              <h1><FormattedMessage id='nav_whatsnew'/></h1>
              <p><FormattedMessage id='seewhatsnew'/></p>
            </div>
          </Col>
      
          <Col md={4} className="bottom-buffer" onClick={this.clickHandler.bind(this, "agenda")}>
            <div className="box white linked text-center agenda">
              <Icon type='agenda' area='agenda' shape='empty'/>
              <h1><FormattedMessage id='nav_agenda'/></h1>
              <p><FormattedMessage id='seeagenda' values={{communityName: communityName}}/></p>
            </div>
          </Col>

          <Col md={4} className="bottom-buffer" onClick={this.clickHandler.bind(this, "photos")}>
            <div className="box white linked text-center agenda">
              <Icon type='photos' area='photos' shape='empty'/>
              <h1><FormattedMessage id='nav_photos'/></h1>
              <p><FormattedMessage id='seephotos' values={{communityName: communityName}}/></p>
            </div>
          </Col>

        </Row>

      </div>

    );
  }
});
