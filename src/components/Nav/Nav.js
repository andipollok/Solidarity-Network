import React from 'react';
import {Link}  from 'react-router';
import classNames from 'classnames';

import Icon from '../General/Icon';

import { FormattedMessage } from 'react-intl';


export default React.createClass({

  getInitialState() {
    return {
      collapsed: true
    }
  },

  render() {

    var data = this.props.data;
  
    if (data.status.page === '' || data.status.page === 'start') {
      return <div></div>;
    }

    var homeClasses = classNames( 'home', {
      'active': data.status.page === 'home'
    });
    var newsClasses = classNames( 'news', {
      'active': data.status.page === 'news'
    });
    var activitiesClasses = classNames( 'activities', {
      'active': data.status.page === 'activities'
    });
    var storiesClasses = classNames( 'stories', {
      'active': data.status.page === 'stories'
    });
    var settingsClasses = classNames( 'settings', {
      'active': data.status.page === 'settings'
    });

    return (
        <nav className="navbar navbar-bottom" role="navigation">
          <div className="text-center">
            <div id="navbar">
             <ul className="nav navbar-nav">
              <li>
                <Link className={activitiesClasses} activeClassName="active" to="/activities">
                  <div><Icon type='nav-activities' area='activities' size='small' active={data.status && data.status.page === 'activities'}/></div>
                  <FormattedMessage id='nav_activities' defaultMessage='Activities'/>
                </Link>
              </li>
              <li>
                <Link className={storiesClasses} activeClassName="active" to="/stories">
                  <div><Icon type='nav-stories' area='stories' size='small' active={data.status && data.status.page === 'stories'}/></div>
                  <FormattedMessage id='nav_stories' defaultMessage='Stories'/>
                </Link>
              </li>
            </ul>
            </div>
          </div>
        </nav>
    );
  }
});

