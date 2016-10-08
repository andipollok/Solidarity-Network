import React from 'react';
import SvgIcon from 'react-svg-icons';
import classNames from 'classnames';

const color1 = "#823FC2";
const color2 = "#5CDAC3";
const color_light = "#FFF";
const color_grey = "#A6A6A6";
const color_help = "#B744B8";
const color_transparent = "transparent"; 

var colors = {

  start: {
    inactiveIconColor: color_grey,
    inactiveBackgroundColor: '',

    iconColor: color_light,
    backgroundColor: '',
  },

  default: {

    inactiveIconColor: color_grey,
    inactiveBackgroundColor: '',

    iconColor: color2,
    backgroundColor: color_light,

  },

  help: {

    inactiveIconColor: color_help,
    inactiveBackgroundColor: color_light,

    iconColor: color_help,
    backgroundColor: color_light,

  },

  menu: {

    inactiveIconColor: color1,
    inactiveBackgroundColor: color_light,

    iconColor: color_light,
    backgroundColor: color1,

  },

  submenu: {

    inactiveIconColor: color1,
    inactiveBackgroundColor: color_light,

    iconColor: color1,
    backgroundColor: color_light,

  },

  behind: {

    inactiveIconColor: color_grey,
    inactiveBackgroundColor: color_light,

    iconColor: color_grey,
    backgroundColor: color_light,

  },

  filled: {

    inactiveIconColor: color_light,
    inactiveBackgroundColor: '',

    iconColor: color1,
    backgroundColor: color_light,

  },

  menuitem: {

    inactiveIconColor: color_grey,
    inactiveBackgroundColor: '',

    iconColor: color1,
    backgroundColor: '',

  },

  menuitemstart: {

    inactiveIconColor: color_light,
    inactiveBackgroundColor: '',

    iconColor: color_light,
    backgroundColor: '',

  }

}

export default React.createClass({

  render() {
    
    var data = this.props.data;

    var noHTML = this.props.noHTML || false;
    
    // select background color and iconColor based on area (whatsnew, agenda or photos)
    var colorPalette = colors['default'];
    if (this.props && this.props.color && colors[this.props.color]) {
      colorPalette = colors[this.props.color];
    }

    var iconColor = colorPalette.inactiveIconColor;
    var backgroundColor = colorPalette.inactiveBackgroundColor;

    if (this.props.isActive === true) {
      iconColor = colorPalette.iconColor;
      backgroundColor = colorPalette.backgroundColor;
    }

    var divClass = classNames('icon', {
      tiny: this.props.size === 'tiny',
      small: this.props.size === 'small',
      medium: this.props.size === 'medium',
      large: this.props.size === 'large'
    });

    var folder = this.props.folder || 'activities';
    var size = this.props.size || 'large';
    var iconType = this.props.type || 'hiking';
    name = `alo_${folder}-${iconType}-${size}`;

    // only use the option withBorder if you have the same icon with "-nocircle" in the filename
    // currently only used in mainmenu button
    if (this.props.withBorder === false) {
      name = `alo_${folder}-${iconType}-nocircle-${size}`;
    }

    var divStyle = undefined;
    if (backgroundColor) {
      var divStyle = {
        backgroundColor: backgroundColor
      };
    }

    if (noHTML) {

      return ( <SvgIcon name={`${folder}/${size}/${name}`} color={iconColor}/> );

    } else {
      
      return (
        <span className={divClass} style={divStyle}>
          <SvgIcon name={`${folder}/${size}/${name}`} color={iconColor}/>
        </span>
      );

    }

  }
});

