import React from 'react';
import {Component} from 'react';
import {Router} from 'react-router';
import {Link}  from 'react-router';
import {RouteHandler} from 'react-router';
import cookie from 'react-cookie';
import classNames from 'classnames';

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

    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <div id="navbar-collapse-button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span id="navbar-openmenu"><FormattedMessage id='nav_openmenu'/></span>
                <span id="navbar-closemenu"><FormattedMessage id='nav_closemenu'/></span>
              </div>
              <Link className="navbar-brand" to="#">{communityName}</Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav ">
                <li><Link activeClassName="active" to="/whatsnew"><FormattedMessage id='nav_whatsnew'/></Link></li>
                <li><Link activeClassName="active" to="/agenda"><FormattedMessage id='nav_agenda'/></Link></li>
                <li><Link activeClassName="active" to="/photos"><FormattedMessage id='nav_photos'/></Link></li>
                <li><Link activeClassName="active" to="/settings"><FormattedMessage id='nav_settings'/></Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
});

