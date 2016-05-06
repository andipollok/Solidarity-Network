import React from 'react';
import moment from 'moment';

import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'react-bootstrap';

import Helpers from '../../stores/Helpers.js';

import IconActivity from '../General/IconActivity';


export default React.createClass({

  onClickType(id) {
    this.props.onSelectType(id);
  },

  render() {

    var data = this.props.data;
    var types = data.activitytypes;

    var activities = data.activities.filter(
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

        return true;
      }.bind(this)
    );

    for (var type of types) {
      type.count = 0;
      activities.map(function(activity) {
        // check if has selected type
        if (type.id === activity.typeId) {
          type.count++;
        }
      });
    }

    // sort by count, but also sort alhpabetically if same count
    types.sort(function(a, b) {
      if (b.count - a.count !== 0) {
        return b.count - a.count;
      }
      else {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        else { return 0; }
      }
    });

    var typeItem = function(type) {
      var divClass = classNames('text-center', {
        'selected': this.props.selectedType === type.id
      });
      return (
        <li key={type.id} onClick={this.onClickType.bind(this, type.id)} className={divClass}>
          <p><IconActivity type={type} area='activities' active='false'/></p>
          <p>{type.name}</p>
          {type.count}
        </li>
      );
    }.bind(this);

    return (
      <div className="activity-type-list">
        <ul>
          {types.map(typeItem)}
        </ul>
      </div>
    );
  }
});
