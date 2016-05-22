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
    StatusActions.showBackButton(true);
    StatusActions.setTitle(<FormattedMessage id='nav_photo' defaultMessage='Photo'/>);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  makeZoomable() {
    $('.zoom').panzoom({
      minScale: 0.6,
      maxScale: 4,
    });
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

    StatusActions.setTitle(photo.description);
    StatusActions.forceTrigger();

    this.makeZoomable();

    return (
      <div className="container-fluid stories">
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
