import React from 'react';
import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import Helpers from '../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Icon from './Icon';

export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data') ],

  componentDidMount() {
    DataActions.forceTrigger();
  },

  render() {

    var divClass = classNames( 'col-md-4', 'box', 'white', 'linked', 'padded', 'text-center', 'photos',
      {
        'selected': false
      }
    ); // selected may be needed later

    var group = Helpers.getGroupById(this.props.data.groupId, this);
    var owner = Helpers.getPersonById(group.ownerId, this);

    // load photos of this activity
    var photoList = [];
    if (this.state.data && this.state.data.loaded.photos && this.props.data.photos.length > 0) {
      this.props.data.photos.map(function(photoId) {
        var photo = Helpers.getPhotoById(photoId, this);
        // each photo contains an image array, as there can also be more than one attachment in Airtable.
        photo.image.map(function(image) {
          photoList.push({
            description: photo.description, // store the description for each photo
            ownerId: photo.owner, // store the owner for each photo
            url: image.url,
            id: image.id
          });
        }.bind(this))
      }.bind(this));
    }

    return (

      <Col md={4} className="bottom-buffer" onClick={this.props.onClickHandler.bind(null, this.props.data.id)}>

        <div className="box white linked text-center photos">
      
          <Icon type={'activity-' + this.props.data.type} area='photos' shape='hexagon'/>

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

          <p><FormattedMessage id="group" defaultMessage="Group"/> {group.name} by {owner.name}</p>

          <p><FormattedMessage id="numberofphotos" values={{numPhotos: photoList.length}}/></p>
          
        </div>

      </Col>

    );
  }
});
