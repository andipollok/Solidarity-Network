import React from 'react';
import moment from 'moment';
import createHashHistory from 'history/lib/createHashHistory';

import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import IconActivity from '../General/IconActivity';

const history = createHashHistory();


export default React.createClass({

  mixins: [ Reflux.connect(StatusStore, 'status') ],

  componentWillMount() {
    StatusActions.setPage('typeselector');
    StatusActions.showBackButton(true);
    StatusActions.setTitle(<FormattedMessage id='nav_activities' defaultMessage='Activities'/>);
    StatusActions.setSecondaryNav(null);
  },

  addType(id) {
    StatusActions.clearActivityTypes();
    StatusActions.addActivityType(id);
    setTimeout(function() { 
      history.goBack();
    }, 100);
  },

  removeType(id) {
    StatusActions.removeActivityType(id);
    history.goBack();
  },

  render() {

    var data = this.props.data;
    var types = data.activitytypes;

    var activities = data.activities.filter(
      function(activity) {

        // check if this activity is in a group that is in this community
        var community = Helpers.getCommunityById(activity.communityId, data);
        if (!community) {
          return false;
        }
        var area = Helpers.getAreaById(community.areaId, data);
        if (!area || area.id !== data.status.area) {
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

      var divClass = classNames('text-center activity-item', {
        'selected': data.status.selectedActivityTypes.indexOf(type.id) !== -1
      });
      return (
        <Col xs={4} key={type.id} onClick={this.addType.bind(this, type.id)} className={divClass}>
          <div><IconActivity type={type} area='activities' isOnSolid={true} active='false'/></div>
          {type.name}
        </Col>
      );
    }.bind(this);


    return (
        <div className="container typeselector infobox top-buffer">
          <Row className="box text-center padded">
            <h3>Which activities are interesting to you?</h3>
          </Row>
          <Row>
            {types.map(typeItem)}
          </Row>
        </div>
    );
  }
});
