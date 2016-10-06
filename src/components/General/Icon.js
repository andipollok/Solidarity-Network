import React from 'react';
import SvgIcon from 'react-svg-icons';
import classNames from 'classnames';

var colors = {

  start: {
    hasBackground: false,
    iconColor: '#FFF',
    solidIconColor: '#FFF',
    inactiveColor: '#b3b3b3',
    navColor: '#1d3faf'
  },

  default: {
    hasBackground: true,
    iconColor: '#823FC2',
    solidIconColor: '#823FC2',
    inactiveColor: '#b3b3b3',
    navColor: '#1d3faf'
  },

}

export default React.createClass({

  render() {
    
    var data = this.props.data;

    var noHTML = this.props.noHTML || false;
    
    // select background color and iconColor based on area (whatsnew, agenda or photos)
    var colorPalette = colors['default'];
    if (data && data.status && data.status.page && colors[data.status.page]) {
      colorPalette = colors[data.status.page];
    }

    var hasBackground = colorPalette.hasBackground;
    //var backgroundColor = colorPalette.backgroundColor;
    var iconColor = colorPalette.iconColor;

    // if fill parameter is solid (has solid background), then choose different icon color
    if (this.props.isOnSolid === true) {
      iconColor = colorPalette.solidIconColor;
    }

    if (this.props.isNav === true) {
      iconColor = colorPalette.navColor;
    }

    if (this.props.isActive === false) {
      iconColor = colorPalette.inactiveColor;
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

    if (noHTML) {

      return ( <SvgIcon name={`${folder}/${size}/${name}`} color={iconColor}/> );

    } else {
      
      return (
        <span className={divClass}>
          <SvgIcon name={`${folder}/${size}/${name}`} color={iconColor}/>
        </span>
      );

    }
  }
});

