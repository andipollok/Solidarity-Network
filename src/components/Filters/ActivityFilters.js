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

import { formatMessage, FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

// import Listitem from './Calendaritem';
// import TypeSelectorButton from '../General/TypeSelectorButton';
// import ViewSelectorButtons from './ViewSelectorButtons';


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
          <Icon type={activity.icon} folder='activities' size='small' isNav={false} isActive={true}/>
          <br />
          <span className="text">{activityName}</span>
        </div> );
    }.bind(this);


    let currentFilterIsOverAll = !currentFilter || currentFilter.length == 0;

    if (currentFilterIsOverAll) {

      // only render the "overall" item

      let overAllItemName = this.context.intl.formatMessage({ id: 'filterOptionOverall' });;
      let overAllItem = <div className="activityType" onClick={this.openActivityTypeFilter}>
            <Icon type='overall' folder='service' size='small' isNav={false} isActive={true}/>
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
          <Icon type={activity.icon} folder='activities' size='small' isNav={false} isActive={active}/>
          <br />
          <span className="text">{activity.name}</span>
        </div> );
    }.bind(this);

    let overAllItemName = this.context.intl.formatMessage({ id: 'filterOptionOverall' });;
    let overAllItemActive = !currentFilter || currentFilter.length == 0;
    let overAllItem = <div className="activityType" onClick={StatusStore.resetFilterActivityType.bind(StatusStore)}>
          <Icon type='overall' folder='service' size='small' isNav={false} isActive={overAllItemActive}/>
          <br />
          <span className="text">{overAllItemName}</span>
        </div>;

    return <div className="activityTypes">
        {overAllItem}
        {DataStore.data.activitytypes.map(activityItem, this)}
      </div>;

  },

  renderFilter_Fees() {

    var data = this.props.data;

    let label1 = this.context.intl.formatMessage({ id: 'filterPaidAny' });
    let label2 = this.context.intl.formatMessage({ id: 'filterPaidFree' });
    let label3 = this.context.intl.formatMessage({ id: 'filterPaidExpenses' });

    let active1 = StatusStore.data.filters.activityPaid === undefined;
    let active2 = StatusStore.data.filters.activityPaid === 0;
    let active3 = StatusStore.data.filters.activityPaid === 1;

    let callback1 = StatusStore.resetFilterActivityPaid.bind(StatusStore);
    let callback2 = StatusStore.setFilterActivityPaid.bind(StatusStore, 0);
    let callback3 = StatusStore.setFilterActivityPaid.bind(StatusStore, 1);

    // StatusStore.data.filters

    var bullets = <StepBullets small={false} amount={3} horizontal={true} linked={true} active={[ active1, active2, active3 ]} height={40} width={160} labels={[ label1, label2, label3 ]} callbacks={[ callback1, callback2, callback3 ]} />;
    
    return bullets;

  },

  renderFilter_Status() {

    var data = this.props.data;

    let option1 = this.context.intl.formatMessage({ id: 'filterStatusAny' });
    let option2 = this.context.intl.formatMessage({ id: 'filterStatusNew' });
    let option3 = this.context.intl.formatMessage({ id: 'filterStatusCancelled' });

    let active1 = StatusStore.data.filters.activityStatus === undefined;
    let active2 = StatusStore.data.filters.activityStatus === 'new';
    let active3 = StatusStore.data.filters.activityStatus === 'cancelled';

    let callback1 = StatusStore.resetFilterActivityStatus.bind(StatusStore);
    let callback2 = StatusStore.setFilterActivityStatus.bind(StatusStore, 'new');
    let callback3 = StatusStore.setFilterActivityStatus.bind(StatusStore, 'cancelled');

    var bullets = <StepBullets small={false} amount={3} horizontal={true} linked={true} active={[ active1, active2, active3 ]} height={40} width={160} labels={[ option1, option2, option3 ]} callbacks={[ callback1, callback2, callback3 ]} />;
    
    return bullets;

  },

  render() {

    var data = this.props.data;

    var screen = this.props.session.filterPopupScreen;

    var togglePopup = this.props.togglePopup;

    var contentRowClass = '';

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
        mainContent = <Col sm={10} className="text-center">
          <div>
            {filterActivities}
          </div>
          <div>
            {filterFees}
          </div>
          <div>
            {filterStatus}
          </div>
        </Col>;
        break;

      case 'activities':
        contentRowClass = 'activities';
        var filterActivities = this.renderFilter_Activities_AvailableOptions();
        mainContent = <Col sm={12} className="text-center">
          <div>
            {filterActivities}
          </div>
          <span className="clear"></span>
        </Col>;
        break;

      default:
        mainTitle = undefined;
        break;

    }

    //
    // button
    //

    // does not depend on screen
    var buttonApply =  <Col sm={12} className="applyFilterButton">
            <p>
              <Button className="next" size="bsLarge" onClick={togglePopup}>
                <FormattedMessage id='filtersButtonApply' />
              </Button>
            </p>
          </Col>;

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
      <div className="container">

        <div className="filtersBackground">

            <Row>
              {topStepBullets}
              {mainTitle}
            </Row>
            <Row className={contentRowClass}>
              <Col sm={2} className="text-center">
                {sideStepBullets}
              </Col>
              <Col sm={8} className="text-center">
                {mainContent}
              </Col>
              <Col sm={2} className="text-center">
              </Col>
            </Row>
            <Row>
              {buttonApply}
            </Row>

        </div>

      </div>
    );

  }
});
