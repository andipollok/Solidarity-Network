import React from 'react';
import classNames from 'classnames';
import { Link }  from 'react-router';
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap';

import Helpers from '../../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Icon from '../General/Icon';
import IconActivity from '../General/IconActivity';
import Avatar from '../General/Avatar';

export default React.createClass({

  render() {

    var data = this.props.data;
    var item = this.props.item;

    var link = '';
    var icon = '';

    if(item.activity && item.activity.id) {
      var type = Helpers.getActivityTypeById(item.activity.typeId, data);
      link = 'activity/' + item.activity.id;
      icon = <IconActivity type={type} area='news' shape='empty' size='small'/>
    }
    else if (item.community && item.community.id) {
      link = 'community/' + item.community.id;
      icon = <Icon type='activity-default' area='news' shape='empty' size='small'/>
    }

    if (link) {
      var componentLink = <a onClick={this.props.onClickHandler.bind(null, link)}>Open</a>;
    }

    var date = <p>
            <span className="grey"><FormattedRelative value={item.date} /></span>
          </p>;

    return (

      <Row>

        <Col md={12} className="bottom-buffer">

          <div className="box">

              <span className="cell align-top">{icon}</span>

              <span className="cell align-top"><Avatar imageUrl={item.person.pictureUrl} size='small'/></span>            

              <span className="cell padding-left">

                <FormattedMessage id={ 'news-' + item.type.replace(/\s+/g, '') } values={{
                  personName: item.person.name,
                  activityName: item.activity.name || '',
                  communityName: item.community.name || '',
                }} defaultMessage=' '/>
              </span>
              
              <span className="cell padding-left">
              
                {componentLink}

              </span>

          </div>

        </Col>

      </Row>
    );
  }
});
