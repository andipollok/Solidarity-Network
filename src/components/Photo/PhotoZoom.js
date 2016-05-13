import React from 'react';
import {Link}  from 'react-router';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';

import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Icon from '../General/Icon';
import Avatar from '../General/Avatar';

export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('stories');
    StatusActions.showBackButton(false);
    StatusActions.setTitle(null);
    StatusActions.setSecondaryNav(null);
  },

  makeZoomable() {
    $('.zoom').panzoom({
      minScale: 0.6,
      maxScale: 4,
    });
  },

  onClickBack(_id) {
    window.location.assign(`#/photo/${_id}`);
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

    this.makeZoomable();

    return (
      <div className="container-fluid stories">
        <Row>
          <Col md={12} className="text-center box">
            <ButtonGroup>
              <Button bsSize="large" className="padded" onClick={this.onClickBack.bind(this, photo.id)}>Back</Button>  
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="photo full">
              <img className="photo zoom" src={photo.url} title={photo.description}/>          
            </div>
            </Col>
        </Row>
      </div>
    );
  }
});
