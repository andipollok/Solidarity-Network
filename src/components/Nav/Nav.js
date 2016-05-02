import React from 'react';
import {Link}  from 'react-router';
import classNames from 'classnames';

import Helpers from '../../stores/Helpers.js';

import Icon from '../General/Icon';

import { FormattedMessage } from 'react-intl';

export default React.createClass({

  // mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status'), Reflux.connect(DataStore, 'data') ],

  getInitialState() {
    return {
      collapsed: true
    }
  },

  // componentDidMount() {
  //   DataActions.forceTrigger();
  //   LanguageActions.forceTrigger();
  //   StatusActions.forceTrigger();
  // },


  render() {

    var data = this.props.data;
    
    if (data.status) {
      var whatsnewClasses = classNames( 'whatsnew', {
        'active': data.status.currentPage === 'whatsnew'
      });
      var agendaClasses = classNames( 'agenda', {
        'active': data.status.currentPage === 'agenda'
      });
      var photosClasses = classNames( 'photos', {
        'active': data.status.currentPage === 'photos'
      });
    }

    return (
        <nav className="navbar navbar-default navbar-top hidden-sm hidden-xs" role="navigation">
          <div className="container">
            <ul className="nav navbar-nav">
              <li>
                <Link className={whatsnewClasses} activeClassName="active" to="/whatsnew">
                  <div><Icon type={'whatsnew'} area='whatsnew' active={data.status && data.status.currentPage === 'whatsnew'}/></div>
                  <FormattedMessage id='nav_whatsnew' defaultMessage='News'/>
                </Link>
              </li>
              <li>
                <Link className={agendaClasses} activeClassName="active" to="/agenda">
                  <div><Icon type={'agenda'} area='agenda' active={data.status && data.status.currentPage === 'agenda'}/></div>
                  <FormattedMessage id='nav_agenda' defaultMessage='Agenda'/>
                </Link>
              </li>
              <li>
                <Link className={photosClasses} activeClassName="active" to="/photos">
                  <div><Icon type={'photos'} area='photos' active={data.status && data.status.currentPage === 'photos'}/></div>
                  <FormattedMessage id='nav_photos' defaultMessage='Stories'/>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

    );
  }
});

