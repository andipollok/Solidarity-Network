import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import Helpers from '../stores/Helpers.js';

import Icon from './Icon';


export default React.createClass({

  mixins: [ Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language') ],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
  },

  onClickType(id) {
    // window.location.assign("#/activity/" + id);
    console.log("selected type " + id);
    this.props.onSelectType(id);
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || !this.state.data || !this.state.data.loaded.activitytypes) {
      return <div></div>;
    }

    var typeItem = function(type) {
      if (this.props.selectedType === type.id) {
        var selected = "selected";
      }
      return ( 
        <li key={type.id} onClick={this.onClickType.bind(this, type.id)} className="text-center">
          <p><Icon type={'activity-' + type.name} area='agenda' shape='hexagon'/></p>
          <p>{type.name}</p>
          {selected}
        </li>
      );
    }.bind(this);

    return (
      <div className="activity-type-list">
        <ul>
          {this.state.data.activitytypes.map(typeItem)}
        </ul>
      </div>
    );
  }
});
