import React from 'react';
import {Link}  from 'react-router';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import IconActivity from '../General/IconActivity';
import Avatar from '../General/Avatar';

export default React.createClass({

  componentDidMount() {
    StatusActions.setPage('stories');
  },

  onClickBack() {
    window.location.assign("#/stories/");
  },

  render() {

    var data = this.props.data;

    var photoId = this.props.params.id;
    //var photo = Helpers.getPhotoById(photoId, this);
    var photo = {};
    // each entry in allPhotos has an images property with an array of attachments. we need to check if any of these matches the id.
    data.photos.map(function(p) {
      // each photo contains an image array, as there can also be more than one attachment in Airtable.
      p.image.map(function(image) {
        if (image.id === photoId) {
          photo = {
            description: p.description, // store the description for each photo
            ownerId: p.ownerId, // store the owner for each photo
            activityId: p.activityId, // store the activity for each photo
            url: image.url,
            id: image.id,
            type: image.type,
            size: image.size,
            thumbnail: image.thumbnails.large.url,
            thumbnailSmall: image.thumbnails.small.url
          };
        }
      }.bind(this));
    }.bind(this));

    var owner = Helpers.getPersonById(photo.ownerId, data);
    var activity = Helpers.getActivityById(photo.activityId, data);
    var type = Helpers.getActivityTypeById(activity.typeId, data);
    // console.log(this.state.data.activities.map(function(a) { return a.id }))
    // console.log(photo.activityId, activity);
    // xxx todo problem - activity is not found sometimes
    var h2Description = photo.description ? <h2>{photo.description}</h2> : '';

    return (
      <div className="container stories">
        <Row>
          <Col md={12} className="text-center box">
            <ButtonGroup>
              <Button bsSize="large" className="padded" onClick={this.onClickBack}>Back to photowall</Button>  
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3} sm={4}  xs={4} className="text-center">
            <Link to={`/person/${owner.id}`}>
              <div className="box outline rounded bottom-buffer">
                <Avatar imageUrl={owner.pictureUrl}/>
                Photo by {owner.name}
              </div>
            </Link>
            <Link to={`/activity/${activity.id}`}>
              <div className="card solid activities">
                <IconActivity type={type} area='activities' fill='solid' />
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
          <Col md={9} sm={8} xs={8}>
            {h2Description}
            <Link to={`/photo/${photo.id}/zoom`}>
              <div className="photo full">
                <img className="photo zoom" src={photo.url} title={photo.description}/>          
              </div>
            </Link>
            </Col>
        </Row>
      </div>
    );
  }
});
