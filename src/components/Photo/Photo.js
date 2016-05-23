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

  componentWillMount() {
    StatusActions.setPage('stories');
    StatusActions.showBackButton(true);
    StatusActions.setTitle(<FormattedMessage id='nav_photo' defaultMessage='Photo'/>);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  render() {

    var data = this.props.data;

    var photoId = this.props.params.id;

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

    if (photo.description) {
      StatusActions.setTitle(photo.description);
      StatusActions.forceTrigger();
    }

    var owner = <Link to={`/person/${owner.id}`}>
              <div className="box outline rounded bottom-buffer">
                <Avatar imageUrl={owner.pictureUrl}/>
                Photo by {owner.name}
              </div>
            </Link>

    return (
      <div className="container stories">

        <Row>

          <Col xs={12} className="top-buffer">
            
            <Link to={`/photo/${photo.id}/zoom`}>
              <div className="photo full">
                <img className="photo zoom" src={photo.url} title={photo.description}/>          
              </div>
            </Link>
            </Col>
        </Row>
        <Row>
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
      </div>
    );
  }
});
