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

export default React.createClass({

  mixins: [Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status'), Reflux.connect(DataStore, 'data')],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  clickHandler(p) {
    window.location.assign("/#/" + p);
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
            <h1>Welcome!</h1>
            <p></p>
          </div>
        </div>
        <div className="container">

          <div className="row">

        
            <div className="col-md-4 box white linked centered padded" onClick={this.clickHandler.bind(this, "whatsnew")}>
              <h2>What's new?</h2>
              <p>See what changed since you were last here.</p>
            </div> 
        
            <div className="col-md-4 box white linked centered padded" onClick={this.clickHandler.bind(this, "agenda")}>
              <h2>Agenda</h2>
              <p>See all activities in {communityName}</p>
            </div> 

            <div className="col-md-4 box white linked centered padded" onClick={this.clickHandler.bind(this, "photos")}>
              <h2>Photos</h2>
              <p>Recent photos</p>
            </div> 

          </div>

        </div>
      </div>
    );
  }
});
