import React from 'react';
import {Link}  from 'react-router';
import Airtable from 'airtable';

import ChooseCommunity from './ChooseCommunity';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';

import Icon from './Icon';

import { FormattedNumber, FormattedMessage } from 'react-intl';

// surpress console calls from React Intl when message is not found
if (process.env.NODE_ENV !== 'production') {
  const originalConsoleError = console.error
  if (console.error === originalConsoleError) {
    console.error = (...args) => {
      if (args[0].indexOf('[React Intl] Missing message:') === 0 || args[0].indexOf('[React Intl] Cannot format message:') === 0) {
        return
      }
      originalConsoleError.call(console, ...args)
    }
  }
}

export default React.createClass({

  mixins: [Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status'), Reflux.connect(DataStore, 'data')],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
    $('.navbar .navbar-nav').addClass('collapsed');
    $('body').addClass('collapsed-nav');
  },

  componentWillUnmount() {
    $('.navbar .navbar-nav').removeClass('collapsed');
    $('body').removeClass('collapsed-nav');
    $('#headertext').html('Back to start');
  },

  clickHandler(p) {
    window.location.assign("#/" + p);
  },

  render() {

    if (!this.state.language || (this.state.language && !this.state.language.loaded)) {
      return <div></div>;
    }

    var welcomeHeader = 
        <div className="jumbotron">
          <div className="container text-center">
            <h1><FormattedMessage id='welcome_in' values={{communityName: communityName}}/></h1>
          </div>
        </div>

    var communityName = "";
    if (this.state.status && this.state.status.community) {
      if (this.state.data && this.state.data.loaded.communities && this.state.data.communities[this.state.status.community]) {
        communityName = this.state.data.communities[this.state.status.community].name;
      }
    }

    return (

      <div className="container start">
        <div className="row">
          <div className="col-md-4 box solid linked text-center padded white whatsnew" onClick={this.clickHandler.bind(this, "whatsnew")}>

            <Icon type='whatsnew' area='whatsnew' shape='empty'/>

            <h1><FormattedMessage id='nav_whatsnew'/></h1>
            <p><FormattedMessage id='seewhatsnew'/></p>
          </div>
      
          <div className="col-md-4 box solid linked text-center padded white agenda" onClick={this.clickHandler.bind(this, "agenda")}>
            <Icon type='agenda' area='agenda' shape='empty'/>
            <h1><FormattedMessage id='nav_agenda'/></h1>
            <p><FormattedMessage id='seeagenda' values={{communityName: communityName}}/></p>
          </div>

          <div className="col-md-4 box solid linked text-center padded white photos" onClick={this.clickHandler.bind(this, "photos")}>
            <Icon type='photos' area='photos' shape='empty'/>
            <h1><FormattedMessage id='nav_photos'/></h1>
            <p><FormattedMessage id='seephotos' values={{communityName: communityName}}/></p>
          </div> 

        </div>

      </div>

    );
  }
});
