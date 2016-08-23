import React from 'react';
import { Link }  from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../../stores/DataActions';
import DataStore from '../../stores/DataStore';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import LoginStore from '../../stores/LoginStore';

import AreaList from './AreaList';


export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data'), Reflux.connect(StatusStore, 'status')],

  componentDidMount() {
    StatusActions.forceTrigger();
  },

  onClickSelectArea(id) {
    StatusActions.setArea(id);
    StatusActions.forceTrigger();
    console.log("current user");
    console.log(LoginStore.getCurrentUser());
    // DataActions.updateArea(  );
  },

  render() {

    var data = this.props.data;

    var areaItem = function(area) {
      return ( <AreaList
          key={area.id}
          data={data}
          area={area}
          onClickHandler={this.onClickSelectArea}
          />
          );
    }.bind(this);

    return (
      <span>{data.areas.map(areaItem, this)}</span>
    );
  }
});
