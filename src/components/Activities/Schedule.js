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

import AgendaListitem from './AgendaListitem';
import ActivityTypeSelector from './ActivityTypeSelector';


export default React.createClass({

  getInitialState: function() {
    return {
      type: ''
    };
  },

  onClickActivity(id) {
    window.location.assign("#/activity/" + id);
  },

  setType(_type) {
    this.setState({ type: _type });
  },

  render() {

    var data = this.props.data;

    var activities = [];
    var community = Helpers.getCommunityById(data.status.community, data);

    activities = data.activities.filter(
      function(activity) {

        // check if activity is in selected community
        var _group = Helpers.getGroupById(activity.groupId, data);
        if (!_group) {
          return false;
        }
        var _community = Helpers.getCommunityById(_group.communityId, data);
        if (_community.id !== data.status.community) {
          return false; // filter this entry if item is not in the community
        }

        // check if activity is in the past
        if (moment(activity.date) < moment()) {
          return false;
        }

        // check if has selected type
        if (this.state.type !== '' && activity.typeId !== this.state.type) {
          return false;
        }

        return true;
      }.bind(this)
    );

    var activityItem = function(activity) {
      return ( <AgendaListitem key={activity.id} activity={activity} data={data} showDate={true} showTime={true} showIcon={this.state.type === ''} onClickHandler={this.onClickActivity} /> );
    }.bind(this);
  
    if (activities.length === 0) {
      // no events found
      var NotFound = <Col className="container text-center box white half"><h2><FormattedMessage id='noactivities' values={{communityName: community.name}}/></h2></Col>;
    }

    return (
        <div className="container agenda">

          <ActivityTypeSelector onSelectType={this.setType} data={data} selectedType={this.state.type}/>

          <Row>{activities.map(activityItem, this)}</Row>

          {NotFound}

        </div>
    );
  }
});
