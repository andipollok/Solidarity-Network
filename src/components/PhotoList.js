import React from 'react';
import classNames from 'classnames';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Icon from './Icon';

export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data')],

  componentDidMount() {
    DataActions.forceTrigger();
  },

  render() {

    var divClass = classNames( 'col-md-4', 'box', 'white', 'linked', 'padded', 'text-center', 'photos',
      {
        'selected': false
      }
    ); // selected may be needed later

    if (this.state.data && this.state.data.loaded.groups) {
      // load group name of this activity
      var groupName = this.state.data.groups[this.props.data.group].name;
      // load owner name of this group
      var ownerId = this.state.data.groups[this.props.data.group].owner;
      if (this.state.data.loaded.people) {
        var ownerName = this.state.data.people[ownerId].name;
      }
    }

    // load photos of this activity
    var photoList = [];
    if (this.state.data && this.state.data.loaded.photos && this.props.data.photos.length > 0) {
      this.props.data.photos.map(function(photoId) {
        var photos = this.state.data.photos[photoId];
        // each photo contains an image array, as there can also be more than one attachment in Airtable.
        photos.image.map(function(image) {
          photoList = photoList.concat({
            description: photos.description, // store the description for each photo
            owner: photos.owner, // store the owner for each photo
            url: image.url,
            id: image.id
          });

        }.bind(this))
      }.bind(this));
    }

    return (

        <div className={divClass} onClick={this.props.onClickHandler.bind(null, this.props.data.id)}>

          <Icon type={this.props.data.type} area='photos' shape='hexagon'/>

          <h2>{this.props.data.name}</h2>

          <p><FormattedMessage id="on" defaultMessage=" "/>
              &nbsp;<FormattedDate
                    value={this.props.data.date}
                    weekday="long"
                    day="numeric"
                    month="long"
                    year="numeric" /> 
              &nbsp;<span className="grey">(<FormattedRelative value={this.props.data.date} />)</span>
          </p>

          <p><FormattedMessage id="at" defaultMessage=" "/>
              &nbsp;<FormattedTime
                    value={this.props.data.date}
                    minute="2-digit"
                    hour="numeric" /></p>

          <p><FormattedMessage id="group" defaultMessage="Group"/> {groupName} by {ownerName}</p>

          <p><FormattedMessage id="numberofphotos" values={{numPhotos: photoList.length}}/></p>
          
        </div>

    );
  }
});
