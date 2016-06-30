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
    StatusActions.forceTrigger();
  },

  addType(id) {
    var data = this.props.data;
    StatusActions.clearActivityTypes();
    if (id !== -1) {
      StatusActions.addActivityType(id);
    }
    StatusActions.forceTrigger();
    setTimeout(function() {
      if (data.status.goto !== null) {
        window.location.assign(data.status.goto);
      } else {
        history.goBack();
      }
    }, 100);
  },

  removeType(id) {
    StatusActions.removeActivityType(id);
    StatusActions.forceTrigger();
    if (data.status.goto !== null) {
      window.location.assign(data.status.goto);
    } else {
      history.goBack();
    }
  },

  render() {

    var data = this.props.data;
    var types = data.activitytypes;

    for (var type of types) {
      type.count = 0;
      data.activities.map(function(activity) {
        // check if has selected type
        if (type.id === activity.typeId) {
          type.count++;
        }
      });
    }

    // remove types that have no activities at all
    types = types.filter(function(n) {
      if (n.count === 0) {
        return false;
      }
      return true;
    })

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
          <div><IconActivity type={type} area='activities' isOnSolid={false} active='false'/></div>
          {type.name}
        </Col>
      );
    }.bind(this);

    return (
        <div className="container typeselector top-buffer">
          <Row className="box text-center padded">
            <p> 
              <FormattedMessage id='typeselector_whichactivities' defaultMessage='Which activities are interesting to you?'/>
            </p>
          </Row>
          <Row>

            <Col xs={4} key="all" onClick={this.addType.bind(this, -1)} className='text-center activity-item'>
              <div><IconActivity type={{ icon: "all" }} area='activities' isOnSolid={false} active='false'/></div>
              <FormattedMessage id='allActivities' />
            </Col>

            {types.map(typeItem)}
          </Row>
        </div>
    );
  }
});
