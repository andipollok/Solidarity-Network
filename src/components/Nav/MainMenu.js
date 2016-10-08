import React from 'react';
import createHashHistory from 'history/lib/createHashHistory';

import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Icon from '../General/Icon';
import SvgIcon from 'react-svg-icons';

import { FormattedMessage } from 'react-intl';

const history = createHashHistory();

const color1 = "#823FC2";
const color_light = "#FFF";

export default React.createClass({

  onClickMenuFrame( event ) {
    // do nothing but catch the click
    event.stopPropagation();
  },

  onClickUpcoming( event ) {
    this.props.closeMenuCallback();
    window.location.assign("#/activities/upcoming");
  },

  onClickCalendar( event ) {
    this.props.closeMenuCallback();
    window.location.assign("#/activities/month");
  },

  onClickJournal( event ) {
    this.props.closeMenuCallback();
    window.location.assign("#/stories/latest");
  },

  onClickPhoto( event ) {
    this.props.closeMenuCallback();
    window.location.assign("#/stories/wall");
  },

  onClickSettings( event ) {
    this.props.closeMenuCallback();
    window.location.assign("#/settings");
  },

  render() {

    var data = this.props.data;

    var menuItemColor = 'menuitem';
    var lineColor = color1;

    if (data && data.status && data.status.page === 'start') {
      menuItemColor = 'menuitemstart';
      lineColor = color_light;
    }

    return (


        <div id="menu" onClick={this.onClickMenuFrame}>

            <span className="line">
              <SvgIcon name='app/line' color={lineColor}/>
            </span>

            <div className="button active" onClickCapture={this.onClickUpcoming}>
              <Icon type='upcoming' color={menuItemColor} folder='service' size='large' isActive={true} data={data} />
              <br />
              <FormattedMessage id='upcoming' />
            </div>

            <div className="button inactive">
              <Icon type='calendar' color={menuItemColor} folder='service' size='large' isActive={false} data={data} />
              <br />
              <FormattedMessage id='calendar' />
            </div>

            <div className="button inactive">
              <Icon type='journal' color={menuItemColor} folder='service' size='large' isActive={false} data={data} />
              <br />
              <FormattedMessage id='journal' />
            </div>

            <div className="button inactive">
              <Icon type='photo' color={menuItemColor} folder='service' size='large' isActive={false} data={data} />
              <br />
              <FormattedMessage id='photo' />
            </div>

            <div className="button active" onClickCapture={this.onClickSettings}>
              <Icon type='settings' color={menuItemColor} folder='service' size='large' isActive={true} data={data} />
              <br />
              <FormattedMessage id='settings' />
            </div>

        </div>
    );
  }
});

