import React from 'react';
import moment from 'moment';

import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../../stores/DataActions';
import DataStore from '../../stores/DataStore';
import LanguageActions from '../../stores/LanguageActions';
import LanguageStore from '../../stores/LanguageStore';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Icon from '../General/Icon';


export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status') ],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  onClickType(id) {
    // window.location.assign("#/activity/" + id);
    console.log("selected type " + id);
    this.props.onSelectType(id);
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || !this.state.data || !this.state.data.loaded.activitytypes) {
      return <div></div>;
    }
    
    var types = this.state.data.activitytypes;

    if (this.state.data && this.state.data.loaded.all && this.state.status && this.state.status.community) {

      var activities = this.state.data.activities.filter(
        function(activity) {

          // check if activity is in selected community
          var _group = Helpers.getGroupById(activity.groupId, this);
          if (!_group) {
            return false;
          }
          var _community = Helpers.getCommunityById(_group.communityId, this);
          if (_community.id !== this.state.status.community) {
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

      types.sort((a, b) => b.count - a.count);
      
    }

    var typeItem = function(type) {
      var divClass = classNames('text-center', {
        'selected': this.props.selectedType === type.id
      });
      return ( 
        <li key={type.id} onClick={this.onClickType.bind(this, type.id)} className={divClass}>
          <p><Icon type={'activity-' + type.name} area='agenda' shape='hexagon'/></p>
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
