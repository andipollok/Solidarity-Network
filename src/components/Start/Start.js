import React from 'react';

import SvgIcon from 'react-svg-icons';
import { Button, Row, Col } from 'react-bootstrap';
import { Link }  from 'react-router';
import { FormattedMessage } from 'react-intl';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import DataActions from '../../stores/DataActions';
import DataStore from '../../stores/DataStore';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import StepBullets from '../General/StepBullets';
import Icon from '../General/Icon';

export default React.createClass({

  // Step 1: must select country
  // Step 2: country selected & must select area
  // Step 3: area selected & must press button
  // Step 4: button pressed, select section (in main menu)

  // NB in the design of the interface, we don't reflect those 4 steps
  // graphically. Instead we have 2 stepbullets.
  // First stepbullet is for steps 1
  // Second stepbullet is for steps 2 and 3
  // during step 4 we hide the stepbullets

  getInitialState() {
    return {
      step: 1,
      aCountryIsSelected: false,
      currentlySelectedCountry: undefined,
      anAreaIsSelected: false,
      currentlySelectedArea: undefined,
    };
  },

  componentWillMount() {
    StatusActions.setPage('start');
    StatusActions.setTitle(null);
    StatusActions.showPrimaryNav(true);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  onClickCountry( country ) {
    this.setState({
      aCountryIsSelected: true,
      currentlySelectedCountry: country,
      step: 2
    });
  },

  onClickArea( area ) {
    
    // debug
    //console.log(area.fields.Name);
    //console.log(area.id);

    this.setState({
      anAreaIsSelected: true,
      currentlySelectedArea: area,
      step: 3
    });

    // StatusActions.setArea(area.id);
    // StatusActions.forceTrigger();
    // DataActions.init();

  },

  onClickButtonNext() {
    this.setState({
      step: 4
    });
  },

  // onClickActivities() {
  //   StatusActions.setGotoDestination("#/activities");
  //   window.location.assign('#/activities/type');
  // },

  // onClickStories() {
  //   window.location.assign('#/stories');
  // },

  render() {

    var data = this.props.data;
    var countries = data.countries;

    var areasOfSelectedCountry = this.state.aCountryIsSelected ? this.state.currentlySelectedCountry.areas : [];

    var buttonNextClasses = {

    };

    var countryItem = function(country) {
      return ( <div className="country" onClick={this.onClickCountry.bind(this, country)}>
          <Icon type={country.iconName} folder='countries' size='large' isNav={true} isActive={false}/>
          <br />
          <span className="text">{country.name}</span>
        </div> );
    }.bind(this);
    
    var areaItem = function(area) {
      return ( <div className="area" onClick={this.onClickArea.bind(this, area)}>
          <Icon type={area.fields["Icon Name"]} folder='areas' size='small' isNav={true} isActive={false}/>
          <br />
          <span className="text">{area.fields.Name}</span>
        </div> );
    }.bind(this);

    var mainTitle = undefined;

    switch ( this.state.step ) {
      
      case 1:
      case 2:
      case 3:
        mainTitle = <Col sm={12} className="text-center">
          <p>
            <FormattedMessage id='chooseAreaTitle'/>
          </p>
        </Col>;
        break;

      case 4:
        mainTitle = <Col sm={12} className="text-center">
          <p>
            <FormattedMessage id='chooseSectionTitle'/>
          </p>
        </Col>;
        break;

    }

    var mainContent = undefined;

    switch ( this.state.step ) {

      case 1:
      case 2:
      case 3:

        mainContent = <Col sm={8} className="text-center">
          <div>
            <FormattedMessage id='chooseAreaSubtitle'/>
            <div className="countries">
              {countries.map(countryItem, this)}
            </div>
          </div>
          <div>
            <div className="areas">
              {areasOfSelectedCountry.map(areaItem, this)}
            </div>
          </div>
        </Col>;

        break;

      case 4:
        
        mainContent = <Col sm={8} className="text-center"></Col>;
        
        break;

    }

    var buttonNext = undefined;

    switch ( this.state.step ) {
      
      case 1:
      case 2:
        buttonNext = <Col sm={12} className="text-center">
          <p>
            <Button className="next" size="bsLarge" onClick={this.onClickButtonNext} disabled>
              <FormattedMessage id='startNextChooseSection' />
            </Button>
          </p>
        </Col>;
        break;

      case 3:
        buttonNext = <Col sm={12} className="text-center">
          <p>
            <Button className="next" size="bsLarge" onClick={this.onClickButtonNext}>
              <FormattedMessage id='startNextChooseSection' />
            </Button>
          </p>
        </Col>;
        break;

      case 4:
        buttonNext = <Col sm={12} className="text-center">
        </Col>;
        break;

    }

    var stepBullets = undefined;

    switch ( this.state.step ) {
      
      case 1:
      case 2:
      case 3:
        stepBullets = <StepBullets small={false} amount={2} active={[ (this.state.step == 1), (this.state.step == 2 || this.state.step == 3) ]} height={160} />;
        break;

      case 4:
        stepBullets = null;
        break;

    }


    return (
      <div className="container-fluid start">
        <Row>
          {mainTitle}
        </Row>
        <Row>
          <Col sm={2} className="text-center">
            {stepBullets}
          </Col>
          {mainContent}
          <Col sm={2} className="text-center">
          </Col>
        </Row>
        <Row>
          {buttonNext}
        </Row>
      </div>
    );


  }

});