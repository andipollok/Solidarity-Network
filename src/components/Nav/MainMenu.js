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

  onClickMenuFrame() {
    // do nothing but catch the click
  },

  render() {

    //var data = this.props.data;

    return (
        <div id="menu" onClickCapture={this.onClickMenuFrame}>

            <Button className="settingsButton" size="bsLarge" onClickCapture={this.onClickSettings}>
              <FormattedMessage id='settings' />
            </Button>

        </div>
    );
  }
});

