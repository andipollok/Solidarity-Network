import React from 'react';
import moment from 'moment';

import { Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import SessionActions from '../../stores/SessionActions';
import SessionStore from '../../stores/SessionStore';
import Helpers from '../../stores/Helpers.js';

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
      screen: 'main',
      // screen: 'activities',
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

  renderFilter_Fees() {

    var data = this.props.data;

    let option1 = this.context.intl.formatMessage({ id: 'filterPaidAny' });
    let option2 = this.context.intl.formatMessage({ id: 'filterPaidFree' });
    let option3 = this.context.intl.formatMessage({ id: 'filterPaidExpenses' });

    var bullets = <StepBullets small={false} amount={3} horizontal={true} linked={true} active={[ true, false, false ]} height={40} width={160} labels={[ option1, option2, option3 ]} />;

    // topStepBullets = <StepBullets small={false} amount={1} active={[ false ]} height={40} />;
    
    return bullets;

  },

  render() {

    var data = this.props.data;

    // var days = [], weeks = [];
    // var i=0;
    // var startDate = this.state.month.clone().startOf('month').isoWeekday(1);
    // var endDate = this.state.month.clone().startOf('month').add(1, 'month').isoWeekday(7);

    // for (var date = startDate.clone(); date.diff(endDate) <= 0; date.add(1, 'days')) {
    //   // find activities
    //   var activitiesFound = data.activities.filter(
    //     function(activity) {

    //       // ----------------------------
    //       // User filtering (implicit)
    //       // ----------------------------

    //       if (SessionStore.currentFilters && SessionStore.currentFilters.activity) {
          	
    //       	// Filter by type if user value is defined
    //       	// TODO: support multiple types
    //       	if (SessionStore.currentFilters.activity.typeId) {
    //       		if (activity.typeId !== SessionStore.currentFilters.activity.typeId) {
    //       			return false;
    //       		}
    //       	}

    //       	// Filter by price if user value is defined
    //       	if (SessionStore.currentFilters.activity.paid) {
    //       		if (activity.paid !== SessionStore.currentFilters.activity.paid) {
    //       			return false;
    //       		}
    //       	}

    //       	// Filter by status if user value is defined
    //       	// TODO: define what "New" means (cf. design) and add it to this filter
    //       	if (SessionStore.currentFilters.activity.cancelled) {
    //       		if (activity.cancelled !== SessionStore.currentFilters.activity.cancelled) {
    //       			return false;
    //       		}
    //       	}

    //       }

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

    mainContent = this.renderFilter_Fees();

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
        topStepBullets = <StepBullets small={false} amount={1} active={[ false ]} height={40} />;
        break;

    }


    var sideStepBullets = undefined;

    switch ( this.state.screen ) {
      
      case 'main':
      default:
        sideStepBullets = <StepBullets small={false} amount={3} linked={false} active={[ false, false, false ]} height={240} />;
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
            <Row>
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
