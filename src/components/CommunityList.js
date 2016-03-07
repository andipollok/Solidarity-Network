import React from 'react';
import classNames from 'classnames';
import { Col, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import Helpers from '../stores/Helpers.js';

import { FormattedMessage } from 'react-intl';

export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language')],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this)) {
      return <div></div>;
    }

    var countGroups = 0;
    if (this.props.data && this.props.data.groupIds) {
      countGroups = this.props.data.groupIds.length;
    }

    var countMembers = 0;
    if (this.props.data && this.props.data.countMembers) {
      countMembers = this.props.data.countMembers;
    }

    var ownerName = Helpers.getPersonById(this.props.data.ownerId, this).name;

    var divClass = classNames( 'box white linked padded text-center',
      {
        'selected': this.props.data.id === this.props.selected
      }
    );

    return (
      <Col md={4} className="bottom-buffer" onClick={this.props.onClickHandler.bind(null, this.props.data.id)}>
        <div className={divClass}>
          <h2>{this.props.data.name}</h2>
          <p><FormattedMessage id='organisedby' values={{name: ownerName}}/></p>
          <p><FormattedMessage id='numberofmembers' values={{numMembers: countMembers}}/></p>
          <p><FormattedMessage id='numberofgroups' values={{numGroups: countGroups}}/></p>
        </div>
      </Col> 
    );
  }
});
