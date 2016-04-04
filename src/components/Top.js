import React from 'react';
import {Link}  from 'react-router';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

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

    return (
      <div className="container-fluid hidden-md hidden-lg">
        <Row className={barClasses}>
          <Col className="text-center box solid no-padding">
            <h4>{pageHeading}</h4>
          </Col>
        </Row>

      </div>
    );
  }
});

