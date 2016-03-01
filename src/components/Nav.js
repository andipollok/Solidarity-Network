import React from 'react';
import {Link}  from 'react-router';
import classNames from 'classnames';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import Helpers from '../stores/Helpers.js';

import { FormattedMessage } from 'react-intl';

export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status'), Reflux.connect(DataStore, 'data') ],

  componentDidMount() {
    // $('.nav a').click(function(){
    //   if(!$('#navbar-collapse-button').hasClass('collapsed')) {
    //     $('#navbar-collapse-button').click();
    //   }
    // });
    // $('#navbar-collapse-button').click(function() {
    //   if(!$('#navbar-collapse-button').hasClass('collapsed')) {
    //     $('#navbar-openmenu').show();
    //     $('#navbar-closemenu').hide();
    //   }
    //   else {
    //     $('#navbar-openmenu').hide();
    //     $('#navbar-closemenu').show();
    //   }
    // });
    // $('#navbar-closemenu').hide();
    
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  render() {
    
    if (!Helpers.checkLanguageLoaded(this) || !this.state.status) {
      return <div></div>;
    }

    var community = Helpers.getCommunityFromStatus(this);
    var navbarClasses = classNames( ['nav navbar-nav'], {
      'collapsed': this.state.status.currentPage === 'start'
    });
    var whatsnewClasses = classNames( ['whatsnew'], {
      'active': this.state.status.currentPage === 'whatsnew'
    });
    var agendaClasses = classNames( ['agenda'], {
      'active': this.state.status.currentPage === 'agenda'
    });
    var photosClasses = classNames( ['photos'], {
      'active': this.state.status.currentPage === 'photos'
    });

    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">

          <div className="container">
            <div className="nav header">
              <Link to="/"><h1 id="headertext">Solidarity Network {community.name}</h1></Link>
            </div>
            <ul id="navbar" className={navbarClasses}>
              <li><Link className={whatsnewClasses} activeClassName="active" to="/whatsnew"><FormattedMessage id='nav_whatsnew'/></Link></li>
              <li><Link className={agendaClasses} activeClassName="active" to="/agenda"><FormattedMessage id='nav_agenda'/></Link></li>
              <li><Link className={photosClasses} activeClassName="active" to="/photos"><FormattedMessage id='nav_photos'/></Link></li>
            </ul>
          </div>
   
        </nav>
      </div>
    );
  }
});

