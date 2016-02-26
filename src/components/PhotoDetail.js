import React from 'react';
import {Link}  from 'react-router';

import { FormattedMessage } from 'react-intl';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';


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
    var myPhotoId = this.props.params.id;
    var photo = {};
    if (this.state.data && this.state.data.loaded.photos) {
      var allPhotos = this.state.data.photos;
      // each entry in allPhotos has an images property with an array of attachments. we need to check if any of these matches the id.
      Object.keys(allPhotos).map(function(photoListId) {
        allPhotos[photoListId].image.filter(function(p) {
          if (p.id === myPhotoId) {
            photo = p;
            return true;
          }
        });
      });
      var photoComponent = 
        <div>
          <img className="photo" src={photo.url} />
          {photo.description}
        </div>
    }
    return (
      <div className="container">
        {photoComponent}
      </div>
    );
  }
});
