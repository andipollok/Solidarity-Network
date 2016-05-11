import React from 'react';
import { Link }  from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../../stores/DataActions';
import DataStore from '../../stores/DataStore';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';

import AreaList from './AreaList';


export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data'), Reflux.connect(StatusStore, 'status')],

  componentDidMount() {
    DataActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  onClickSelectArea(id) {
    StatusActions.setArea(id);
  },

  render() {

    var data = this.props.data;

    var areaItem = function(area) {
      return ( <AreaList key={area.id} data={area} selected={data.status.area} onClickHandler={this.onClickSelectArea}></AreaList> );
    }.bind(this);

    var selectArea = <span>{data.areas.map(areaItem, this)}</span>

    return (
      <div className="container">
        <Row>
          {selectArea}
        </Row>
      </div>
    );
  }
});
