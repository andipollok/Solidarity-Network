import React from 'react';
import {Link}  from 'react-router';
import classNames from 'classnames';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import DataActions from '../../stores/DataActions';
import DataStore from '../../stores/DataStore';
import Helpers from '../../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Icon from '../General/Icon';
import IconActivity from '../General/IconActivity';
import Avatar from '../General/Avatar';

var fieldsInOrder = [
  { name: "activity_title", type: "text", required: true },
  { name: "activity_date", type: "date", required: true },
  { name: "activity_start_time", type: "time", required: true }, // TODO default day after tomorrow
  { name: "activity_end_time", type: "time", required: true }, // TODO test date picker in device
  { name: "activity_street", type: "text", required: true },
  { name: "activity_description", type: "text", required: true }, // TODO make it a textarea
];

export default React.createClass({

  getInitialState() {
    let tmpState = {
      step: 0
    };
    fieldsInOrder.forEach(function(fieldItem) {
      tmpState[fieldItem.name] = '';
    });
    return tmpState;
  },

  componentWillMount() {
    StatusActions.setPage('activities-new');
    StatusActions.showBackButton(true);
    StatusActions.setTitle(<FormattedMessage id='activity-new' />); // TODO
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  onChangeVar( event ) {
    console.log(this.state);
    this.setState( { [event.target.name]: event.target.value } );
  },

  // onDateChange( event ) {
  //   this.setState( { date: event.target.value } );
  // },

  // onAddressChange( event ) {
  //   this.setState( { address: event.target.value } );
  // },

  onClickSubmit( event ) {
    // DataActions.createActivity(
    //   this.state
    // );
  },
  
  onClickNext( event ) {
    this.setState( { step: this.state.step + 1 } );
  },
  
  renderStep( number ) {

    let field = fieldsInOrder[ number ];

    let last = ( number === fieldsInOrder.length - 1 );

    // let field = (
    //   <input
    //     type={field.type}
    //     name={field.name}
    //     value={this.state[field.name]}
    //     onChange={this.onChangeVar}
    //   />
    // );

    if (last) {
      return(
        <form role="form">
          <FormattedMessage id={[field.name + '_label']} />
          <input
            type={field.type}
            name={field.name}
            value={this.state[field.name]}
            onChange={this.onChangeVar}
          />
            <button type="button" onClick={this.onClickSubmit}>Create</button>
        </form>
      );
    } else {
      return(
        <form role="form">
          <FormattedMessage id={[field.name + '_label']} />
          <input
            type={field.type}
            name={field.name}
            value={this.state[field.name]}
            onChange={this.onChangeVar}
          />
            <button type="button" onClick={this.onClickNext}>Next</button>
        </form>
      );
    }

  },

  render() {

    return this.renderStep( this.state.step );

    // switch (this.sate.step) {
    // case 0:
    //   renderStep_0();
    // case 1:
    //   renderStep_1();
    //   break;
    // }
    
  }

  /*
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
        <Row key={photo.id} className="bottom-buffer">
          <div className="photo fullsize-photo">
            <img src={photo.url} title={photo.description} onClick={this.onClickSelectPhoto.bind(this, photo.id)}/>
            <br />
            {photo.description}
          </div>
        </Row>
      );
    }.bind(this);

    // show photos if available
    // <p><FormattedMessage id="numberofphotos" values={{num: activity.photoList.length}} /></p>
    if (activity.photoList.length > 0) {
      var componentPhoto = <span>
            <Col xs={12} className="top-buffer">
              {activity.photoList.map(photoItem,this)}
            </Col>
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
            <Col xs={12} className="text-center buffer">

              <Button bsSize="large" onClick={function() { window.location.assign(`#/story/${story.id}`); }}>
                <FormattedMessage id='read_story'/>
              </Button>
            
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
  */

});
