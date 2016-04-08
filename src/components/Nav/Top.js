import React from 'react';
import {Link}  from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../../stores/DataActions';
import DataStore from '../../stores/DataStore';
import LanguageActions from '../../stores/LanguageActions';
import LanguageStore from '../../stores/LanguageStore';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Icon from '../General/Icon';

import { FormattedMessage } from 'react-intl';


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
    StatusActions.historyBack();
  },

  onClickForward() {
    StatusActions.historyForward();
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
 
      if (this.state.status.history && this.state.status.history.length > 1) {
        var title = this.state.status.history[this.state.status.history.length-2].title;
        if (title && title !== '') {
          var BackButton = <Button onClick={this.onClickBack}>&lt; {title}</Button>;
        }
        else {
          var BackButton = <Button onClick={this.onClickBack}>&lt; Back</Button>;
        }
      }

      if (this.state.status.future && this.state.status.future.length > 0) {
        var title = this.state.status.future[this.state.status.future.length-1].title;
        if (title && title !== '') {
          var ForwardButton = <Button onClick={this.onClickForward}>{title}&gt;</Button>;
        }
        else {
          var ForwardButton = <Button onClick={this.onClickForward}>Forward &gt;</Button>;
        }
      }
  
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
                {ForwardButton}
              </div>
            </div>
          </Col>
        </Row>

      </div>
    );
  }
});

