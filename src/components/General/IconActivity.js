import React from 'react';
import SvgIcon from 'react-svg-icons';
import classNames from 'classnames';

import Icon from './Icon';

export default React.createClass({

  render() {
    
    var icon = 'activity-' + (this.props.type.icon || 'default');

    return (
      <Icon type={icon} area={this.props.area} isOnSolid={this.props.isOnSolid} size={this.props.size}>
      </Icon>
    );

  }
});

