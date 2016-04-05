import React from 'react';
import {Link}  from 'react-router';
import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import Helpers from '../stores/Helpers.js';

import Icon from './Icon';

import { FormattedMessage } from 'react-intl';


import createHashHistory from 'history/lib/createHashHistory';

const history = createHashHistory();


export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status'), Reflux.connect(DataStore, 'data') ],

  getInitialState() {
    return {}
  },

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  onClickBack() {
    console.log("on click back");
    history.goBack();
  },

  render() {
    
    if (Helpers.checkLanguageLoaded(this) && this.state.status) {
      var pageHeadings = {
        whatsnew: <FormattedMessage id='nav_whatsnew' defaultMessage='What&#8217;s new?'/>,
        agenda: <FormattedMessage id='nav_agenda' defaultMessage='Agenda'/>,
        photos: <FormattedMessage id='nav_photos' defaultMessage='Photos'/>
      };
      var pageHeading = pageHeadings[this.state.status.currentPage];

      var barClasses = classNames( "top-bar", this.state.status.currentPage);
  
    }

    if (history) {
      var BackButton = <Button onClick={this.onClickBack}>&lt; Back</Button>;
    }

    return (
      <div className="container-fluid hidden-md hidden-lg">
        <Row className={barClasses}>
          <Col className="box solid no-padding">
            <div className="top-flex">
              <div className="top-flex-left text-left">
                {BackButton}
              </div>
              <div className="top-flex-middle text-center">
                <h4>{pageHeading}</h4>
              </div>
              <div className="top-flex-right text-right">
                
              </div>
            </div>
          </Col>
        </Row>

      </div>
    );
  }
});

