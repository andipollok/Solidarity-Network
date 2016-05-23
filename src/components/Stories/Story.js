import React from 'react';
import {Link}  from 'react-router';
import classNames from 'classnames';
import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import moment from 'moment';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import IconActivity from '../General/IconActivity';

export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('stories');
    StatusActions.showBackButton(true);
    StatusActions.setTitle('');
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  onClickSelectPhoto(id) {
    window.location.assign("#/photo/" + id);
  },

  render() {

    var data = this.props.data;

    var story = Helpers.getStoryById(this.props.params.id, data);

    StatusActions.setTitle(story.title);
    StatusActions.forceTrigger();

    // load photos
    story.photoList = [];
    story.photoIds.map(function(photoId) {
      var photo = Helpers.getPhotoById(photoId, data);
      if (!photo) {
        // this can happen if the photo exists but is not served by dataStore (e.g. if the field name was not filled out, dataStore ignores it)
        return false;
      }
      // each photo contains an image array, as there can also be more than one attachment in Airtable.
      photo.image.map(function(image) {
        story.photoList.push({
          description: photo.description, // store the description for each photo
          ownerId: photo.ownerId, // store the owner for each photo
          url: image.url,
          id: image.id,
          type: image.type,
          size: image.size,
          thumbnail: image.thumbnails.large.url,
          thumbnailSmall: image.thumbnails.small.url
        });
      }.bind(this))
    }.bind(this));

    var photoItem = function(photo) {
      return (
        <Col xs={6} sm={4} md={3} key={photo.id} className="bottom-buffer">
          <div className="box-photo box linked">
            <img src={photo.url} title={photo.description} onClick={this.onClickSelectPhoto.bind(this, photo.id)}/>
          </div>
        </Col>
      );
    }.bind(this);

    // show photos if available
    if (story.photoList.length > 0) {
      var componentPhoto = <span>
            <Col xs={12} className="top-buffer">
              <p><FormattedMessage id="numberofphotos" values={{num: story.photoList.length}} /></p>
            </Col>
            {story.photoList.map(photoItem,this)}
          </span>
    }

    // show activity if available
    if (story.activityId) {

      var activity = Helpers.getActivityById(story.activityId, data);
      var type = Helpers.getActivityTypeById(activity.typeId, data);
      
      var componentActivity = <Row>
            <Col xs={12} className="text-center top-buffer">

              <Link to={`/activity/${activity.id}`}>
                <div className="card outline buffer activities">

                  <IconActivity type={type} area='activities' isOnSolid={false} />
                  <h4>{activity.name}</h4>
                  <p><FormattedDate
                            value={activity.date}
                            weekday="long"
                            day="numeric"
                            month="long"
                            year="numeric" />
                  </p>
                </div>
              </Link>
            </Col>
          </Row>
      }


    return (
      <div className="container stories story">

        <div className="card outline top-buffer">

          <Row>
            <Col xs={12}>

              <p className="content">
                {story.content}
              </p>
                
            </Col>
          </Row>
            
          <Row>
            {componentPhoto}
          </Row>

        </div>

        {componentActivity}

      </div>
    );
  }
});
