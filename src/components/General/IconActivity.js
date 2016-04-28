import React from 'react';
import SvgIcon from 'react-svg-icons';
import classNames from 'classnames';

import Icon from './Icon';

export default React.createClass({

  render() {
    
    var icon = 'activity-' + (this.props.type.icon || 'book');

    return (
      <Icon type={icon} area={this.props.area} fill={this.props.fill} size={this.props.size}>
      </Icon>
    );

  }
});

