import React from 'react';
import {Link}  from 'react-router';
import Airtable from 'airtable';

import ChooseCommunity from './ChooseCommunity';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';

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
  },

  clickHandler(p) {
    window.location.assign("#/" + p);
  },

  render() {

    var communityName = "";
    if (this.state.status && this.state.status.community) {
      if (this.state.data && this.state.data.loaded.communities && this.state.data.communities[this.state.status.community]) {
        communityName = this.state.data.communities[this.state.status.community].name;
      }
    }

    return (

      <div>
        <div className="jumbotron">
          <div className="container centered">
            <h1><FormattedMessage id='welcome_in' values={{communityName: communityName}}/></h1>
          </div>
        </div>
        <div className="container">

          <div className="row">

            <div className="col-md-4 box white linked centered padded" onClick={this.clickHandler.bind(this, "whatsnew")}>
              <h2><FormattedMessage id='nav_whatsnew'/></h2>
              <p><FormattedMessage id='seewhatsnew'/></p>
            </div> 
        
            <div className="col-md-4 box white linked centered padded" onClick={this.clickHandler.bind(this, "agenda")}>
              <h2><FormattedMessage id='nav_agenda'/></h2>
              <p><FormattedMessage id='seeagenda' values={{communityName: communityName}}/></p>
            </div> 

            <div className="col-md-4 box white linked centered padded" onClick={this.clickHandler.bind(this, "photos")}>
              <h2><FormattedMessage id='nav_photos'/></h2>
              <p><FormattedMessage id='seephotos' values={{communityName: communityName}}/></p>
            </div> 

          </div>

        </div>
      </div>
    );
  }
});
