import React from 'react';
import {Link}  from 'react-router';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import Helpers from '../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Icon from './Icon';

export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(DataStore, 'data'), Reflux.connect(StatusStore, 'status') ],

  componentDidMount() {
    LanguageStore.forceTrigger();
    DataActions.forceTrigger();
    StatusActions.forceTrigger();
    StatusActions.setCurrentPage('photos');
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || !this.props.params.id || !this.state.data || !this.state.data.loaded.activities || !this.state.data.loaded.photos) {
      return <div></div>;
    }

    var community = Helpers.getCommunityFromStatus(this);
    var activity = Helpers.getActivityById(this.props.params.id, this);
    var group = Helpers.getGroupById(activity.groupId, this);
    var owner = Helpers.getPersonById(group.ownerId, this);

    // load photos
    activity.photoList = [];
    activity.photos.map(function(photoId) {
      var photo = Helpers.getPhotoById(photoId, this);
      // each photo contains an image array, as there can also be more than one attachment in Airtable.
      photo.image.map(function(image) {
        activity.photoList.push({
          description: photo.description, // store the description for each photo
          owner: photo.ownerId, // store the owner for each photo
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
        <div key={photo.id}>
          <Link to={ '/photo/' + photo.id }>
            <img src={photo.thumbnail} className="photoThumb"/>
          </Link>
          {photo.description}
        </div>
        );
    }.bind(this);

    return (
      <div className="container">

        <Col md={12}>
          <div className="box text-center">

            <Icon type={'activity-' + activity.type} area='photos' shape='hexagon'/>

            <h1><FormattedMessage id='photos_from' values={{activityName: activity.name}}/></h1>

            <h3><FormattedMessage id="on" defaultMessage=" "/>
                &nbsp;<FormattedDate
                      value={activity.date}
                      weekday="long"
                      day="numeric"
                      month="long"
                      year="numeric" /> 
                &nbsp;<span className="grey">(<FormattedRelative value={activity.date} />)</span>
            </h3>

            <h3><FormattedMessage id="startedat" defaultMessage=" "/>
                &nbsp;<FormattedTime
                      value={activity.date}
                      minute="2-digit"
                      hour="numeric" /></h3>

            <p><FormattedMessage id="group" defaultMessage="Group"/> {group.name}
               &nbsp;<FormattedMessage id="by" defaultMessage="by"/> {owner.name}</p>

            <p><FormattedMessage id="numberofphotos" values={{numPhotos: activity.photoList.length}} /></p>

            {activity.photoList.map(photoItem,this)}

          </div>
        </Col>
        <Col sm={4}>
          <div className="box linked white text-center">
            <p><Button bsStyle="primary" bsSize="large">Contact {owner.name}</Button></p>
            <p>{owner.name} was hosting this event. You can write him an email or call him on his mobile or landline.</p>
          </div>
        </Col>

        <Col sm={4}>
          <div className="box linked white text-center">
            <p><Button bsStyle="primary" bsSize="large">Keep me posted!</Button></p>
            <p>This remembers this type of activity in your favourites. You won't have to give your name or email at this point.</p>
          </div>
        </Col>

        <Col sm={4}>
          <div className="box linked white text-center">
            <p><Button bsStyle="primary" bsSize="large">Send all photos</Button></p>
            <p>Send all these pictures to a friend! Also you can select single photos to send or create an album.</p>
          </div>
        </Col>

      </div>
    );
  }
});
