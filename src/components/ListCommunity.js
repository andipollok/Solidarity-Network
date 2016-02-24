import React from 'react';
import classNames from 'classnames';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';

import { FormattedMessage } from 'react-intl';

export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data')],

  componentDidMount() {
    DataActions.forceTrigger();
  },

  render() {

    var countGroups = 0;
    if (this.props.data && this.props.data.groups) {
      countGroups = this.props.data.groups.length;
    }

    var countMembers = 0;
    if (this.props.data && this.props.data.countMembers) {
      countMembers = this.props.data.countMembers;
    }

    var owner = "";
    if (this.state.data && this.state.data.loaded.people) {
      owner = this.state.data.people[this.props.data.owner].name;
    }

    var divClass = classNames( 'col-md-4', 'box', 'white', 'linked', 'padded', 'text-center',
      {
        'selected': this.props.data.id == this.props.selected
      }
    );

    return (
      <div className={divClass} onClick={this.props.onClickHandler.bind(null, this.props.data.id)}>
          <h2>{this.props.data.name}</h2>
          <p><FormattedMessage id='organisedby' values={{name: owner}}/></p>
          <p><FormattedMessage id='numberofmembers' values={{numMembers: countMembers}}/></p>
          <p><FormattedMessage id='numberofgroups' values={{numGroups: countGroups}}/></p>
      </div> 
    );
  }
});
