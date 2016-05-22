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

import Item from './LatestItem';
import TypeSelectorButton from '../General/TypeSelectorButton';

import ViewSelectorButtons from './ViewSelectorButtons';

export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('stories');
    StatusActions.showBackButton(false);
    StatusActions.setTitle(<FormattedMessage id='nav_stories' defaultMessage='Stories'/>);
    StatusActions.setSecondaryNav(<ViewSelectorButtons data={this.props.data} view='latest'/>);
    StatusActions.forceTrigger();
  },

  onClickStory(id) {
    window.location.assign("#/story/" + id);
  },

  render() {

    var data = this.props.data;

    var stories = [];
    var area = Helpers.getAreaById(data.status.area, data);

    stories = data.stories.filter(
      function(activity) {

        // check if this activity is in a community that is in this area
/*        var community = Helpers.getCommunityById(activity.communityId, data);
        if (!community) {
          return false;
        }
        var area = Helpers.getAreaById(community.areaId, data);
        if (!area || area.id !== data.status.area) {
          return false;
        }*/

        // check if activity is of selected type(s)
        // if (data.status.selectedActivityTypes.length > 0 && data.status.selectedActivityTypes.indexOf(activity.typeId) === -1) {
        //   return false;
        // }

        return true;
      }.bind(this)
    );


    var storyItem = function(story) {
      return ( <Item key={story.id}
                story={story}
                data={data}
                showDate={true}
                onClickHandler={this.onClickStory} /> );
    }.bind(this);
  
    if (stories.length === 0) {
      // no events found
      var NotFound = <Col className="container text-center box white half"><h2><FormattedMessage id='nostories' values={{areaName: area.name}}/></h2></Col>;
    }

    return (

      <div className="container activities top-buffer">

        {stories.map(storyItem, this)}

        {NotFound}

      </div>

    );
  }
});
