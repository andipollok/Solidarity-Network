import React from 'react';
import classNames from 'classnames';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Icon from './Icon';

export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data'), Reflux.connect(StatusStore, 'status')],

  componentDidMount() {
    DataActions.forceTrigger();
    StatusActions.forceTrigger();
    $('#navbar .agenda').addClass('active');
  },

  componentWillUnmount() {
    $('#navbar .agenda').removeClass('active');
  },

  render() {
    var communityName = "";

    if (this.state.status && this.state.status.community) {
      if (this.state.data && this.state.data.loaded.communities && this.state.data.communities[this.state.status.community]) {
        communityName = this.state.data.communities[this.state.status.community].name;
      }
    }

    var activity = {};
    var activityComponent;
    if (this.state.data && this.state.data.loaded.activities) {
      activity = this.state.data.activities[this.props.params.id];

      if (this.state.data.loaded.groups) {
        var groupName = this.state.data.groups[activity.group].name;
        var ownerId = this.state.data.groups[activity.group].owner;
        if (this.state.data.loaded.people) {
          var ownerName = this.state.data.people[ownerId].name;
        }
      }

      activityComponent = 
        
        <div className="box white container text-center">

          <Icon type={'activity-' + activity.type} area='agenda' shape='hexagon'/>

          <h1>{activity.name}</h1>

          <h3><FormattedMessage id="on" defaultMessage=" "/>
              &nbsp;<FormattedDate
                    value={activity.date}
                    weekday="long"
                    day="numeric"
                    month="long"
                    year="numeric" /> 
              &nbsp;<span className="grey">(<FormattedRelative value={activity.date} />)</span>
          </h3>

          <h3><FormattedMessage id="startingat" defaultMessage=" "/>
              &nbsp;<FormattedTime
                    value={activity.date}
                    minute="2-digit"
                    hour="numeric" /></h3>

          <p><FormattedMessage id="group" defaultMessage="Group"/> {groupName}
             &nbsp;<FormattedMessage id="by" defaultMessage="by"/> {ownerName}</p>

        </div>

    }

    return (
      <div>
        {activityComponent}
      </div>
    );
  }
});
