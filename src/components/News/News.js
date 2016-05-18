import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import Listitem from './NewsListitem';


export default React.createClass({

  componentWillMount() {
    StatusActions.setPage('news');
    StatusActions.showBackButton(false);
    StatusActions.setTitle(<FormattedMessage id='nav_news' defaultMessage='News'/>);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },

  onClickSelectItem(url) {
    window.location.assign('#/' + url);
  },

  render() {

    var data = this.props.data;

    var list = [];

    list = data.whatsnew.filter(function(item) {

      // load activity
      item.activity = {};
      if (data.loaded.activities && item.activityId) {
        item.activity = Helpers.getActivityById(item.activityId, data);
        if (!item.activity) {
          return false;
        }
        // check if this activity is in a group that is in this community
        var community = Helpers.getCommunityById(item.activity.communityId, data);
        if (!community) {
          return false;
        }
        var area = Helpers.getAreaById(community.areaId, data);
        if (!area || area.id !== data.status.area) {
          return false;
        }
      }

      // load person
      item.person = {};
      if (data.loaded.people && item.personId) { // item.personId is actually always there, checked in datastore
        item.person = Helpers.getPersonById(item.personId, data);
      }

      // load community
      item.community = {};
      if (data.loaded.communities && item.communityId) {
        item.community = Helpers.getCommunityById(item.communityId, data);
        // check if that group is in the user's area
        var area = Helpers.getAreaById(item.community.areaId, data);
        if (area.id !== data.status.area) {
          return false; // filter this entry if item is not in the area
        }
      }

      return true;

    }.bind(this));

    var whatsnewItem = function(item) {
      return ( <Listitem key={item.id} item={item} data={data} onClickHandler={this.onClickSelectItem}></Listitem> );
    }.bind(this);

    var Component = {};
    if (list.length === 0) {
      // no events found
      Component = 
      <Row>
        <Col className="container text-center box white half">
          <h2><FormattedMessage id='nowhatsnew' values={{areaName: data.area.name}}/></h2>
        </Col>
      </Row>;
    }
    else {
      Component = <Row>{list.map(whatsnewItem,this)}</Row>;
    }

    var header = <div className="container text-center">
          <h1><FormattedMessage id='whatsnew_in' values={{areaName: data.area.name}}/></h1>
        </div>;

    return (
      <div className="container top-buffer news">
        {Component}
      </div>
    );
  }
});
