import React from 'react';
import SvgIcon from 'react-svg-icons';
import classNames from 'classnames';

import Icon from './Icon';

export default React.createClass({

  render() {
    
    var icon = 'activity-default';
    if (this.props.type && this.props.type.icon) {
      var icon = this.props.type.icon;
    }

    return (
      <Icon
        type={icon}
        folder='activities'
        color='activity'
        size={this.props.size}>
      </Icon>
    );

  }
});

