import React from 'react';
import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import Helpers from '../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Listitem from './AgendaCalendaritem';

export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data') ],

  componentDidMount() {
    DataActions.forceTrigger();
  },

  onClickSelectActivity(id) {
    console.log("activity " + id + " selected");
    // StatusActions.setCommunity(id);
  },

  render() {

    var dayItem = function(day) {
      return ( <Listitem key={day.id} data={day} onClickHandler={this.onClickSelectActivity}></Listitem> );
    }.bind(this);

    var days = [];
    var numWeeks = 5;
    for (var i = 0; i < numWeeks*7; i++) {
      days.push({
        id: i,
        name: "Day " + i,
        activities: []
      });
      // -todo- put activities into that date!

    }
    return (
      <div className="container">
        <div className="calendar">
          <div className="calendar-row">
            { days.map(dayItem, this) }
          </div>
        </div>
      </div>
    );
  }
});
