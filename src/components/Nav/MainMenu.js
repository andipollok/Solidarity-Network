import React from 'react';
import createHashHistory from 'history/lib/createHashHistory';

import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Icon from '../General/Icon';

import { FormattedMessage } from 'react-intl';

const history = createHashHistory();

export default React.createClass({

  onClickSettings() {
    window.location.assign("#/settings");
  },

  render() {

    //var data = this.props.data;

    return (
        <div id="menu">

            <Button className="settingsButton" size="bsLarge" onClick={this.onClickSettings}>
              <FormattedMessage id='settings' />
            </Button>
            
        </div>
    );
  }
});

