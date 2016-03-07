import React from 'react';
import {Link}  from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import Helpers from '../stores/Helpers.js';

import Listitem from './PhotoListitem';


export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status') ],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
    StatusActions.setCurrentPage('photos');
  },

  getInitialState: function() {
    return {
      area: 'overview'
    };
  },

  onClickSelectActivity(id) {
    window.location.assign("#/photos/" + id);
  },

  setArea(_area) {
    this.setState({ area: _area });
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || (this.state.data && !this.state.data.loaded) || (this.state.status && !this.state.status.community)) {
      return <div></div>;
    }

    var community = Helpers.getCommunityFromStatus(this);

    var activityItem = function(activity) {
      return ( <Listitem key={activity.id} data={activity} onClickHandler={this.onClickSelectActivity}></Listitem> );
    }.bind(this);

    var myActivities = [],
        myPhotos = [],
        myPhotoList = [],
        foundPhotos = false;

    myPhotos = this.state.data.photos.filter(
      function(photo) {
        // find photos in this community
        return true;
      }.bind(this));

    // load photos
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
        <Col xs={6} sm={3} md={3} lg={2} key={photo.id} className="box-photo">
   
            <img src={photo.url} title={photo.description} />         
         
        </Col>
      );
    }.bind(this);

    if (myPhotos.length > 0) { foundPhotos = true; }

    myActivities.reverse();

    var listPhotos = <Row>{myPhotoList.map(photoItem, this)}</Row>;

    if (!foundPhotos) {
      listPhotos =
        <Col className="text-center box white half">
          <h2><FormattedMessage id='nophotos' values={{communityName: community.name}}/></h2>
        </Col>;
    }

    return (
      <div className="container">
        <Col md={12} className="text-center box">
          <ButtonGroup>
            <Button bsSize="large" className="padded" active={ this.state.area === 'overview' } onClick={ this.setArea.bind(this, 'overview') }>Stream</Button>  
            <Button bsSize="large" className="padded" active={ this.state.area === 'byactivity' } onClick={ this.setArea.bind(this, 'byactivity') }>By activity</Button>  
          </ButtonGroup>
        </Col>
        {listPhotos}
      </div>
    );
  }
});
