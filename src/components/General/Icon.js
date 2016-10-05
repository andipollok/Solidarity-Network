import React from 'react';
import SvgIcon from 'react-svg-icons';
import classNames from 'classnames';

var colors = {

  start: {
    hasBackground: false,
    iconColor: '#FFF',
    solidIconColor: '#FFF'
  },

  default: {
    hasBackground: true,
    iconColor: '#823FC2',
    solidIconColor: '#823FC2'
  }

}
var inactiveColor = '#b3b3b3';

export default React.createClass({

  render() {
    
    var data = this.props.data;

    var hasBackground = colors['default'].hasBackground;
    var iconColor = colors['default'].iconColor;
    
    // select background color and iconColor based on area (whatsnew, agenda or photos)
    if (data && data.status && data.status.page && colors[data.status.page]) {

      hasBackground = colors[data.status.page].hasBackground;
      iconColor = colors[data.status.page].iconColor;
      // if fill parameter is solid (has solid background), then choose different icon color
      if (this.props.isOnSolid === true) {
        iconColor = colors[data.status.page].solidIconColor;
      }
    }
    if (this.props.isNav === true) {
      iconColor = '#1d3faf';
    }
    if (this.props.isActive === false) {
      iconColor = inactiveColor;
    }

    var divClass = classNames('icon', {
      tiny: this.props.size === 'tiny',
      small: this.props.size === 'small',
      medium: this.props.size === 'medium',
      large: this.props.size === 'large',
      filled: hasBackground
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

