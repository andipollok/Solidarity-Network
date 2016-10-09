import React from 'react';
import moment from 'moment';

import { Button, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import DataStore from '../../stores/DataStore';

import StepBullets from '../General/StepBullets';
import Icon from '../General/Icon';
import IconButton from '../General/IconButton';

import { formatMessage, FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

export default React.createClass({

  contextTypes: {
    intl: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {};
  },

  componentWillMount() {
    this.props.setSessionVar( "filterPopupScreen", 'main' );
  },

  openActivityTypeFilter() {
    this.props.setSessionVar( "filterPopupScreen", 'activities' );
  },

  renderFilter_Activities_CurrentSelection() {

    var currentFilter = null;
    if (StatusStore.data.filters.activityType) {
      currentFilter = Object.keys(StatusStore.data.filters.activityType);
    }

    var activityItem = function(activityName) {
      var activity = StatusStore.data.filters.activityType[activityName];
      return ( <div key={activity.id} className="activityType" onClick={this.openActivityTypeFilter}>
          <Icon type={activity.icon} folder='activities' color='filled' size='small' isActive={true}/>
          <br />
          <span className="text">{activityName}</span>
        </div> );
    }.bind(this);


    let currentFilterIsOverAll = !currentFilter || currentFilter.length == 0;

    if (currentFilterIsOverAll) {

      // only render the "overall" item

      let overAllItemName = this.context.intl.formatMessage({ id: 'filterOptionOverall' });;
      let overAllItem = <div className="activityType" onClick={this.openActivityTypeFilter}>
            <Icon type='overall' folder='service' color='filled' size='small' isActive={true}/>
            <br />
            <span className="text">{overAllItemName}</span>
          </div>;

      return <div className="activityTypes">
          {overAllItem}
        </div>;

    } else {

      // render all the icons

      return <div className="activityTypes">
          {currentFilter.map(activityItem, this)}
        </div>;

    }


  },

  renderFilter_Activities_AvailableOptions() {

    var currentFilter = null;
    if (StatusStore.data.filters.activityType) {
      currentFilter = Object.keys(StatusStore.data.filters.activityType);
    }

    var activityItem = function(activity) {
      var callback = undefined;
      var active = currentFilter && currentFilter.indexOf(activity.name) >= 0;
      if (active) {
        callback = StatusStore.removeFromFilterActivityType.bind(StatusStore, activity);
      } else {
        callback = StatusStore.addToFilterActivityType.bind(StatusStore, activity);
      }
      return ( <div key={activity.id} className="activityType" onClick={callback}>
          <Icon type={activity.icon} folder='activities' color='filled' size='small' isActive={active}/>
          <br />
          <span className="text">{activity.name}</span>
        </div> );
    }.bind(this);

    let overAllItemName = this.context.intl.formatMessage({ id: 'filterOptionOverall' });;
    let overAllItemActive = !currentFilter || currentFilter.length == 0;
    let overAllItem = <div className="activityType" onClick={StatusStore.resetFilterActivityType.bind(StatusStore)}>
          <Icon type='overall' folder='service' color='filled' size='small' isActive={overAllItemActive}/>
          <br />
          <span className="text">{overAllItemName}</span>
        </div>;

    return <div className="activityTypes filterOptions">
        {overAllItem}
        {DataStore.data.activitytypes.map(activityItem, this)}
      </div>;

  },

  renderFilter_Fees() {

    var data = this.props.data;

    let icon1 = "overall";
    let icon2 = "free";
    let icon3 = "expenses";

    let label1 = this.context.intl.formatMessage({ id: 'filterPaidAny' });
    let label2 = this.context.intl.formatMessage({ id: 'filterPaidFree' });
    let label3 = this.context.intl.formatMessage({ id: 'filterPaidExpenses' });

    let active1 = StatusStore.data.filters.activityPaid === undefined;
    let active2 = StatusStore.data.filters.activityPaid === 0;
    let active3 = StatusStore.data.filters.activityPaid === 1;

    let callback1 = StatusStore.resetFilterActivityPaid.bind(StatusStore);
    let callback2 = StatusStore.setFilterActivityPaid.bind(StatusStore, 0);
    let callback3 = StatusStore.setFilterActivityPaid.bind(StatusStore, 1);

    return <div className="filterOptions">
            <div className="filterOptionInlineItem" onClick={callback1}>
              <Icon type={icon1} folder='service' color='filled' size='small' isActive={active1}/>
              <br />
              <span className="text">{label1}</span>
            </div>
            <div className="filterOptionInlineItem" onClick={callback2}>
              <Icon type={icon2} folder='service' color='filled' size='small' isActive={active2}/>
              <br />
              <span className="text">{label2}</span>
            </div>
            <div className="filterOptionInlineItem" onClick={callback3}>
              <Icon type={icon3} folder='service' color='filled' size='small' isActive={active3}/>
              <br />
              <span className="text">{label3}</span>
            </div>
          </div>;

  },

  renderFilter_Status() {

    var data = this.props.data;

    let icon1 = "overall";
    let icon2 = "new";
    let icon3 = "cancelled";

    let label1 = this.context.intl.formatMessage({ id: 'filterStatusAny' });
    let label2 = this.context.intl.formatMessage({ id: 'filterStatusNew' });
    let label3 = this.context.intl.formatMessage({ id: 'filterStatusCancelled' });

    let active1 = StatusStore.data.filters.activityStatus === undefined;
    let active2 = StatusStore.data.filters.activityStatus === 'new';
    let active3 = StatusStore.data.filters.activityStatus === 'cancelled';

    let callback1 = StatusStore.resetFilterActivityStatus.bind(StatusStore);
    let callback2 = StatusStore.setFilterActivityStatus.bind(StatusStore, 'new');
    let callback3 = StatusStore.setFilterActivityStatus.bind(StatusStore, 'cancelled');

    // WITH "NEW"
    // return <div className="filterOptions">
    //         <div className="filterOptionInlineItem" onClick={callback1}>
    //           <Icon type={icon1} folder='service' color='filled' size='small' isActive={active1}/>
    //           <br />
    //           <span className="text">{label1}</span>
    //         </div>
    //         <div className="filterOptionInlineItem" onClick={callback2}>
    //           <Icon type={icon2} folder='service' color='filled' size='small' isActive={active2}/>
    //           <br />
    //           <span className="text">{label2}</span>
    //         </div>
    //         <div className="filterOptionInlineItem" onClick={callback3}>
    //           <Icon type={icon3} folder='service' color='filled' size='small' isActive={active3}/>
    //           <br />
    //           <span className="text">{label3}</span>
    //         </div>
    //       </div>;

    // WITHOUT "NEW"
    return <div className="filterOptions">
            <div className="filterOptionInlineItem" onClick={callback1}>
              <Icon type={icon1} folder='service' color='filled' size='small' isActive={active1}/>
              <br />
              <span className="text">{label1}</span>
            </div>
            <div className="filterOptionInlineItem" onClick={callback3}>
              <Icon type={icon3} folder='service' color='filled' size='small' isActive={active3}/>
              <br />
              <span className="text">{label3}</span>
            </div>
          </div>;

  },

  render() {

    var data = this.props.data;

    var screen = this.props.session.filterPopupScreen;

    var togglePopup = this.props.togglePopup;

    var contentClass = '';

    //
    // title
    //

    var mainTitle = undefined;

    switch ( screen ) {
      
      case 'main':
        mainTitle = <Col sm={12} className="text-center">
          <p>
            <FormattedMessage id='filtersTitleMain'/>
          </p>
        </Col>;
        break;

      case 'activities':
        mainTitle = <Col sm={12} className="text-center">
          <p>
            <FormattedMessage id='filtersTitleActivities'/>
          </p>
        </Col>;
        break;

      default:
        mainTitle = undefined;
        break;

    }

    //
    // content
    //

    var mainContent = undefined;

    switch ( screen ) {
      
      case 'main':
        var filterActivities = this.renderFilter_Activities_CurrentSelection();
        var filterFees = this.renderFilter_Fees();
        var filterStatus = this.renderFilter_Status();
        mainContent = <div>
          <div className="filterActivities">
            {filterActivities}
          </div>
          <div className="filterFees">
            {filterFees}
          </div>
          <div className="filterStatus">
            {filterStatus}
          </div>
        </div>;
        break;

      case 'activities':
        contentClass = 'activities';
        var filterActivities = this.renderFilter_Activities_AvailableOptions();
        mainContent = <div>
          <div className="filterActivitesList">
            {filterActivities}
          </div>
          <span className="clear"></span>
        </div>;
        break;

      default:
        mainTitle = undefined;
        break;

    }

    //
    // button
    //

    // does not depend on screen
    let buttonApplyLabel = this.context.intl.formatMessage({ id: 'filtersButtonApply' });

    var buttonApply =  (
          <div onClick={togglePopup}>
             <IconButton
                type='ok' folder='service'
                color='start'
                size='wide'
                isActive={true}
                labelAlignment='center' iconPosition='left'
                label={buttonApplyLabel} />
          </div> );

    //
    // top step bullet (decoration)
    //

    var topStepBullets = undefined;

    switch ( screen ) {
      
      case 'main':
      default:
        topStepBullets = null;
        break;

      case 'activities':
        topStepBullets = null;
        // TODO but for some reason the size goes wrong
        // <StepBullets small={false} amount={1} active={[ false ]} height={40} />;
        break;

    }

    //
    // side step bullets (decoration)
    //

    var sideStepBullets = undefined;

    switch ( screen ) {
      
      case 'main':
      default:
        sideStepBullets = <StepBullets small={false} amount={3} linked={false} active={[ false, false, false ]} height={240} labels={[ 'Part', 'Part', 'Part' ]} />;
        break;

      case 'activities':
        sideStepBullets = null;
        break;

    }

    //
    // rendering
    //

    return (

        <div className="container fixed">

          <div className="filters">

            <Row>
              <Col sm={12} className="text-center">

                {topStepBullets}

                <h3>
                  {mainTitle}
                </h3>

              </Col>
            </Row>

            <Row>
              <Col sm={12}>

                <div className={contentClass}>
                  
                  <div className="sideStepBullets">
                    {sideStepBullets}
                  </div>
                  
                  <div className="content">
                    {mainContent}
                  </div>

                </div>
              </Col>
            </Row>

            <Row>

              <Col className="text-center">
                <div className="actionButton">
                  {buttonApply}
                </div>
              </Col>

            </Row>

          </div>

        </div>

    );

  }
});
