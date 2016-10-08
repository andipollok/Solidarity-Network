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

    var session = this.props.session;
    
    var data = this.props.data;

    var stories = [];
    var area = Helpers.getAreaById(data.status.area, data);

    stories = data.stories.filter(
      function(activity) {

        return true;
      }.bind(this)
    );


    var storyItem = function(story) {
      return ( <Item key={story.id}
                story={story}
                data={data}
                layout={session.preferredLayout}
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
