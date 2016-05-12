import React from 'react';
import classNames from 'classnames';
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';

import Helpers from '../../stores/Helpers.js';

import { FormattedMessage } from 'react-intl';

export default React.createClass({

  render() {
    
    var data = this.props.data;

    var area = this.props.area;

    var countCommunities = area.communitiesId.length;

    var countMembers = area.countMembers;

    var ownersName = [];

    area.ownersId.map(function(ownerId) {
      ownersName.push(Helpers.getPersonById(ownerId, data).name);
    });

    var buttonClass = classNames( 'padded top-buffer',
      {
        'active': area.id === data.status.area
      }
    );

    var organisers = <p><FormattedMessage id='organisedby' values={{name: ownersName.join(', ')}}/></p>;
    var members = <p><FormattedMessage id='numberofmembers' values={{num: countMembers}}/></p>
    var communities = <p><FormattedMessage id='numberofcommunities' values={{num: countCommunities}}/></p>

    return (
      <p>
        <Button bsSize="large" className={buttonClass} onClick={this.props.onClickHandler.bind(null, area.id)}>{area.name}</Button>
      </p>
    );
  }
});
