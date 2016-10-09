import React from 'react';
import moment from 'moment';
import {Link}  from 'react-router';
import classNames from 'classnames';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import DataStore from '../../stores/DataStore';

import { formatMessage, FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Icon from '../General/Icon';
import IconButton from '../General/IconButton';
import IconActivity from '../General/IconActivity';
import Avatar from '../General/Avatar';

import StepBullets from '../General/StepBullets';

export default React.createClass({

  contextTypes: {
    intl: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      relatedActivities: []
    };
  },

  onClickRelatedActivity(id) {
    window.location.assign("#/activity/" + id);
  },

  componentWillMount() {

    // retrieving the related activities
    var data = this.props.data;
    var activity = Helpers.getActivityById(this.props.params.id, data);
    DataStore.getRelatedActivities( activity, this.onReceivedRelatedActivitiesResults );

    StatusActions.setPage('activity');
    StatusActions.showBackButton(true);
    StatusActions.setTitle(<FormattedMessage id='activity' />);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  onReceivedRelatedActivitiesResults( results ) {
    // console.log("RELATED");
    // console.log(results);
    this.setState({ relatedActivities: results });
  },

  onClickSelectPhoto(id) {
    window.location.assign(`#/photo/${id}/zoom`);
  },

  // // for related events
  // onClickActivity(id) {
  //   window.location.assign("#/activity/" + id);
  // },

  render() {

    //
    // Currently opened activity
    //

    var data = this.props.data;

    var activity = Helpers.getActivityById(this.props.params.id, data);
    var type = Helpers.getActivityTypeById(activity.typeId, data);
    var community = Helpers.getCommunityById(activity.communityId, data);

    var owner = activity.ownerIds && activity.ownerIds.length > 0 ? Helpers.getPersonById(activity.ownerId[0], data) : undefined;

    //
    // load photos
    //
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

    //
    // show one story if available
    //
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

    //
    // check if activity is in the past
    //
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
    var componentTime = <div className="time">
                          <span className="padded">
                            {startingAt}&nbsp;<FormattedTime
                                value={activity.date}
                                minute="2-digit"
                            hour="numeric" />
                          </span>
                          <Icon type='time' folder='service' size='medium' area='secondaryinfo'/>
                        </div>

    if (activity.dateEnd) {
      componentTime = <div className="time">
                        <span className="padded">
                          <FormattedTime
                            value={activity.date}
                            minute="2-digit"
                            hour="numeric" />
                          &nbsp;-&nbsp;
                          <FormattedTime
                            value={activity.dateEnd}
                            minute="2-digit"
                            hour="numeric" />
                        </span>
                        <Icon type='time' folder='service' size='medium' area='secondaryinfo'/>
                      </div>
    }

    var componentDate = <div className="date">
                          <Icon type='calendar' folder='service' size='medium' area='secondaryinfo'/>
                          <span className="padded">
                            <FormattedDate
                              value={activity.date}
                              day="numeric"
                              month="long"
                              year="numeric" />
                          </span>
                        </div>

    var componentLocation = <div className="location">
                    <Icon type='location' folder='service' size='medium' area='secondaryinfo'/>
                    <span className="padded">{activity.location}</span>
                    </div>



    //
    // "More features" buttons (depend on the activity type and available data)
    //

    var moreFeatureButtonRender = function( feature ) {
      let icon = feature.icon;
      let label = feature.label;
      if (!icon || !label) {
        return;
      }
      let isActive = feature.isActive || false;
      let color = feature.color || 'default';
      let callback = feature.callback || undefined;
      let buttonClasses = classNames( 'divLink', {
        'active': isActive
      });
      let buttonIcon = (
        <IconButton
          type={icon} folder='service'
          color={color}
          size='wide'
          isActive={isActive}
          labelAlignment='center' iconPosition='left'
          label={label} /> );
      return <div className={buttonClasses} key={icon} onClick={callback}>
              {buttonIcon}
            </div>;
    }; // .bind(this);

    // let backButtonLabel = this.context.intl.formatMessage({ id: 'goback' });

    var features = [];

    features.push({
      icon: 'host',
      label: this.context.intl.formatMessage({ id: 'activity_feature_reach_host' }),
      isActive: true,
      // color: 'default',
      // callback: '',
    });

    features.push({
      icon: 'reminder',
      label: this.context.intl.formatMessage({ id: 'activity_feature_set_24h_reminder' }),
      isActive: true,
      // color: 'default',
      // callback: '',
    });

    features.push({
      icon: 'location',
      label: this.context.intl.formatMessage({ id: 'activity_feature_where_do_we_meet' }),
      isActive: true,
      // color: 'default',
      // callback: '',
    });

    features.push({
      icon: 'journal',
      label: this.context.intl.formatMessage({ id: 'activity_feature_view_journal' }),
      isActive: true,
      // color: 'default',
      // callback: '',
    });

    // "activity_feature_reach_host"
    // "activity_feature_view_journal"
    // "activity_feature_set_24h_reminder"
    // "activity_feature_24h_reminder_active"
    // "activity_feature_where_do_we_meet"
    // "activity_feature_view_scheduled_route"
    // "activity_feature_back_to_activity_details"
    // "activity_feature_back_to_location_details"
    // "activity_feature_view_map"

    var moreFeatures = <div className="moreFeatures">
                        {features.map(moreFeatureButtonRender, this)}
                       </div>;


    //
    // Related activities
    //
    
    var relatedActivitiesRendered = "";
    var related = this.state.relatedActivities;

    // NB related events are already sorted by ASC date, thank you Airtable

    if (related && related.length > 0) {

      var renderRelatedEvent = function(isFuture, event) {
        
        // In case you need it to style things differently
        // console.log("is future", isFuture);

        var whenIsDateRelativeToNow = moment(event.date).fromNow();
        
        var date = <FormattedDate
                      value={event.date}
                      day="numeric"
                      month="long"
                      year="numeric" /> 

        var timeInfo = "";
        let endDate = event.dateEnd;
        if (endDate) {
          timeInfo = <span>
                      <FormattedTime
                        value={event.date}
                        minute="2-digit"
                        hour="numeric" />
                      &nbsp;-&nbsp;
                      <FormattedTime
                        value={event.dateEnd}
                        minute="2-digit"
                        hour="numeric" />
                     </span>;
        } else {
          timeInfo = <FormattedTime
                      value={event.date}
                      minute="2-digit"
                      hour="numeric" />;
        }
        return <div key={event.id} id="relatedActivityListItem" onClick={this.onClickRelatedActivity.bind(this, event.id)}>
            <span id="whenIsDate">{whenIsDateRelativeToNow}</span>
            &nbsp;---&nbsp;
            <span id="eventDate">{date}</span>
            &nbsp;---&nbsp;
            <span id="eventTime">{timeInfo}</span>
          </div>;
      }.bind(this);

      var nowDate = new Date();
      var futureEvents = [];
      var pastEvents = [];
      for (var event of related) {
        if (moment(event.date) > moment(nowDate)) { // NB we compare to user's date, not to activity.date
          futureEvents.push( event );
        } else {
          pastEvents.push( event );
        }
      }

          // {futureEvents.map( renderRelatedEvent.bind(true), this )}
      relatedActivitiesRendered = <Row>
                                    <Row>
                                      <div>
                                        <FormattedMessage id="activity_related_next" />
                                      </div>
                                    </Row>
                                    <Row>
                                      {futureEvents.map( renderRelatedEvent.bind(this, true), this )}
                                    </Row>
                                    <Row>
                                      <div>
                                        <FormattedMessage id="activity_related_past" />
                                      </div>
                                    </Row>
                                    <Row>
                                      {pastEvents.map( renderRelatedEvent.bind(this, false), this )}
                                    </Row>
                                  </Row>

      // TODO later: with StepBullets
      /* relatedActivitiesRendered = <Row>
                                    <Row>
                                      <div>FUTURE</div>
                                    </Row>
                                    <Row>
                                      <Col xs={1}>
                                        <StepBullets small={true} amount={futureEvents.length} height={futureEvents.length*10} />;
                                      </Col>
                                      <Col xs={11}>
                                        {futureEvents.map( renderRelatedEvent.bind(this, true), this )}
                                      </Col>
                                    </Row>
                                    <Row>
                                      <div>PAST</div>
                                    </Row>
                                    <Row>
                                      <Col xs={1}>
                                        <StepBullets small={true} amount={pastEvents.length} height={pastEvents.length*10} />;
                                      </Col>
                                      <Col xs={11}>
                                        {pastEvents.map( renderRelatedEvent.bind(this, false), this )}
                                      </Col>
                                    </Row>
                                  </Row>;
      */

    }


    //
    // Rendering of the component
    //

    return (
      <div className="container activities activity">

        <div className="card outline top-buffer">

          {componentDate}

          {componentTime}

          <div className="inside">

          <Row>
            <Col xs={12}>

              <div className="text-center">

                <IconActivity type={type} area='activities' isOnSolid={false}/>

                <h2>{activity.name}</h2>

              </div>

              <p className="content top-buffer">
               {activity.description}
              </p>

              {moreFeatures}

            </Col>
          </Row>

          <Row>
            {componentPhoto}
          </Row>

          </div>

        </div>

        <Row>
          {componentStory}
        </Row>

        {relatedActivitiesRendered}

      </div>
    );
  }
});
