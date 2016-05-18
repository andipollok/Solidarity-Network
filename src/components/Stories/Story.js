import React from 'react';
import classNames from 'classnames';
import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import moment from 'moment';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';


export default React.createClass({

  getInitialState: function() {
    return {
      activities: [],
      activitiesFuture: [],
      foundActivities: false,
      foundActivitiesFuture: false
    };
  },

  componentDidMount() {
    StatusActions.setPage('story');
    StatusActions.showBackButton(true);
    StatusActions.setTitle(<FormattedMessage id='story' defaultMessage='Story'/>);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },


  render() {

    var data = this.props.data;

    return (
      <div className="container stories">
        Story
      </div>
    );
  }
});
