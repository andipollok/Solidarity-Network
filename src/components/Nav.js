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

  getInitialState() {
    return {
      collapsed: true
    }
  },

  componentDidMount() {
    // some jQuery to initiate a click whenever a menu item is clicked in the expanded menu. then it closes the menu.
    $('#navbar a').click(function(){
      if(!$('#navbar-collapse-button').hasClass('collapsed')) {
        $('#navbar-collapse-button').click();
      }
    });
    
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  toggleCollapse() {
    this.setState({collapsed: !this.state.collapsed });
  },

  render() {
    
    if (Helpers.checkLanguageLoaded(this) && this.state.status) {

      var community = Helpers.getCommunityFromStatus(this);
      var ulClasses = classNames( 'nav navbar-nav', {
        'collapsed': this.state.status.currentPage === 'start'
      });
      var whatsnewClasses = classNames( 'whatsnew', {
        'active': this.state.status.currentPage === 'whatsnew'
      });
      var agendaClasses = classNames( 'agenda', {
        'active': this.state.status.currentPage === 'agenda'
      });
      var photosClasses = classNames( 'photos', {
        'active': this.state.status.currentPage === 'photos'
      });
    }

    if (this.state.collapsed) {
      var textToggleButton = <FormattedMessage id='nav_openmenu' defaultMessage=' '/>;
    } else {
      var textToggleButton = <FormattedMessage id='nav_closemenu' defaultMessage=' '/>;
    }

    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top" role="navigation">

          <div className="container">
            <div className="navbar-header">
               <div id="navbar-collapse-button" onClick={this.toggleCollapse} className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  {textToggleButton}
                </div>
              <h1 id="headertext"></h1>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className={ulClasses}>
                <li><Link className={whatsnewClasses} activeClassName="active" to="/whatsnew"><FormattedMessage id='nav_whatsnew' defaultMessage='What&#8217;s new?'/></Link></li>
                <li><Link className={agendaClasses} activeClassName="active" to="/agenda"><FormattedMessage id='nav_agenda' defaultMessage='Agenda'/></Link></li>
                <li><Link className={photosClasses} activeClassName="active" to="/photos"><FormattedMessage id='nav_photos' defaultMessage='Photos'/></Link></li>
              </ul>
            </div>
          </div>
   
        </nav>
      </div>
    );
  }
});

