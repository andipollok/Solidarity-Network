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
      mainMenuOpened: true
    }
  },

  onClickOutsideMainMenu() {
    this.setState({ mainMenuOpened: false });
  },

  onClickMainMenuIcon() {
    this.setState({ mainMenuOpened: true });
  },

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


    // primary navigation
    if (data.status.title !== null) {

      var barClasses = classNames( "top-bar", data.status.page);

      var BackButton = <Button className="backButton" onClick={this.onClickBack}>
        &lt;&nbsp;
        <FormattedMessage id='back' />
      </Button>;

      var primary = (
        <Row className={barClasses}>
          <Col className="box no-padding">
            <div className="top-flex">
              <div className="top-flex-left text-left">
                {BackButton} 
              </div>
              <div className="top-flex-middle text-center">
                <h4>{data.status.title}</h4>
              </div>
              <div className="top-flex-right text-right">
               <Button className="loginButton" size="bsLarge" onClick={this.onClickLogin}>
                 <FormattedMessage id='login' />
               </Button>
              </div>
            </div>
          </Col>
        </Row>
      );


    };


    // secondary navigation
    if (data.status.secondaryNav !== null) {
      var barClassesSecondary = classNames( "top-bar secondary text-center", data.status.page);
      var secondary = (
        <Row className={barClassesSecondary}>
          {data.status.secondaryNav}
        </Row>
      );

    };


    var MainMenuIcon = <div className="divLink" onClick={this.onClickMainMenuIcon}>
        <Icon type='activity' folder='service' size='medium' isNav={false} isActive={true} />
      </div>

    var mainMenuClasses = classNames({
      'opened': this.state.mainMenuOpened
    });


    return (
      <div className="container-fluid">

        <div id="mainmenu" className={mainMenuClasses} onClick={this.onClickOutsideMainMenu}>
          <MainMenu/>
        </div>

        {primary}

        {MainMenuIcon}

        {secondary}

      </div>
    );
  }
});

