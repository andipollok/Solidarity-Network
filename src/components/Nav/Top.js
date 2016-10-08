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
  active: false,
};

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
    var data = this.props.data;
    var popup = this.props.popup;
    if (data.status.page === 'start') {

      // in start screen the back button decrements a session variable resulting in the steps going back
      var step = this.props.session.startStep;
      if (step && Number.isInteger(step)) {
        if (step == 1) {
          history.goBack();
        } else {
          let newStep = step - 1;
          this.props.setSessionVar( "startStep", newStep );
        }
      }

    } else if (popup && popup == 'Filters') {

      // if go back is pressed when filters popup is open, then it goes back or closes it
      var screen = this.props.session.filterPopupScreen;
      switch ( screen ) {        
        case 'main':
        default:
          // just close it
          this.props.togglePopup();
          break;
        case 'activities':
          // go back to main
          this.props.setSessionVar( "filterPopupScreen", 'main' );
          break;
      }

    } else {

      // in all other cases, just go back in history
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

  // returns a hash with:
  //  iconType
  //  label
  //  buttonColor: color for IconButton component (white|green|default|active|passive)
  getButtonData() {

    var setSessionVar = this.props.setSessionVar;
    var data = this.props.data;

    switch (data.status.page) {

      case 'start':
        return {
          iconType: 'navigation',
          label: '',
          menuIconColor: 'default',
          contextualIconColor: 'default',
          backButtonColor: 'start'
        };
        break;

      case 'activities':
        return {
          iconType: 'upcoming',
          label: '',
          menuIconColor: 'menu',
          contextualIconColor: 'menu',
          backButtonColor: 'default'
        };
        break;

      default:
        return {
          iconType: 'navigation',
          label: '',
          menuIconColor: 'menu',
          contextualIconColor: 'menu',
          backButtonColor: 'default'
        };
        break;

    }

  },

  // returns a simple array with:
  // [0] : icon path
  // [1] : label
  getLeftTopButtonData() {

    var setSessionVar = this.props.setSessionVar;
    var data = this.props.data;
    var session = this.props.session;
    
    switch (data.status.page) {

      case 'start':
      default:
        return noButton;
        break;

      case 'activities':
        let layoutPreference = "Cards";
        let thisIsThePreferredLayoutAlready = ( session.preferredLayout == layoutPreference );
        return {
          icon: '',
          label: layoutPreference,
          callback: thisIsThePreferredLayoutAlready ? undefined: setSessionVar.bind(null, "preferredLayout", layoutPreference),
          active: thisIsThePreferredLayoutAlready,
        };
        break;

      // DEBUG
      // default:
      //   return {
      //     icon: '',
      //     label: 'LEFT BUTTON',
      //     callback: undefined,
      //     active: false,
      //   };
      //   break;

    }

  },

  getRightTopButtonData() {

    var setSessionVar = this.props.setSessionVar;
    var data = this.props.data;
    var session = this.props.session;

    switch (data.status.page) {

      case 'start':
      default:
        return noButton;
        break;

      case 'activities':
        let layoutPreference = "List";
        let thisIsThePreferredLayoutAlready = ( session.preferredLayout == layoutPreference );
        return {
          icon: '',
          label: layoutPreference,
          callback: thisIsThePreferredLayoutAlready ? undefined : setSessionVar.bind(null, "preferredLayout", layoutPreference),
          active: thisIsThePreferredLayoutAlready,
        };
        break;

      // DEBUG
      // default:
      //   return {
      //     icon: '',
      //     label: 'RIGHT BUTTON',
      //     callback: undefined,
      //     active: false,
      //   };
      //   break;

    }

  },

  getFiltersButtonData() {

    var togglePopup = this.props.togglePopup;
    var setSessionVar = this.props.setSessionVar;
    var data = this.props.data;
    var popup = this.props.popup;

    switch (data.status.page) {

      case 'activities':
        return {
          icon: 'filters',
          label: null,
          callback: togglePopup, //.bind(null, "preferredLayout", "list"),
          active: ( popup && popup == 'Filters' ),
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



    //
    // Main menu
    //

    var mainMenuClasses = classNames({
      'opened': this.state.mainMenuOpened
    });

    var mainMenu = (<div id="mainmenu" className={mainMenuClasses} onClick={this.onClickOutsideMainMenu}>
      <MainMenu ref="mainMenuRef" openMenuCallback={this.openMenu} closeMenuCallback={this.closeMenu} data={data} />
    </div>);



    //
    // Primary navigation
    //

    // if (data.status.title !== null) {
    if (data.status.showPrimaryNav) {

      let menuIconData = this.getButtonData();

      var barClasses = classNames( "top-bar", data.status.page);

      //
      // Back button (top left corner)
      //

      // var BackButton = <Button className="backButton" onClick={this.onClickBack}>
      //   &lt;&nbsp;
      //   <FormattedMessage id='back' />
      // </Button>;

      let backIconClasses = classNames( 'backIcon', 'divLink', {
        'active': true // TODO clarify whether that means highlighted or enabled
      });

      let backIcon = <IconButton type={menuIconType} folder={menuIconFolder} color={menuIconData.backButtonColor} size='medium' isNav={false} isActive={false} labelAlignment='center' iconPosition='left' label="Go Back" />;
      
      var BackComponent = ( <div className={backIconClasses} id="backIcon" onClick={this.onClickBack}>
        {backIcon}
      </div> );

      //
      // Main menu icon
      //

      var mainMenuIconClasses = classNames( 'mainMenuIcon', 'divLink', {
        'active': !this.state.mainMenuOpened,
        'hidden': (data.status.page == 'start') && (this.props.session.startStep < 4)
      });

      let menuIconType = menuIconData.iconType;
      let menuIconFolder = 'service';

      // TODO display the label
      // let menuIconLabel = menuIconData.label;

      let menuIconColor = menuIconData.menuIconColor;

      var MainMenuIcon = (
          <div className={mainMenuIconClasses} id="mainMenuIcon" onClick={this.onClickMainMenuIcon}>
            <Icon type={menuIconType} folder={menuIconFolder} size='small' color={menuIconColor} isActive={!this.state.mainMenuOpened} data={data}/>
          </div>
      );

      //
      // Contextual icons (on top center, left and right from main menu icon)
      //

      let contextualIconClasses = classNames( 'contextualTopIcon', 'divLink', {
        'active': true // TODO clarify whether that means highlighted or enabled
      });

      let leftButtonData = this.getLeftTopButtonData();
      let rightButtonData = this.getRightTopButtonData();

      var contextualIconColor = menuIconData.contextualIconColor;

      let leftIcon = <IconButton type={menuIconType} folder={menuIconFolder} color={contextualIconColor} size='medium' isNav={false} isActive={leftButtonData.active} labelAlignment='left' iconPosition='left' label={leftButtonData.label} />;
      
      if (leftButtonData.icon === null && leftButtonData.label === null) {
        leftIcon = undefined;
      }

      let rightIcon = <IconButton type={menuIconType} folder={menuIconFolder} color={menuIconColor} size='medium' isNav={false} isActive={rightButtonData.active} labelAlignment='right' iconPosition='right' label={rightButtonData.label} />;
      
      if (rightButtonData.icon === null && rightButtonData.label === null) {
        rightIcon = undefined;
      }
      
      var ContextualIconLeftComponent = ( <div className={contextualIconClasses} id="leftContextualTopIcon" onClick={leftButtonData.callback}>
        {leftIcon}
      </div> );

      var ContextualIconRightComponent = ( <div className={contextualIconClasses} id="rightContextualTopIcon" onClick={rightButtonData.callback}>
        {rightIcon}
      </div> );

      //
      // Filters button (top right corner)
      //

      let filtersIconClasses = classNames( 'filtersIcon', 'divLink', {
        'active': true // TODO clarify whether that means highlighted or enabled
      });

      let filtersButtonData = this.getFiltersButtonData();

      let filtersIcon = <IconButton type={menuIconType} folder={menuIconFolder} color={menuIconColor} size='medium' isNav={false} isActive={filtersButtonData.active} labelAlignment='center' iconPosition='right' label="Filters" />;
      
      if (filtersButtonData.icon === null) {
        filtersIcon = undefined;
      }

      var FiltersIconComponent = ( <div className={filtersIconClasses} id="filtersIcon" onClick={filtersButtonData.callback}>
        {filtersIcon}
      </div> );

      //
      // Rendering of the primary nav
      //

      var primary = (
        <Row className={barClasses}>
          <Col className="box no-padding">

              <div className="top-left text-left">
                {BackComponent}
              </div>

              <div className="top-right text-right">
                {FiltersIconComponent}
              </div>

              <div className="top-middle text-center">
                <div className="topNavWidget">
                  <div className="topNavWidgetIcons">
                    {ContextualIconLeftComponent}
                    {ContextualIconRightComponent}
                  </div>
                  {MainMenuIcon}
                </div>
              </div>

          </Col>
        </Row>
      );
      // <h4>{data.status.title}</h4>

    };



    //
    // Login button
    //

    // <Button className="loginButton" size="bsLarge" onClick={this.onClickLogin}>
    //   <FormattedMessage id='login' />
    // </Button>



    //
    // Secondary navigation
    //

    if (data.status.secondaryNav !== null) {
      var barClassesSecondary = classNames( "top-bar secondary text-center", data.status.page);
      var secondary = (
        <Row className={barClassesSecondary}>
          {data.status.secondaryNav}
        </Row>
      );

    };



    // 
    // Rendering of the whole component
    //

    return (
      <div className="container-fluid">

        {mainMenu}

        {primary}

        {secondary}

      </div>
    );
  }
});

