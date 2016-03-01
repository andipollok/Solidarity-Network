import React from 'react';
import {Link}  from 'react-router';

import { FormattedMessage } from 'react-intl';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import Helpers from '../stores/Helpers.js';

export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status'), Reflux.connect(DataStore, 'data') ],

  componentDidMount() {
    LanguageActions.forceTrigger();
    DataActions.forceTrigger();
    StatusActions.forceTrigger();
    StatusActions.setCurrentPage('photos');
  },

  makeZoomable() {
    $('.zoom').panzoom({
      minScale: 0.6,
      maxScale: 4,
    });
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || !this.props.params.id || !this.state.data || !this.state.data.loaded.all) {

      return <div></div>;
    }
 
    var myPhotoId = this.props.params.id;
    //var photo = Helpers.getPhotoById(myPhotoId, this);
    var myPhoto = {};
    // each entry in allPhotos has an images property with an array of attachments. we need to check if any of these matches the id.
    this.state.data.photos.map(function(photo) {
      // each photo contains an image array, as there can also be more than one attachment in Airtable.
      photo.image.map(function(image) {
        if (image.id === myPhotoId) {
          myPhoto = {
            description: photo.description, // store the description for each photo
            owner: photo.ownerId, // store the owner for each photo
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

    this.makeZoomable();

    return (
      <div class="photo full">
        <img className="photo zoom" src={myPhoto.url} title={myPhoto.description}/>
        {myPhoto.description}
      </div>
    );
  }
});
