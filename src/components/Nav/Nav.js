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
    var activitiesClasses = classNames( 'activities', 'link',  {
      'active': data.status.page === 'activities'
    });
    var storiesClasses = classNames( 'stories', 'link', {
      'active': data.status.page === 'stories'
    });
    var settingsClasses = classNames( 'settings', {
      'active': data.status.page === 'settings'
    });

    var ActivitiesNav, StoriesNav;

    if (data.status && data.status.page === 'activities') {
      ActivitiesNav = <div className="link active">
                    <Icon type='activity' folder='service' size='medium' isNav={true} isActive={true}/>
                    <br />
                    <span className="text"><FormattedMessage id='nav_activities' defaultMessage='Activities'/></span>
                  </div>
    } else {
      ActivitiesNav = <Link className={activitiesClasses} activeClassName="active" to="/activities">
                  <Icon type='activity' folder='service' size='medium' isNav={true} isActive={false}/>
                  <br />
                  <span className="text"><FormattedMessage id='nav_activities' defaultMessage='Activities'/></span>
                </Link>
    }

    if (data.status && data.status.page === 'stories') {
      StoriesNav = <div className="link active">
                  <Icon type='story' folder='activities' size='medium' isNav={true} isActive={true}/>
                  <br />
                  <span className="text"><FormattedMessage id='nav_stories' defaultMessage='Stories'/></span>
                </div>
    } else {
      StoriesNav = <Link className={storiesClasses} activeClassName="active" to="/stories">
                  <Icon type='story' folder='activities' size='medium' isNav={true} isActive={false}/>
                  <br />
                  <span className="text"><FormattedMessage id='nav_stories' defaultMessage='Stories'/></span>
                </Link>
    }

    return (
        <nav className="navbar navbar-bottom" role="navigation">
          <div className="text-center">
            <div id="navbar">
             <ul className="nav navbar-nav">
              <li>
                {ActivitiesNav}
              </li>
              <li>
                {StoriesNav}
              </li>
            </ul>
            </div>
          </div>
        </nav>
    );
  }
});

