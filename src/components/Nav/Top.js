import React from 'react';
import createHashHistory from 'history/lib/createHashHistory';

import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import MainMenu from './MainMenu';
import IconButton from '../General/IconButton';
import Icon from '../General/Icon';

import { FormattedMessage } from 'react-intl';

const noButton = {
  icon: null,
  label: null,
  callback: undefined,
};

const solidarityPurple = "#823FC2";

const history = createHashHistory();

export default React.createClass({

  getInitialState() {
    return {
      mainMenuOpened: false
    }
  },

  openMenu() {
    this.setState({ mainMenuOpened: true });
  },

  closeMenu() {
    this.setState({ mainMenuOpened: false });
  },

  onClickOutsideMainMenu() {
    this.closeMenu();
  },

  onClickMainMenuIcon() {
    this.openMenu();
  },

  // onClickMenuLink() {
  //   this.openMenu();
  // },

  onClickBack() {
    var data = this.props.data;
    if (data.status.page === 'start') {

    } else {
      history.goBack();
    }
  },

  onClickForward() {
    StatusActions.historyForward();
  },

  onClickSettings() {
    window.location.assign("#/settings");
  },

  onClickLogin() {
    window.location.assign("#/login");
  },

  // returns a simple array with:
  // [0] : icon path
  // [1] : label
  // [2] : stroke color for circle and icon
  getMainMenuButtonData() {

    var setSessionVar = this.props.setSessionVar;

    var data = this.props.data;

    switch (data.status.page) {

      case 'start':
        return [
          'navigation',
          '',
          'white'
        ];
        break;

      case 'activities':
        return [
          'upcoming',
          '',
          solidarityPurple
        ];
        break;

      default:
        return [
          'upcoming',
          '',
          'white'
        ];
        break;

    }

  },

  // returns a simple array with:
  // [0] : icon path
  // [1] : label
  getLeftTopButtonData() {

    var setSessionVar = this.props.setSessionVar;

    var data = this.props.data;

    switch (data.status.page) {

      case 'start':
        return noButton;
        break;

      case 'activities':
        return {
          icon: '',
          label: 'Cards',
          callback: setSessionVar.bind(null, "preferredLayout", "cards"),
        };
        break;

      default:
        return {
          icon: '',
          label: 'LEFT BUTTON',
        };
        break;

    }

  },

  getRightTopButtonData() {

    var setSessionVar = this.props.setSessionVar;

    var data = this.props.data;

    switch (data.status.page) {

      case 'start':
        return noButton;
        break;

      case 'activities':
        return {
          icon: '',
          label: 'List',
          callback: setSessionVar.bind(null, "preferredLayout", "list"),
        };
        break;

      default:
        return {
          icon: '',
          label: 'RIGHT BUTTON',
        };
        break;

    }

  },

  getFiltersButtonData() {

    var toggleFiltersPopup = this.props.toggleFiltersPopup;

    var setSessionVar = this.props.setSessionVar;

    var data = this.props.data;

    switch (data.status.page) {

      case 'activities':
        return {
          icon: 'filters',
          callback: toggleFiltersPopup, //.bind(null, "preferredLayout", "list"),
        };
        break;

      case 'start':
      default:
        return noButton;
        break;

    }

  },

  render() {

    var setSessionVar = this.props.setSessionVar;

    var data = this.props.data;

    if (data.status.title === '' || data.status.title === undefined) {
      return <div></div>;
    }


    // Primary navigation

    // if (data.status.title !== null) {
    if (data.status.showPrimaryNav) {

      var barClasses = classNames( "top-bar", data.status.page);

      // Back button

      var BackButton = <Button className="backButton" onClick={this.onClickBack}>
        &lt;&nbsp;
        <FormattedMessage id='back' />
      </Button>;

      // Main menu icon

      var mainMenuIconClasses = classNames( 'mainMenuIcon', 'divLink', {
        'active': !this.state.mainMenuOpened
      });

      let menuIconData = this.getMainMenuButtonData();

      let menuIconType = menuIconData[0];
      let menuIconFolder = 'service';

      // TODO display the label
      // let menuIconLabel = menuIconData[1];

      let menuIconcolor = menuIconData[2];

      var MainMenuIcon = ( <div className={mainMenuIconClasses} id="mainMenuIcon" onClick={this.onClickMainMenuIcon}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" name="service/medium/alo_service-activity-medium">
          <circle cx="50" cy="50" r="46" fill="transparent" stroke={menuIconcolor} strokeWidth="4"></circle>
        </svg>
        <Icon type={menuIconType} folder={menuIconFolder} size='medium' isNav={false} isActive={true} />
      </div> );


      // Contextual icons (on top center, left and right from main menu icon)

      let contextualIconClasses = classNames( 'contextualTopIcon', 'divLink', {
        'active': true // TODO clarify whether that means highlighted or enabled
      });

      let leftButtonData = this.getLeftTopButtonData();
      let rightButtonData = this.getRightTopButtonData();

      let leftIcon = <IconButton type={menuIconType} folder={menuIconFolder} size='medium' isNav={false} isActive={false} labelAlignment='left' iconPosition='left' label={leftButtonData.label} />;
      
      if (leftButtonData.icon === null && leftButtonData.label === null) {
        leftIcon = undefined;
      }

      let rightIcon = <IconButton type={menuIconType} folder={menuIconFolder} size='medium' isNav={false} isActive={false} labelAlignment='right' iconPosition='right' label={rightButtonData.label} />;
      
      if (rightButtonData.icon === null && rightButtonData.label === null) {
        rightIcon = undefined;
      }

      var ContextualIconLeftComponent = ( <div className={contextualIconClasses} id="leftContextualTopIcon" onClick={leftButtonData.callback}>
        {leftIcon}
      </div> );

      var ContextualIconRightComponent = ( <div className={contextualIconClasses} id="rightContextualTopIcon" onClick={rightButtonData.callback}>
        {rightIcon}
      </div> );

      // Filters button (top right corner)
      // can have four states: enabled and passive (=clickable), enabled and active (=highlighted), disabled but visible (=grayed, not clickable), invisible (=not displayed at all)

      let filtersIconClasses = classNames( 'filtersIcon', 'divLink', {
        'active': true // TODO clarify whether that means highlighted or enabled
      });

      let filtersButtonData = this.getFiltersButtonData();

      let filtersIcon = <IconButton type={menuIconType} folder={menuIconFolder} size='medium' isNav={false} isActive={false} labelAlignment='center' iconPosition='right' label="Filters" />;
      
      if (filtersButtonData.icon === null) {
        filtersIcon = undefined;
      }

      var FiltersIconComponent = ( <div className={filtersIconClasses} id="filtersIcon" onClick={filtersButtonData.callback}>
        {filtersIcon}
      </div> );

      // Rendering the nav

      var primary = (
        <Row className={barClasses}>
          <Col className="box no-padding">
            <div className="top-flex">
              <div className="top-flex-left text-left">
                {BackButton} 
              </div>
              <div className="top-flex-middle text-center">
                <div className="topNavWidget">
                  <div className="topNavWidgetIcons">
                    {ContextualIconLeftComponent}
                    {ContextualIconRightComponent}
                  </div>
                  {MainMenuIcon}
                </div>
              </div>
              <div className="top-flex-right text-right">
                {FiltersIconComponent}
              </div>
            </div>
          </Col>
        </Row>
      );
      // <h4>{data.status.title}</h4>

    };

    // <Button className="loginButton" size="bsLarge" onClick={this.onClickLogin}>
    //   <FormattedMessage id='login' />
    // </Button>


    // Secondary navigation

    if (data.status.secondaryNav !== null) {
      var barClassesSecondary = classNames( "top-bar secondary text-center", data.status.page);
      var secondary = (
        <Row className={barClassesSecondary}>
          {data.status.secondaryNav}
        </Row>
      );

    };

    // Main menu

    var mainMenuClasses = classNames({
      'opened': this.state.mainMenuOpened
    });

    var mainMenu = (<div id="mainmenu" className={mainMenuClasses} onClick={this.onClickOutsideMainMenu}>
      <MainMenu openMenuCallback={this.openMenu} closeMenuCallback={this.closeMenu} data={data} />
    </div>);


    return (
      <div className="container-fluid">

        {mainMenu}

        {primary}

        {secondary}

      </div>
    );
  }
});

