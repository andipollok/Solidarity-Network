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

import Icon from './Icon';

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

      // var ulClasses = classNames( 'nav navbar-nav', {
      //   'collapsed': this.state.status.currentPage === 'start'
      // });
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

/*    if (this.state.collapsed) {
      var textToggleButton = <FormattedMessage id='nav_openmenu' defaultMessage=' '/>;
    } else {
      var textToggleButton = <FormattedMessage id='nav_closemenu' defaultMessage=' '/>;
    }*/

    return (
      <span>

        <nav className="navbar navbar-default navbar-top hidden-sm hidden-xs" role="navigation">

          <div className="container">
            <ul className="nav navbar-nav">
              <li>
                <Link className={whatsnewClasses} activeClassName="active" to="/whatsnew">
                  <div><Icon type={'whatsnew'} area='whatsnew' active={this.state.status && this.state.status.currentPage === 'whatsnew'}/></div>
                  <FormattedMessage id='nav_whatsnew' defaultMessage='What&#8217;s new?'/>
                </Link>
              </li>
              <li>
                <Link className={agendaClasses} activeClassName="active" to="/agenda">
                  <div><Icon type={'agenda'} area='agenda' active={this.state.status && this.state.status.currentPage === 'agenda'}/></div>
                  <FormattedMessage id='nav_agenda' defaultMessage='Agenda'/>
                </Link>
              </li>
              <li>
                <Link className={photosClasses} activeClassName="active" to="/photos">
                  <div><Icon type={'photos'} area='photos' active={this.state.status && this.state.status.currentPage === 'photos'}/></div>
                  <FormattedMessage id='nav_photos' defaultMessage='Photos'/>
                </Link>
              </li>
            </ul>
          </div>
   
        </nav>

        <nav className="navbar navbar-bottom navbar-fixed-bottom hidden-md hidden-lg" role="navigation">
          <div className="container text-center">
            <div id="navbar">
             <ul className="nav navbar-nav">
              <li>
                <Link className={whatsnewClasses} activeClassName="active" to="/whatsnew">
                  <div><Icon type={'whatsnew'} area='whatsnew' size='small' active={this.state.status && this.state.status.currentPage === 'whatsnew'}/></div>
                  <FormattedMessage id='nav_whatsnew' defaultMessage='What&#8217;s new?'/>
                </Link>
              </li>
              <li>
                <Link className={agendaClasses} activeClassName="active" to="/agenda">
                  <div><Icon type={'agenda'} area='agenda' size='small' active={this.state.status && this.state.status.currentPage === 'agenda'}/></div>
                  <FormattedMessage id='nav_agenda' defaultMessage='Agenda'/>
                </Link>
              </li>
              <li>
                <Link className={photosClasses} activeClassName="active" to="/photos">
                  <div><Icon type={'photos'} area='photos' size='small' active={this.state.status && this.state.status.currentPage === 'photos'}/></div>
                  <FormattedMessage id='nav_photos' defaultMessage='Photos'/>
                </Link>
              </li>
            </ul>
            </div>
          </div>
        </nav>
      </span>
    );
  }
});

