import React from 'react';
import createHashHistory from 'history/lib/createHashHistory';

import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Icon from '../General/Icon';

import { FormattedMessage } from 'react-intl';

const history = createHashHistory();

export default React.createClass({

  onClickSettings( event ) {
    this.props.closeMenuCallback();
    window.location.assign("#/settings");
  },

  onClickMenuFrame( event ) {
    // do nothing but catch the click
    event.stopPropagation();
  },

  render() {

    //var data = this.props.data;

    return (
        <div id="menu" onClick={this.onClickMenuFrame}>

            <Button className="settingsButton" size="bsLarge" onClickCapture={this.onClickSettings}>
              <FormattedMessage id='settings' />
            </Button>

        </div>
    );
  }
});

