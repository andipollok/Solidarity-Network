import React from 'react';
import moment from 'moment';

import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import UpcomingItem from './UpcomingItem';
import TypeSelectorButton from '../General/TypeSelectorButton';

import ViewSelectorButtons from './ViewSelectorButtons';

export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('activities');
    StatusActions.showBackButton(false);
    StatusActions.setTitle(<FormattedMessage id='nav_activities' />);
    StatusActions.setSecondaryNav(<ViewSelectorButtons data={this.props.data} view='upcoming'/>);
    StatusActions.forceTrigger();
  },

  onClickActivity(id) {
    window.location.assign("#/activity/" + id);
  },

  render() {

    var data = this.props.data;

    var activities = [];
    var area = Helpers.getAreaById(data.status.area, data);

    activities = data.activities.filter(
      function(activity) {

        // check if activity is in the future
        if (moment(activity.date) < moment()) {
          return false;
        }

        // check if activity is of selected type(s)
        if (data.status.selectedActivityTypes.length > 0 && data.status.selectedActivityTypes.indexOf(activity.typeId) === -1) {
          return false;
        }

        return true;
      }.bind(this)
    );


    var activityItem = function(activity) {
      return ( <UpcomingItem key={activity.id}
                activity={activity}
                data={data}
                showDate={true}
                showTime={true}
                showIcon={true}
                onClickHandler={this.onClickActivity} /> );
    }.bind(this);
  
    if (activities.length === 0) {
      // no events found
      var NotFound = <Col className="container text-center box white half"><h2><FormattedMessage id='noactivities' values={{areaName: area.name}}/></h2></Col>;
    }

    return (

      <div className="container activities">

        <TypeSelectorButton data={data}/>

        <Row>
          {activities.map(activityItem, this)}
        </Row>

        {NotFound}

      </div>

    );
  }
});
