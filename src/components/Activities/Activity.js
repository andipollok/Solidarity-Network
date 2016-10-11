import React from 'react';
import moment from 'moment';
import {Link}  from 'react-router';
import classNames from 'classnames';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import DataStore from '../../stores/DataStore';

import { formatDate, formatMessage, FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
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
    document.getElementsByClassName('scrollable')[0].scrollTop = 0;
  },

  componentWillMount() {

    this.props.setSessionVar( "subPage", null );

    // retrieving the related activities
    var data = this.props.data;
    var activity = Helpers.getActivityById(this.props.params.id, data);
    DataStore.getRelatedActivities( activity, this.onReceivedRelatedActivitiesResults );

    StatusActions.setPage('activity');
    StatusActions.showBackButton(true);
    StatusActions.setTitle(<FormattedMessage id='upcoming' />);
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

  onClickReachHost() {
    this.props.setSessionVar( "subPage", 'reachHost' );
  },

  onClickBackToActivityDetails() {
    this.props.setSessionVar( "subPage", null );
  },

  // // for related events
  // onClickActivity(id) {
  //   window.location.assign("#/activity/" + id);
  // },

  // function to concatenate names like "a, b, c and d" or "a, b, c or d"
  readableList(array, stringBetweenLastPair) {
    var stringTranslated = this.context.intl.formatMessage({ id: 'and' });
    if (stringBetweenLastPair === 'or') {
      stringTranslated = this.context.intl.formatMessage({ id: 'or' });
    }
    var stringFormatted = array.length > 1 ? array.slice(0,-1).join(', ') + ` ${stringTranslated} ` + array[array.length -1] : array[0];
    return stringFormatted;
  },

  render() {

    //
    // Currently opened activity
    //

    var data = this.props.data;

    var session = this.props.session;

    var activity = Helpers.getActivityById(this.props.params.id, data);

    var community = Helpers.getCommunityById(activity.communityId, data);

    var owner = activity.ownersId && activity.ownersId.length > 0 ? Helpers.getPersonById(activity.ownersId[0], data) : undefined;

    // 
    // main icon
    //
    var iconType = '';
    var mainIcon = <div />;

    if (session.subPage === null) {
      iconType = Helpers.getActivityTypeById(activity.typeId, data);
      mainIcon = <IconActivity type={iconType} area='activities'/>
    }
    else {
      switch (session.subPage) {

        case 'reachHost':
        mainIcon = <Icon size='large' type='host' folder='service' color='filled' isActive={false}/>
        break;

      }

    }

    //
    // load photos
    //

    if (session.subPage === null) {

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

    }

    //
    // show one story if available
    //

    if (session.subPage === null) {

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

    var smallIconsColor = 'default';
    if (session.subPage !== null) {
      smallIconsColor = 'filled';
    }

    // format start and end time
    var componentTime = <div className="time">
                          <span className="padded">
                            {startingAt}&nbsp;<FormattedTime
                                value={activity.date}
                                minute="2-digit"
                            hour="numeric" />
                          </span>
                          <Icon type='time' folder='service' size='medium' color={smallIconsColor}/>
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
                        <Icon type='time' folder='service' size='medium' color={smallIconsColor}/>
                      </div>
    }

    var componentDate = <div className="date">
                          <Icon type='calendar' folder='service' size='medium' color={smallIconsColor}/>
                          <span className="padded">
                            <FormattedDate
                              value={activity.date}
                              day="numeric"
                              month="long"
                              year="numeric" />
                          </span>
                        </div>

    var componentLocation = <div className="location">
                    <Icon type='location' folder='service' size='medium' color={smallIconsColor}/>
                    <span className="padded">{activity.location}</span>
                    </div>



    //
    // Content
    //

    // default content
    var content = <p className="content top-buffer">
                   {activity.description}
                  </p>;

    // alternative content
    if (session.subPage !== null) {

      switch (session.subPage) {

        case 'reachHost':

          // let ownersName = activity.ownersName;
          // let ownersContact = '';
          // ownersContact += activity.ownersPhone ? activity.ownersPhone : '';
          // ownersContact += ( activity.ownersPhone && activity.ownersEmail ) ? '\n' : '';
          // ownersContact += activity.ownersEmail ? activity.ownersEmail : '';
          let contactInfo = '';
          if (activity.ownersEmail) {
            if (activity.ownersPhone) {
              // mail, phone
              var ownersPhone = this.readableList(activity.ownersPhone, 'or');
              var ownersEmail = this.readableList(activity.ownersEmail);
              contactInfo = <p>
                              <FormattedMessage id="activity_subpage_reachhost_content_phone" values={{ownersPhone: ownersPhone}}/>
                              <br/>
                              <FormattedMessage id="activity_subpage_reachhost_content_email" values={{ownersEmail: ownersEmail}}/>
                            </p>;
            } else {
              // mail, no phone
              var ownersEmail = this.readableList(activity.ownersEmail);
              contactInfo = <p>
                              <FormattedMessage id="activity_subpage_reachhost_content_email" values={{ownersEmail: ownersEmail}}/>
                            </p>;
            }
          } else {
            if (activity.ownersPhone) {
              // no mail, phone
              var ownersPhone = this.readableList(activity.ownersPhone, 'or');
              contactInfo = <p>
                              <FormattedMessage id="activity_subpage_reachhost_content_phone" values={{ownersPhone: ownersPhone}}/>
                            </p>;
            } else {
              // no mail, no phone
              // Should not happen anyway
            }
          }

          var ownersName = this.readableList(activity.ownersName);
          content = <p className="content top-buffer">
                      <FormattedMessage id="activity_subpage_reachhost_content_name" values={{ownersName: ownersName}}/>
                      {contactInfo}
                    </p>;
 
          break;

      }

    }



    //
    // "More features" buttons (can be modules or just nav buttons, and depend on the activity type & available data)
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

    var features = [];

    // Feature: module Reach Host
    if (
      session.subPage === null
      && owner && activity.ownersName && ( activity.ownersPhone || activity.ownersEmail ) // only if there is an owner (whose contact info we can display)
    ) {
      features.push({
        icon: 'host',
        label: this.context.intl.formatMessage({ id: 'activity_feature_reach_host' }),
        isActive: true,
        // color: 'default',
        callback: this.onClickReachHost,
      });
    }

    // Feature: module Reminder
    if (session.subPage === null) {
      features.push({
        icon: 'reminder',
        label: this.context.intl.formatMessage({ id: 'activity_feature_set_24h_reminder' }),
        isActive: true,
        // color: 'default',
        // callback: '',
      });
    }


    // Feature: module Where do we meet
    if (session.subPage === null) {
      features.push({
        icon: 'location',
        label: this.context.intl.formatMessage({ id: 'activity_feature_where_do_we_meet' }),
        isActive: true,
        // color: 'default',
        // callback: '',
      });
    }

    // Feature: module Fees
    if (
      session.subPage === null
      && activity.paid
    ) {
      let priceInfo = this.context.intl.formatMessage({ id: 'activity_feature_price_info' });
      priceInfo += activity.price ? ' ' + activity.price + ' ' + activity.currency : this.context.intl.formatMessage({ id: 'activity_feature_price_info_not_defined_yet' });
      features.push({
        icon: 'expenses',
        label: priceInfo,
        isActive: false,
        // color: 'disabledInactive',
        // callback: '',
      });
    }

    // Feature: module View journal
    if (session.subPage === null) {
      features.push({
        icon: 'journal',
        label: this.context.intl.formatMessage({ id: 'activity_feature_view_journal' }),
        isActive: true,
        // color: 'default',
        // callback: '',
      });
    }

    // Feature: button Back to details
    if (session.subPage !== null) {
      features.push({
        icon: 'arrowleft',
        label: this.context.intl.formatMessage({ id: 'activity_feature_back_to_activity_details' }),
        isActive: true,
        color: 'start',
        callback: this.onClickBackToActivityDetails,
      });
    }

    // "activity_feature_reach_host"
    // "activity_feature_view_journal"
    // "activity_feature_set_24h_reminder"
    // "activity_feature_24h_reminder_active"
    // "activity_feature_where_do_we_meet"
    // "activity_feature_view_scheduled_route"
    // "activity_feature_back_to_activity_details"
    // "activity_feature_back_to_location_details"
    // "activity_feature_view_map"

    var moreFeaturesClasses = classNames( "moreFeatures", {
      singleButton: features.length == 1
    });

    var moreFeatures = <div className={moreFeaturesClasses}>
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
          timeInfo = <span className="timeInfo">
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
          timeInfo = <span className="timeInfo">
                      <FormattedTime
                        value={event.date}
                        minute="2-digit"
                        hour="numeric" />
                     </span>;
        }
        // if (endDate) {
        //   timeInfo = this.context.intl.formatDate({ value: {event.date}, minute: '2-digit', hour: 'numeric' }) + " - " + this.context.intl.formatDate({ value: event.dateEnd, minute: '2-digit', hour: 'numeric' });
        // } else {
        //   timeInfo = this.context.intl.formatDate({ value: event.date, minute: '2-digit', hour: 'numeric' });
        // }

        return <div key={event.id} className="relatedActivityListItem" onClick={this.onClickRelatedActivity.bind(this, event.id)}>
            <Icon type='calendar' folder='service' size='medium'/>
            <span className="eventDate">{date}</span>
            &nbsp;(<span className="whenIsDate">{whenIsDateRelativeToNow}</span>)
            <span className="eventTime">
              <IconButton
                type='time' folder='service'
                color='timeInfo'
                size='medium'
                isActive={true}
                labelAlignment='center' iconPosition='right'
                label="" />
              {timeInfo}
            </span>
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
      relatedActivitiesRendered = <Row className="relatedEvents">
                                    <Row>
                                      <h4>
                                        <FormattedMessage id="activity_related_next" />
                                      </h4>
                                    </Row>
                                    <Row>
                                      {futureEvents.map( renderRelatedEvent.bind(this, true), this )}
                                    </Row>
                                    <Row>
                                      <h4>
                                        <FormattedMessage id="activity_related_past" />
                                      </h4>
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

    let cardClasses = classNames("card outline top-buffer", {
      'subpage': session.subPage
    });

    return (
      <div className="container activities activity">

        <div className={cardClasses}>

          {componentDate}

          {componentTime}

          <div className="inside">

          <Row>
            <Col xs={12}>

              <div className="text-center">

                {mainIcon}

                <h2>{activity.name}</h2>

              </div>

              {content}

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
