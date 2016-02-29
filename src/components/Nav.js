import React from 'react';
import {Link}  from 'react-router';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';

import { FormattedMessage } from 'react-intl';

export default React.createClass({

  mixins: [Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status'), Reflux.connect(DataStore, 'data')],

  componentDidMount() {
    StatusActions.forceTrigger();

    $('.nav a').click(function(){
      if(!$('#navbar-collapse-button').hasClass('collapsed')) {
        $('#navbar-collapse-button').click();
      }
    });
    $('#navbar-collapse-button').click(function() {
      if(!$('#navbar-collapse-button').hasClass('collapsed')) {
        $('#navbar-openmenu').show();
        $('#navbar-closemenu').hide();
      }
      else {
        $('#navbar-openmenu').hide();
        $('#navbar-closemenu').show();
      }
    });

    $('#navbar-closemenu').hide();
    
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  render() {

    if (!this.state.language || (this.state.language && !this.state.language.loaded)) {
      return <div></div>;
    }

    var communityName = "";
    if (this.state.status && this.state.status.community) {
      if (this.state.data && this.state.data.loaded.communities && this.state.data.communities[this.state.status.community]) {
        communityName = this.state.data.communities[this.state.status.community].name;
      }
    }
    
    var selectedLanguage = <span>none</span>;
    if (this.state.language && this.state.language.selected) {
      selectedLanguage = <span>{this.state.language.selected}</span>;
    }

    var navCollapseable = 
      <span>
      <div className="navbar-header">
        <div id="navbar-collapse-button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span id="navbar-openmenu"><FormattedMessage id='nav_openmenu'/></span>
          <span id="navbar-closemenu"><FormattedMessage id='nav_closemenu'/></span>
        </div>
      </div>
      <div id="navbar" className="navbar-collapse">
        <ul className="nav navbar-nav">
          <li><Link className="whatsnew" activeClassName="active" to="/whatsnew"><FormattedMessage id='nav_whatsnew'/></Link></li>
          <li><Link className="agenda" activeClassName="active" to="/agenda"><FormattedMessage id='nav_agenda'/></Link></li>
          <li><Link className="photos" activeClassName="active" to="/photos"><FormattedMessage id='nav_photos'/></Link></li>
        </ul>
      </div>
      </span>

    var nav = 
      <div className="container">
        <div className="nav header">
          <Link to="/"><h1 id="headertext">Solidarity Network {communityName}</h1></Link>
        </div>
        <ul id="navbar" className="nav navbar-nav collapsed">
          <li><Link className="whatsnew" activeClassName="active" to="/whatsnew"><FormattedMessage id='nav_whatsnew'/></Link></li>
          <li><Link className="agenda" activeClassName="active" to="/agenda"><FormattedMessage id='nav_agenda'/></Link></li>
          <li><Link className="photos" activeClassName="active" to="/photos"><FormattedMessage id='nav_photos'/></Link></li>
        </ul>
      </div>

    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">

          {nav}
   
        </nav>
      </div>
    );
  }
});

