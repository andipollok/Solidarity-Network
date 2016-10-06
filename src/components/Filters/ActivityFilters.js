import React from 'react';
import moment from 'moment';

import { Col, Row } from 'react-bootstrap';

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

  // componentWillMount() {
  //   // var overlay = document.getElementById('pleasewait');
  //   // if (overlay) { overlay.style.display = 'block'; } else { console.log("could not find overlay"); }
  //   StatusActions.setPage('activities');
  //   StatusActions.showBackButton(false);
  //   StatusActions.setTitle(<FormattedMessage id='nav_activities' />);
  //   StatusActions.setSecondaryNav(<ViewSelectorButtons data={this.props.data} view='month'/>);
  //   StatusActions.forceTrigger();
  // },

  // componentDidMount() {
  //   // //var canvasNode = this.refs.mainCanvas.getDOMNode();
  //   // //console.log(canvasnode);
  //   // //pleasewait
  //   // //console.log(document.getElementById('pleasewait'));
  //   // document.getElementById('pleasewait').style.display = 'none';
  //   // document.getElementById('pleasewait').style.display = 'none';
  // },

  // componentDidUpdate() {
  //   var overlay = document.getElementById('pleasewait');
  //   if ( overlay ) { overlay.style.display = 'none'; } else { console.log("could not find overlay in Calendar render"); }
  // },

  getInitialState() {

    return {
      // screen: 'main',
      screen: 'activities',
    };

    // var date = moment();

    // return {
    //   month: moment().startOf('month'), // stores first of month
    // }
  },

  // onClickActivity(id) {
  //   // console.log("activity " + id + " selected");
  //   window.location.assign("#/activity/" + id);
  // },

  // onClickDay(date) {
  //   // console.log("onClickDay", date.format());
  //   window.location.assign("#/activities/" + date.format("DD/MM/YYYY"));
  // },

  // onClickPrevMonth() {
  //   this.setState({ month: this.state.month.subtract(1, 'month') });
  // },

  // onClickNextMonth() {
  //   this.setState({ month: this.state.month.add(1, 'month') });
  // },

  // // shouldComponentUpdate: function(nextProps, nextState) {
  // //   return false;
  // // },

  renderFilter_Activities_CurrentSelection() {

    // var data = this.props.data;

    // let currentTypes = StatusStore.data.filters.activityTypes;

    // let labels = [];
    // let actives = [];
    // let callbacks = [];

    // if (!currentTypes) {
    //   // default icon representing "All"

    // } else {
    //   // display the icons representing the currently selected activitiy types
      
    //   // get the activity type translation...
    //   // TODO // this.context.intl.formatMessage({ id: 'filterPaidAny' });

    // }

    // // let w = 100;
    // // let h = 100;
    // // var bullets = <StepBullets small={false} amount={labels.length} horizontal={true} linked={false} active={actives} height={h} width={w} labels={labels} />;
    
    // var bullets = <StepBullets small={false} amount={labels.length} horizontal={true} linked={false} active={actives} labels={labels} callbacks={callbacks} />;
    
    // return bullets;

    return "";

  },

  renderFilter_Activities_AvailableOptions() {

/*
      var active = this.props.session.startStep > 2 && this.state.currentlySelectedArea && this.state.currentlySelectedArea.id && this.state.currentlySelectedArea.id == area.id;
      return ( <div key={area.id} className="area" onClick={this.onClickArea.bind(this, area)}>
          <Icon type={area.fields["Icon Name"]} folder='areas' size='small' isNav={true} isActive={active} data={data}/>
          <br />
          <span className="text">{area.fields.Name}</span>
*/

    var currentFilter = null;
    if (StatusStore.data.filters.activityType) {
      Object.keys(StatusStore.data.filters.activityType);
    }

    console.log("CUR FIL");
    console.log(currentFilter);

    var activityItem = function(activity) {
      // key={activity.id} className="activity" onClick={this.onClickArea.bind(this, activity)}>
      var callback = undefined;
      var active = currentFilter && currentFilter.indexOf(activity.id) >= 0;
      if (active) {
        callback = StatusStore.removeFromFilterActivityType.bind(StatusStore, activity.id);
      } else {
        callback = StatusStore.addToFilterActivityType.bind(StatusStore, activity.id);
      }
      return ( <div className="activityType" onClick={callback}>
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
        </div>

    return <div className="activityTypes">
        {overAllItem}
        {DataStore.data.activitytypes.map(activityItem, this)}
      </div>;

    // var bullets = "";

    // let labels = [];
    // let actives = [];
    // let callbacks = [];    

    // // PAR PAQUETS DE 4
    // console.log(DataStore.data.activitytypes);
    // // icon
    // // id
    // // name

    // // bullets += <StepBullets small={false} amount={labels.length} horizontal={true} linked={false} active={actives} height={40} width={160} labels={labels} callbacks={callbacks} />; 

    // // var data = this.props.data;

    // // let label1 = this.context.intl.formatMessage({ id: 'filterPaidAny' });
    // // let label2 = this.context.intl.formatMessage({ id: 'filterPaidFree' });
    // // let label3 = this.context.intl.formatMessage({ id: 'filterPaidExpenses' });

    // // var bullets = <StepBullets small={false} amount={3} horizontal={true} linked={true} active={[ true, false, false ]} height={40} width={160} labels={[ label1, label2, label3 ]} />;
    
    // return bullets;

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

    var contentRowClass = '';

    // var days = [], weeks = [];
    // var i=0;
    // var startDate = this.state.month.clone().startOf('month').isoWeekday(1);
    // var endDate = this.state.month.clone().startOf('month').add(1, 'month').isoWeekday(7);

    // for (var date = startDate.clone(); date.diff(endDate) <= 0; date.add(1, 'days')) {
    //   // find activities
    //   var activitiesFound = data.activities.filter(
    //     function(activity) {

    //       // ----------------------------
    //       // Component filtering
    //       // ----------------------------

    //       // check if activity is of selected type(s)
    //       if (data.status.selectedActivityTypes.length > 0 && data.status.selectedActivityTypes.indexOf(activity.typeId) === -1) {
    //         return false;
    //       }

    //       // check if activity is on that day
    //       if(moment(activity.date).isSame(date, 'day')) {
    //         return true;
    //       }
    //     }.bind(this));
    //   days.push({
    //     number: i,
    //     id: date.format(),
    //     date: date.clone(),
    //     name: "Day " + date.format('DD'),
    //     activities: activitiesFound
    //   });
    //   i++;
    // }
    // var i=0;
    // // split days up into chunks of 7 for each week
    // var daysTemp = days;
    // while (daysTemp.length > 0) {
    //   weeks.push(
    //     { number: i,
    //       days: daysTemp.splice(0, 7)
    //       // maybe start and end date or week number, but not needed now
    //   });
    //   i++;
    // }

    // var weekItem = function(week) {
    //   return (
    //     <Row key={'week'+week.number} className="calendar-row calendar-week">
    //       { week.days.map(dayItem, this) }
    //     </Row>);
    // }.bind(this);

    // var dayItem = function(day) {
    //   return (
    //     <Listitem key={'day'+day.id} day={day} activeMonth={this.state.month} onClickDay={this.onClickDay} onClickActivity={this.onClickActivity}/>
    //   );
    // }.bind(this);

    // var dayHeader = function(dayName, i) {
    //   return (
    //     <Col key={'header' + i} className="calendar-sm-1 calendar-header bottom-buffer grey text-center">
    //       {dayName}
    //     </Col>
    //   );
    // }

    // // moment.localeData().firstDayOfWeek() is 0 for sunday and 1 for monday.
    // // unfortunately, moment.weekdaysShort() always starts with Sunday ...
    // // so we need to manipulate that
    // var weekdays = Helpers.rotateArray(moment.weekdaysShort(), moment.localeData().firstDayOfWeek());

    // // remove dots at end of day names (added for french by react-intl, e.g. 'lun.' - we only want 'lun')
    // weekdays.forEach(function(item, i) {
    //   weekdays[i] = item.replace(/\./g, '');
    // });

          // <div className="container-fluid start">
          // </div>
    
    
    var data = this.props.data;
    
    // var countryItem = function(country) {
    //   return ( <div key={country.id} className="country" onClick={this.onClickCountry.bind(this, country)}>
    //       <Icon type={country.iconName} folder='countries' size='large' isNav={true} isActive={false}/>
    //       <br />
    //       <span className="text">{country.name}</span>
    //     </div> );
    // }.bind(this);
    
    // var areaItem = function(area) {
    //   return ( <div key={area.id} className="area" onClick={this.onClickArea.bind(this, area)}>
    //       <Icon type={area.fields["Icon Name"]} folder='areas' size='small' isNav={true} isActive={false}/>
    //       <br />
    //       <span className="text">{area.fields.Name}</span>
    //     </div> );
    // }.bind(this);


    var mainTitle = undefined;

    switch ( this.state.screen ) {
      
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


    var mainContent = undefined;

    switch ( this.state.screen ) {
      
      case 'main':
        var filterActivities = this.renderFilter_Activities_CurrentSelection();
        var filterFees = this.renderFilter_Fees();
        var filterStatus = this.renderFilter_Status();
        mainContent = <Col sm={10} className="text-center">
          <p>
            {filterActivities}
          </p>
          <p>
            {filterFees}
          </p>
          <p>
            {filterStatus}
          </p>
        </Col>;
        break;

      case 'activities':
        contentRowClass = 'activities';
        var filterActivities = this.renderFilter_Activities_AvailableOptions();
        mainContent = <Col sm={12} className="text-center">
          <p>
            {filterActivities}
          </p>
          <span class="clear"></span>
        </Col>;
        break;

      default:
        mainTitle = undefined;
        break;

    }


    // switch ( this.state.step ) {

    //   case 1:
    //   case 2:
    //   case 3:

    //     mainContent = <Col sm={8} className="text-center">
    //       <div>
    //         <FormattedMessage id='chooseAreaSubtitle'/>
    //         <div className="countries">
    //           {countries.map(countryItem, this)}
    //         </div>
    //       </div>
    //       <div>
    //         <div className="areas">
    //           {areasOfSelectedCountry.map(areaItem, this)}
    //         </div>
    //       </div>
    //     </Col>;

    //     break;

    //   case 4:
        
    //     mainContent = <Col sm={8} className="text-center"></Col>;
        
    //     break;

    // }


    var buttonApply = undefined;

    // switch ( this.state.step ) {
      
    //   case 1:
    //   case 2:
    //     buttonApply = <Col sm={12} className="text-center">
    //       <p>
    //         <Button className="next" size="bsLarge" onClick={this.onClickButtonNext} disabled>
    //           <FormattedMessage id='startNextChooseSection' />
    //         </Button>
    //       </p>
    //     </Col>;
    //     break;

    //   case 3:
    //     buttonApply = <Col sm={12} className="text-center">
    //       <p>
    //         <Button className="next" size="bsLarge" onClick={this.onClickButtonNext}>
    //           <FormattedMessage id='startNextChooseSection' />
    //         </Button>
    //       </p>
    //     </Col>;
    //     break;

    //   case 4:
    //     buttonApply = <Col sm={12} className="text-center">
    //     </Col>;
    //     break;

    // }


    var topStepBullets = undefined;

    switch ( this.state.screen ) {
      
      case 'main':
      default:
        topStepBullets = null;
        break;

      case 'activities':
        topStepBullets = null; // <StepBullets small={false} amount={1} active={[ false ]} height={40} />;
        break;

    }


    var sideStepBullets = undefined;

    switch ( this.state.screen ) {
      
      case 'main':
      default:
        sideStepBullets = <StepBullets small={false} amount={3} linked={false} active={[ false, false, false ]} height={240} labels={[ 'Part', 'Part', 'Part' ]} />;
        break;

      case 'activities':
        sideStepBullets = null;
        break;

    }


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
        // <TypeSelectorButton data={data}/>

        // <div className="calendar">
        //   <Row className="calendar-row">
        //     <Col className="calendar-xs-1 text-center">
        //       <h3 onClick={this.onClickPrevMonth}>&lt;</h3>
        //     </Col>
        //     <Col className="calendar-xs-5 text-center">
        //       <h2>{Helpers.capitalizeFirstLetter(this.state.month.format('MMMM YYYY'))}</h2>
        //     </Col>
        //     <Col className="calendar-xs-1 text-center">
        //       <h3 onClick={this.onClickNextMonth}>&gt;</h3>
        //     </Col>
        //   </Row>
        //   <Row className="calendar-row hidden-xs">
        //     {weekdays.map(dayHeader, this)}
        //   </Row>
        //     {weeks.map(weekItem, this)}
        // </div>
  }
});
