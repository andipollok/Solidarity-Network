import React from 'react';
import SvgIcon from 'react-svg-icons';
import classNames from 'classnames';

var colors = {
  news: {
    backgroundColor: '#F6F6F6',
    iconColor: '#e62719',
    solidIconColor: '#FFF'
  },
  activities: {
    backgroundColor: '#F6F6F6',
    iconColor: '#5CDAC3',
    solidIconColor: '#FFF'
  },
  stories: {
    backgroundColor: '#F6F6F6',
    iconColor: '#40bf4d',
    solidIconColor: '#FFF'
  },
  default: {
    backgroundColor: '#F6F6F6',
    iconColor: '#999',
    solidIconColor: '#FFF'
  },
  secondaryinfo: {
    iconColor: '#b3b3b3'    
  }
}
var inactiveColor = '#b3b3b3';

export default React.createClass({

  render() {
    
    var backgroundColor = colors['default'].backgroundColor;
    var iconColor = colors['default'].iconColor;

    // select background color and iconColor based on area (whatsnew, agenda or photos)
    if (this.props.area && colors[this.props.area]) {
      backgroundColor = colors[this.props.area].backgroundColor;
      iconColor = colors[this.props.area].iconColor;
      // if fill parameter is solid (has solid background), then choose different icon color
      if (this.props.isOnSolid === true) {
        iconColor = colors[this.props.area].solidIconColor;
      }
    }
    if (this.props.isNav === true) {
      iconColor = '#1d3faf';
    }
    if (this.props.isActive === false) {
      iconColor = inactiveColor;
    }

    var divClass = classNames('icon', {
      small: this.props.size === 'small',
      medium: this.props.size === 'medium'
    });

    var folder = this.props.folder || 'activities';
    var size = this.props.size || 'large';
    var iconType = this.props.type || 'hiking';
    name = `alo_${folder}-${iconType}-${size}`;

    return (
      <span className={divClass}>
        <SvgIcon name={`${folder}/${size}/${name}`} color={iconColor}/>
      </span>
    );
  }
});

