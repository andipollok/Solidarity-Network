import React from 'react';
import {Link}  from 'react-router';
import classNames from 'classnames';

import Reflux from 'reflux';
import LanguageActions from '../../stores/LanguageActions';
import LanguageStore from '../../stores/LanguageStore';
import DataActions from '../../stores/DataActions';
import DataStore from '../../stores/DataStore';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import IconActivity from '../General/IconActivity';
import Avatar from '../General/Avatar';

export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(DataStore, 'data'), Reflux.connect(StatusStore, 'status') ],

  componentWillMount() {
    StatusActions.setArea('agenda');
    StatusActions.historyAdd({
      title: 'Agenda',
      url: '',
      pathname: '/agenda'
    });
  },

  componentDidMount() {
    LanguageStore.forceTrigger();
    DataActions.forceTrigger();
    StatusActions.forceTrigger();    
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || !this.props.params.id || !this.state.data || !this.state.data.loaded.all) {
      return <div></div>;
    }

    var community = Helpers.getCommunityFromStatus(this);
    var activity = Helpers.getActivityById(this.props.params.id, this);
    var type = Helpers.getActivityTypeById(activity.typeId, this);
    var group = Helpers.getGroupById(activity.groupId, this);
    var owner = group.ownerId ? Helpers.getPersonById(group.ownerId, this) : undefined;

    // load photos
    activity.photoList = [];
    activity.photos.map(function(photoId) {
      var photo = Helpers.getPhotoById(photoId, this);
      if (!photo) {
        // this can happen if the photo exists but is not served by dataStore (e.g. if the field name was not filled out, dataStore ignores it)
        return false;        
      }
      // each photo contains an image array, as there can also be more than one attachment in Airtable.
      photo.image.map(function(image) {
        activity.photoList.push({
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
        <div key={photo.id}>
          <Link to={ '/photo/' + photo.id }>
            <img src={photo.thumbnail} className="photoThumb" title={photo.description}/>
          </Link>
          
        </div>
        );
    }.bind(this);

    // check if activity is in the past          
    var isInPast = new Date(activity.date) < new Date();
    
    var startingAt, registerToAttend;

    if (isInPast === false) {
      // event is in the future
      startingAt = <FormattedMessage id="startingat" defaultMessage=" "/>
      registerToAttend = <span>
          <h3>Do you want attend?</h3>
          <p>Register your interest in this activity.</p>
          <p><Button bsStyle="primary" bsSize="large">Register to attend</Button></p>
          </span>
    } 
    else {
      // event is in the past
      startingAt = <FormattedMessage id="startedat" defaultMessage=" "/>
      registerToAttend = <span>
          <h3>Did you attend?</h3>
          <p>And did you like it?</p>
          <p><Button bsStyle="primary" bsSize="large">Find similar activities</Button></p>
          </span>
    }
    if (activity.photoList.length > 0) {
      var componentPhoto = <span>
            {activity.photoList.map(photoItem,this)}
            <p><FormattedMessage id="numberofphotos" values={{numPhotos: activity.photoList.length}} /></p>
            <div className="box white outline text-center bottom-buffer rounded">
              <p><Button bsStyle="primary" bsSize="large">Send all photos</Button></p>
              <p>Send all these pictures to a friend! Also you can select single photos to send or create an album.</p>
            </div>
          </span>
    }


    if (owner) {
      var componentOwner = <span>
        <Link to={`/person/${owner.id}`}>
          <div className="box text-center">
            <p><Avatar imageUrl={owner.pictureUrl}/></p>
            <p>Hosted <FormattedMessage id="by" defaultMessage="by"/> {owner.name}</p>
          </div>
          </Link>
          <div className="box white outline text-center bottom-buffer rounded">
            <h3>Do you want to talk to {owner.name}?</h3>
            
            <p>{owner.name} is hosting this event. You can write him an email or call him on his mobile or landline.</p>
            <p><Button bsStyle="primary" bsSize="large">Contact {owner.name}</Button></p>
          </div>
        </span>
    }

    var componentTime = <h3>
                  {startingAt}&nbsp;<FormattedTime
                        value={activity.date}
                        minute="2-digit"
                        hour="numeric" />
                        </h3>

    if (activity.dateEnd) {
      componentTime = <h3>
                      From&nbsp;<FormattedTime
                        value={activity.date}
                        minute="2-digit"
                        hour="numeric" />
                        &nbsp;to&nbsp;<FormattedTime
                        value={activity.dateEnd}
                        minute="2-digit"
                        hour="numeric" />
                        </h3>
    }

    return (
      <div className="container agenda">

        <Row>
          <Col sm={12} className="top-buffer">

            <div className="card solid text-center">

              <IconActivity type={type} area='agenda' fill='solid'/>

              <h1>{activity.name}</h1>

              <h3><FormattedMessage id="on" defaultMessage=" "/>
                  &nbsp;<FormattedDate
                        value={activity.date}
                        weekday="long"
                        day="numeric"
                        month="long"
                        year="numeric" /> 
                  &nbsp;<span className="grey">(<FormattedRelative value={activity.date} />)</span>
              </h3>

              {componentTime}

            </div>
          </Col>
        </Row>

        <Row>
          <Col sm={4}>
            {componentOwner}
          </Col>

          <Col sm={4}>
            <Link to={`/group/${group.id}`}>
              <div className="box text-center">
                <p><Avatar /></p>
                <p><FormattedMessage id="group" defaultMessage="Group"/> {group.name}</p>
              </div>
            </Link>
            <div className="box white outline text-center bottom-buffer rounded">
              {registerToAttend}
            </div>
          </Col>


          <Col sm={4}>

            {componentPhoto}

          </Col>

        </Row>

      </div>
    );
  }
});
