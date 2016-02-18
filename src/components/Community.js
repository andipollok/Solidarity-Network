import React from 'react';

import cookie from 'react-cookie';
var classNames = require('classnames');

export default class extends React.Component {
onClickHandlerMine() {
  console.log("clicked in child");
}
  render() {
    var groupText;
    var countGroups = this.props.data.groups.length;
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

    var divClass = classNames( 'col-md-4', 'box', 'white', 'linked', 'padded', 'centered',
      {
        'selected': this.props.data.id == this.props.selected
      }
    );

    return (
      <div className={divClass} onClick={this.props.onClickHandler.bind(this, this.props.data.id)}>
          <h2>{this.props.data.name}</h2>
          <p>Organised by {this.props.data.owner}</p>
          <p>{membersText}</p>
          <p>{groupText}</p>
      </div> 
    );
  }
};
