import React from 'react';
import {Link}  from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Listitem from './PhotoListitem';
import TypeSelectorButton from '../General/TypeSelectorButton';
import ViewSelectorButtons from './ViewSelectorButtons';

export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('stories');
    StatusActions.showBackButton(false);
    StatusActions.setTitle(<FormattedMessage id='nav_stories' defaultMessage='Stories'/>);
    StatusActions.setSecondaryNav(<ViewSelectorButtons data={this.props.data} view='wall'/>);
    StatusActions.forceTrigger();
  },

  getInitialState: function() {
    return {
      area: 'wall'
    };
  },

  onClickSelectActivity(id) {
    window.location.assign("#/activity/" + id);
  },

  onClickSelectPhoto(id) {
    window.location.assign("#/photo/" + id);
  },

  render() {

    var data = this.props.data;
    var area = Helpers.getAreaById(data.status.area, data);

    var photoItem = function(photo) {
      return ( <Listitem key={photo.id} data={photo} onClickHandler={this.onClickSelectPhoto}></Listitem> );
    }.bind(this);

    var myPhotos = [],
        myPhotoList = [],
        foundPhotos = false;

    myPhotos = data.photos.filter(
      function(photo) {
        // find photos in this community
        var activity = Helpers.getActivityById(photo.activityId, data);
        if (!activity) {
          // in some cases if the Airtable is not filled out correctly, it can occur that an activity is not valid
          // (e.g. no date, no name) and thus the DataStore does not provide it
          return false;
        }
        var _community = Helpers.getCommunityById(activity.communityId, data);
        if (!_community) {
          return false;
        }
        var _area = Helpers.getAreaById(_community.areaId, data);
        if (!_area || _area.id !== data.status.area) {
          return false; // filter this photo if it is not in the community
        }
        return true;
      }.bind(this));

    // load photos with url into array myPhotoList
    myPhotos.reverse().map(function(photo) {
      // each photo contains an image array, as there can also be more than one attachment in Airtable.
      photo.image.map(function(image) {
        if (image.id && image.url && image.thumbnails && image.thumbnails.large) {
          myPhotoList.push({
            description: photo.description, // store the description for each photo
            owner: photo.ownerId, // store the owner for each photo
            url: image.url,
            id: image.id,
            type: image.type,
            size: image.size,
            thumbnail: image.thumbnails.large.url,
            thumbnailSmall: image.thumbnails.small.url
          });
        }
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

    if (myPhotoList.length > 0) { foundPhotos = true; }

    var listPhotos = <Row>{myPhotoList.map(photoItem, this)}</Row>;

    if (!foundPhotos) {
      listPhotos =
        <Row>
          <Col md={12} className="text-center box white half">
            <h2><FormattedMessage id='nophotos' values={{areaName: area.name}}/></h2>
          </Col>
        </Row>;
    }

    return (
      <div className="container stories">

        <TypeSelectorButton data={data}/>

        {listPhotos}
      
      </div>
    );
  }
});
