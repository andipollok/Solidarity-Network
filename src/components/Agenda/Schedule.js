import React from 'react';
import moment from 'moment';

import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

import Reflux from 'reflux';
import DataActions from '../../stores/DataActions';
import DataStore from '../../stores/DataStore';
import LanguageActions from '../../stores/LanguageActions';
import LanguageStore from '../../stores/LanguageStore';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Listitem from './AgendaListitem';
import ActivityTypeSelector from './ActivityTypeSelector';


export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status') ],

  getInitialState: function() {
    return {
      type: ''
    };
  },

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  onClickActivity(id) {
    window.location.assign("#/activity/" + id);
  },


  setType(_type) {
    this.setState({ type: _type });
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || !this.state.status || !this.state.status.community) {
      return <div></div>;
    }
    var activities = [];
    var community = Helpers.getCommunityById(this.state.status.community, this);

    if (this.state.data && this.state.data.loaded.all) {

      activities = this.state.data.activities.filter(
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

          // check if has selected type
          if (this.state.type !== '' && activity.typeId !== this.state.type) {
            return false;
          }

          return true;
        }.bind(this)
      );
    }

    var activityItem = function(activity) {
      return ( <Listitem key={activity.id} data={activity} showDate={true} showTime={true} onClickHandler={this.onClickActivity}></Listitem> );
    }.bind(this);
  
    if (activities.length === 0) {
      // no events found
      var NotFound = <Col className="container text-center box white half"><h2><FormattedMessage id='noactivities' values={{communityName: community.name}}/></h2></Col>;
    }

    return (
        <div className="container agenda">

          <ActivityTypeSelector onSelectType={this.setType} selectedType={this.state.type}/>

          <Row>{activities.map(activityItem, this)}</Row>

          {NotFound}

        </div>
    );
  }
});
