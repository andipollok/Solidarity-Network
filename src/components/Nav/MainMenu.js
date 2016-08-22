import React from 'react';
import createHashHistory from 'history/lib/createHashHistory';

import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Icon from '../General/Icon';

import { FormattedMessage } from 'react-intl';

const history = createHashHistory();

export default React.createClass({

  getInitialState() {
    return {
      mainMenuOpened: true
    }
  },

  onClickSettings() {
    window.location.assign("#/settings");
  },

  onClickOutsideMainMenu() {
    this.setState({ mainMenuOpened: false });
  },

  render() {

    //var data = this.props.data;

    var mainMenuClasses = classNames({
      'opened': this.state.mainMenuOpened
    });
    
    return (
      <div id="mainmenu" className={mainMenuClasses} onClick={this.onClickOutsideMainMenu}>
        <div id="menu">
            <Button className="settingsButton" size="bsLarge" onClick={this.onClickSettings}>
              <FormattedMessage id='settings' />
            </Button>

        </div>
      </div>
    );
  }
});

