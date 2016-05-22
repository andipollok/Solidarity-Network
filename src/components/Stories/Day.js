import React from 'react';
import classNames from 'classnames';
import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import moment from 'moment';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Listitem from './DayItem';
import TypeSelectorButton from '../General/TypeSelectorButton';


export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('stories');
    StatusActions.showBackButton(true);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  getInitialState: function() {
    return {
      activities: [],
      activitiesFuture: [],
      foundActivities: false,
      foundActivitiesFuture: false
    };
  },

  onClickStory(id) {
    window.location.assign("#/story/" + id);
  },

  render() {

    var data = this.props.data;

    var myDate = moment({
      year: this.props.params.year,
      month: this.props.params.month - 1,
      day: this.props.params.day
      }
    );
    if (!myDate.isValid()) {
      return <div>Invalid date</div>;
    }

    StatusActions.setTitle(<span>
      <FormattedMessage id='stories_from' defaultMessage='Stories from'/>
      &nbsp;
      <FormattedDate
                    value={myDate}
                    day="numeric"
                    month="long"
                    year="numeric" />
      </span>);
    StatusActions.forceTrigger();

    var stories = [];
    stories = data.stories.filter(
      function(activity) {

        // check if this story is in a community that is in this area
/*        var community = Helpers.getCommunityById(activity.communityId, data);
        if (!community) {
          return false;
        }
        var area = Helpers.getAreaById(community.areaId, data);
        if (!area || area.id !== data.status.area) {
          return false;
        }*/

        // check if this activity is on the given day
        if (moment(activity.date).isSame(myDate, 'day')) {
          return true;
        }

      }.bind(this));

    // console.log("found stories on the date", myDate.format(), stories.length);    

    var storyItem = function(story) {
      return ( <Listitem key={story.id} story={story} data={data} showDate={false} onClickHandler={this.onClickStory}></Listitem> );
    }.bind(this);
  
    var Component = {};
    
    if (stories.length === 0) {
      // no events found
      Component = <Col className="container text-center box white half"><h2><FormattedMessage id='noactivities' values={{areaName: data.area.name}}/></h2></Col>;
    }
    else {
      Component = <Row>{stories.map(storyItem, this)}</Row>;
    }

    return (
      <div className="container stories">

        {Component}

        <Row>
          <Col md={12} className="top-buffer">

           <p>Published on <FormattedDate
            value={myDate}
            weekday="long"
            day="numeric"
            month="long"
            year="numeric" /> </p>

          </Col>
        </Row>

      </div>
    );
  }
});
