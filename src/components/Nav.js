import React from 'react';
import {Component} from 'react';
import {Router} from 'react-router';
import {Link}  from 'react-router';
import {RouteHandler} from 'react-router';
import cookie from 'react-cookie';
import classNames from 'classnames';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';

export default React.createClass({

  mixins: [Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status')],

  componentDidMount() {
    StatusActions.forceTrigger();
    $('.nav a').click(function(){
      if(!$('#navbar-collapse-button').hasClass('collapsed')) {
        $('#navbar-collapse-button').click();
      }
    });
    $('#navbar-collapse-button').click(function() {
      if(!$('#navbar-collapse-button').hasClass('collapsed')) {
        $('#navbar-collapse-button').html("Open Menu");
      }
      else {
        $('#navbar-collapse-button').html("Close Menu");
      }
    })
  },

  getInitialState() {
    return {};
  },

  render() {
    
    var selectedLanguage = <span>none</span>;
    if (this.state.language && this.state.language.selected) {
      selectedLanguage = <span>{this.state.language.selected}</span>;
    }

    var menuItems;
    if (this.state.status) {
      if (this.state.status.join === true) {
        // joined users
        menuItems =  
          <ul className="nav navbar-nav ">
            <li><Link activeClassName="active" to="/whatsnew">What's new?</Link></li>
            <li><Link activeClassName="active" to="/agenda">Agenda</Link></li>
            <li><Link activeClassName="active" to="/photos">Photos</Link></li>
            <li><Link activeClassName="active" to="/settings">Settings</Link></li>
          </ul> 
      }
      else if (this.state.status.join === false) {
        // new users
        menuItems =  
          <ul className="nav navbar-nav ">
            <li><Link activeClassName="active" to="/whatsnew">What's new?</Link></li>
            <li><Link activeClassName="active" to="/photos">Photos</Link></li>
            <li><Link activeClassName="active" to="/join">Join</Link></li>
            <li><Link activeClassName="active" to="/settings">Settings</Link></li>
          </ul>
      }
    }
    else {
      menuItems =  <ul className="nav navbar-nav ">xxxx</ul>
    }
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <div id="navbar-collapse-button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                Open Menu
              </div>
              <Link className="navbar-brand" to="#">Solidarity Network</Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                {menuItems}
            </div>
          </div>
        </nav>
      </div>
    );
  }
});

