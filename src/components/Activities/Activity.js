import React from 'react';
import {Link}  from 'react-router';
import classNames from 'classnames';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Icon from '../General/Icon';
import IconActivity from '../General/IconActivity';
import Avatar from '../General/Avatar';

export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('activities');
    StatusActions.showBackButton(true);
    StatusActions.setTitle(<FormattedMessage id='activity' />);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },


  onClickSelectPhoto(id) {
    window.location.assign("#/photo/" + id);
  },

  render() {

    var data = this.props.data;

    var activity = Helpers.getActivityById(this.props.params.id, data);
    var type = Helpers.getActivityTypeById(activity.typeId, data);
    var community = Helpers.getCommunityById(activity.communityId, data);

    var owner = activity.ownerIds && activity.ownerIds.length > 0 ? Helpers.getPersonById(activity.ownerId[0], data) : undefined;

    // load photos
    activity.photoList = [];
    activity.photoIds.map(function(photoId) {
      var photo = Helpers.getPhotoById(photoId, data);
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
        <Col xs={6} sm={4} md={3} key={photo.id} className="bottom-buffer">
          <div className="box-photo box linked">
            <img src={photo.url} title={photo.description} onClick={this.onClickSelectPhoto.bind(this, photo.id)}/>
          </div>
        </Col>
      );
    }.bind(this);

    // show photos if available
    if (activity.photoList.length > 0) {
      var componentPhoto = <span>
            <Col xs={12} className="top-buffer">
              <p><FormattedMessage id="numberofphotos" values={{num: activity.photoList.length}} /></p>
            </Col>
            {activity.photoList.map(photoItem,this)}
          </span>
    }

    // show one story if available
    activity.stories = data.stories.filter(function(story) {
      if (story && story.activityId && story.activityId === activity.id) {
        return true;
      }
      return false;
    });

    if (activity.stories.length > 0) {
     
      var story = activity.stories[0]; // only take first story for now

      var componentStory = <Row>
            <Col xs={12} className="text-center top-buffer">

              <Link to={`/story/${story.id}`}>
                <div className="card outline buffer activities">
                  <h4>{story.title}</h4>
                </div>
              </Link>
            </Col>
          </Row>
      }


    // check if activity is in the past          
    var isInPast = new Date(activity.date) < new Date();
    
    var startingAt, registerToAttend;

    if (isInPast === false) {
      // event is in the future
      startingAt = <FormattedMessage id="startingat" defaultMessage=" "/>
    } 
    else {
      // event is in the past
      startingAt = <FormattedMessage id="startedat" defaultMessage=" "/>
    }

    // format start and end time
    var componentTime = <h3>
                  <Icon type='time' folder='service' size='small' area='secondaryinfo'/>
                  {startingAt}&nbsp;<FormattedTime
                        value={activity.date}
                        minute="2-digit"
                        hour="numeric" />
                        </h3>

    if (activity.dateEnd) {
      componentTime = <h3>
                    <Icon type='time' folder='service' size='small' area='secondaryinfo'/>
                    <FormattedMessage id="from" />&nbsp;<FormattedTime
                      value={activity.date}
                      minute="2-digit"
                      hour="numeric" />
                      &nbsp;<FormattedMessage id="to" />&nbsp;<FormattedTime
                      value={activity.dateEnd}
                      minute="2-digit"
                      hour="numeric" />
                      </h3>
    }

    var componentDate = <h3>
                    <Icon type='calendar' folder='service' size='small' area='secondaryinfo'/>
                    <FormattedMessage id="on" defaultMessage=" "/>
                        &nbsp;<FormattedDate
                              value={activity.date}
                              weekday="long"
                              day="numeric"
                              month="long"
                              year="numeric" /> 
                        &nbsp;<span className="grey">(<FormattedRelative value={activity.date} />)</span>
                    </h3>

    var componentLocation = <h3>
                    <Icon type='location' folder='service' size='small' area='secondaryinfo'/>
                    {activity.location}
                    </h3>


    return (
      <div className="container activities activity">

        <div className="card outline top-buffer">
        
          <Row>
            <Col xs={12}>

              <div className="text-center">

                <IconActivity type={type} area='activities' isOnSolid={false}/>

                <h1>{activity.name}</h1>

                {componentDate}

                {componentTime}

                {componentLocation}

              </div>

              <p className="content top-buffer">
               {activity.description}
              </p>

            </Col>
          </Row>

          <Row>
            {componentPhoto}
          </Row>
        </div>

        <Row>
          {componentStory}
        </Row>

      </div>
    );
  }
});
