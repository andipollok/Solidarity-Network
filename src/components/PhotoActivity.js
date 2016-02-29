import React from 'react';
import {Link}  from 'react-router';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Icon from './Icon';

export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data'), Reflux.connect(StatusStore, 'status')],

  componentDidMount() {
    DataActions.forceTrigger();
    StatusActions.forceTrigger();
    $('#navbar .photos').addClass('active');
  },

  componentWillUnmount() {
    $('#navbar .photos').removeClass('active');
  },

  render() {
    var communityName = "";

    if (this.state.status && this.state.status.community) {
      if (this.state.data && this.state.data.loaded.communities && this.state.data.communities[this.state.status.community]) {
        communityName = this.state.data.communities[this.state.status.community].name;
      }
    }

    var activity = {};
    var activityComponent;
    if (this.state.data && this.state.data.loaded.activities) {
      activity = this.state.data.activities[this.props.params.id];

      // load group name and owner of the group
      if (this.state.data.loaded.groups) {
        var groupName = this.state.data.groups[activity.group].name;
        var ownerId = this.state.data.groups[activity.group].owner;
        if (this.state.data.loaded.people) {
          var ownerName = this.state.data.people[ownerId].name;
        }
      }

      // load photos
      activity.photoList = [];
      if (this.state.data.loaded.photos && activity.photos.length > 0) {
        activity.photos.map(function(photoId) {
          var photoList = this.state.data.photos[photoId];
          // each photo contains an image array, as there can also be more than one attachment in Airtable.
          photoList.image.map(function(image) {
            activity.photoList = activity.photoList.concat({
              description: photoList.description, // store the description for each photo
              owner: photoList.owner, // store the owner for each photo
              url: image.url,
              id: image.id,
              type: image.type,
              size: image.size,
              thumbnail: image.thumbnails.large.url,
              thumbnailSmall: image.thumbnails.small.url
            });
          }.bind(this))
        }.bind(this));
      }

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

      activityComponent = 
        <div className="box white container text-center">

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

          <h3><FormattedMessage id="startingat" defaultMessage=" "/>
              &nbsp;<FormattedTime
                    value={activity.date}
                    minute="2-digit"
                    hour="numeric" /></h3>

          <p><FormattedMessage id="group" defaultMessage="Group"/> {groupName}
             &nbsp;<FormattedMessage id="by" defaultMessage="by"/> {ownerName}</p>

          <p><FormattedMessage id="numberofphotos" values={{numPhotos: activity.photoList.length}} /></p>

          {activity.photoList.map(photoItem,this)}

        </div>
    }

    return (
      <div>
        {activityComponent}
      </div>
    );
  }
});
