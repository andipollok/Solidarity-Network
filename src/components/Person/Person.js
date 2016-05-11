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
import Avatar from '../General/Avatar';

export default React.createClass({

  componentDidMount() {
    StatusActions.setPage('person');
  },

  render() {

    var data = this.props.data;

    var personId = this.props.params.id;

    var person = Helpers.getPersonById(personId, data);

    var groups = data.groups.filter(function(group) {
      if (group.ownerId === this.props.params.id) {
        return true;
      }
    }.bind(this));

    var activities = data.activities.filter(function(activity) {
      // here we have to check if the activity is in any of this person's groups
      var found = false;
      groups.map(function(group) {
        if (activity.groupId === group.id) {
          found = true;
        }
      });
      return found;
    }.bind(this));


    var photos = [];

    data.photos.map(function(photo) {
      if (photo.ownerId !== personId) {
        return false;
      }
      // each photo contains an image array, as there can also be more than one attachment in Airtable.
      photo.image.map(function(image) {
        photos.push({
          description: photo.description, // store the description for each photo
          ownerId: photo.ownerId, // store the owner for each photo
          url: image.url,
          id: image.id,
          type: image.type,
          size: image.size,
          thumbnail: image.thumbnails.large.url,
          thumbnailSmall: image.thumbnails.small.url
        });
      }.bind(this));
    }.bind(this));

    var activityItem = function(activity) {
      var type = Helpers.getActivityTypeById(activity.typeId, this);
      return ( 
        <Col sm={4} key={activity.id}>
        <Link to={`/activity/${activity.id}`}>
          <div className="card solid agenda bottom-buffer">
            <Icon type={'activity-' + type.name} area='agenda' fill='solid' shape='hexagon'/>
            <h4>{activity.name}</h4>
            <p><FormattedDate
                  value={activity.date}
                  weekday="long"
                  day="numeric"
                  month="long"
                  year="numeric" />
            </p>
          </div>
        </Link>
        </Col>);
    }.bind(this);

    var groupItem = function(group) {
      return ( 
        <div key={group.id}>
          <Link to={`/group/${group.id}`}>
            <h4>{group.name}</h4>
          </Link>
        </div>
        );
    }.bind(this);

    var photoItem = function(photo) {
      return ( 
        <div key={photo.id}>
          <Link to={ '/photo/' + photo.id }>
            <img src={photo.thumbnail} className="photoThumb" title={photo.description}/>
          </Link>
        </div>
        );
    }.bind(this);

    return (
      <div className="container">

        <Row>
          <Col sm={12}>
            <div className="box text-center top-buffer bottom-buffer">
              <p><Avatar imageUrl={person.pictureUrl}/></p>
              <h1>{person.name}</h1>
            </div>
            </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <div className="box white outline text-center bottom-buffer rounded">

              <h3>Do you want to talk to {person.name}?</h3>
              
              <p>You can write {person.name} an email or call him on his mobile or landline.</p>
              <p><Button bsStyle="primary" bsSize="large">Contact {person.name}</Button></p>
            </div>
          </Col>
          <Col sm={4}>
            <div className="box white outline text-center bottom-buffer rounded">

              <h3>His groups</h3>
              
              <p>{person.name} is member of these groups</p>

              {groups.map(groupItem,this)}

            </div>
          </Col>
          <Col sm={4}>
            <div className="box white outline text-center bottom-buffer rounded">

              <h3>His photos</h3>
              
              <p>Peter took these photos</p>

              {photos.map(photoItem,this)}

            </div>
          </Col>

        </Row>

        <Row>

          <Col sm={12}>
            <div className="box white outline text-center bottom-buffer rounded">

              <h3>His activities</h3>
              
              <p>{person.name} organised these activites</p>

              {activities.map(activityItem,this)}

            </div>
          </Col>
        </Row>

      </div>
    );
  }
});
