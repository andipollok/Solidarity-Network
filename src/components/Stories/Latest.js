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

  getInitialState() {
    return {
      layout: "cards"
    };
  },

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

  onToggleLayoutToCards() {
    this.setState({ layout: "cards" });
  },

  onToggleLayoutToList() {
    this.setState({ layout: "list" });
  },

  render() {

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
                layout={this.state.layout}
                showDate={true}
                onClickHandler={this.onClickStory} /> );
    }.bind(this);
  
    if (stories.length === 0) {
      // no events found
      var NotFound = <Col className="container text-center box white half"><h2><FormattedMessage id='nostories' values={{areaName: area.name}}/></h2></Col>;
    }

    var toggleToCardsClasses = classNames( 'toggle', 'toggleToCards', {
      'active': this.state.layout === 'cards'
    });

    var toggleToListClasses = classNames( 'toggle', 'toggleToList', {
      'active': this.state.layout === 'list'
    });

    return (

      <div className="container activities top-buffer">

        <div className="layoutToggle">
          <Button className={toggleToCardsClasses} size="bsLarge" onClick={this.onToggleLayoutToCards}>
            <FormattedMessage id='cards_layout' />
          </Button>
          <Button className={toggleToListClasses} size="bsLarge" onClick={this.onToggleLayoutToList}>
            <FormattedMessage id='list_layout' />
          </Button>
        </div>

        {stories.map(storyItem, this)}

        {NotFound}

      </div>

    );
  }
});
