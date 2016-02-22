import React from 'react';
import classNames from 'classnames';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';


export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data')],

  render() {
    var groupText;
    var countGroups = 0;
    if (this.props.data && this.props.data.groups) {
      countGroups = this.props.data.groups.length;
    }
    if (countGroups == 0) {
      groupText = "No groups yet.";
    } else if (countGroups == 1) {
      groupText = countGroups + " group";
    }
    else {
      groupText = countGroups + " groups";
    }

    var membersText;
    var countMembers = this.props.data.countMembers;
    if (countMembers == 0) {
      membersText = "No members yet.";
    } else if (countMembers == 1) {
      membersText = countMembers + " member";
    }
    else {
      membersText = countMembers + " members";
    }

    var owner = "";
    if (this.state.data && this.state.data.loaded.people) {
      owner = this.state.data.people[this.props.data.owner].name;
    }

    var divClass = classNames( 'col-md-4', 'box', 'white', 'linked', 'padded', 'centered',
      {
        'selected': this.props.data.id == this.props.selected
      }
    );

    return (
      <div className={divClass} onClick={this.props.onClickHandler.bind(null, this.props.data.id)}>
          <h2>{this.props.data.name}</h2>
          <p>Organised by {owner}</p>
          <p>{membersText}</p>
          <p>{groupText}</p>
      </div> 
    );
  }
});
