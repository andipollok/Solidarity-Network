import React from 'react';
import createHashHistory from 'history/lib/createHashHistory';

import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import MainMenu from './MainMenu';

import Icon from '../General/Icon';

import { FormattedMessage } from 'react-intl';

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
    history.goBack();
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

  render() {

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

      let menuIconType = 'upcoming';
      let menuIconFolder = 'service';

      var MainMenuIcon = ( <div className={mainMenuIconClasses} onClick={this.onClickMainMenuIcon}>
        <svg preserveAspectRatio="xMidYMid meet" name="service/medium/alo_service-activity-medium">
          <circle cx="30" cy="30" r="30" fill="transparent" stroke="white" strokeWidth="3"></circle>
        </svg>
        <Icon type={menuIconType} folder={menuIconFolder} size='medium' isNav={false} isActive={true} />
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
                {MainMenuIcon}
              </div>
              <div className="top-flex-right text-right">
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
      <MainMenu openMenuCallback={this.openMenu} closeMenuCallback={this.closeMenu} />
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

