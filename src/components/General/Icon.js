import React from 'react';
import SvgIcon from 'react-svg-icons';
import classNames from 'classnames';

var colors = {

  default: {

    inactiveIconColor: '#FFF',
    inactiveBackgroundColor: '',

    iconColor: '#823FC2',
    backgroundColor: '#FFF',

  },

  menu: {

    inactiveIconColor: '#823FC2',
    inactiveBackgroundColor: '#FFF',

    iconColor: '#FFF',
    backgroundColor: '#823FC2',

  },

  help: {

    inactiveIconColor: '#B744B8',
    inactiveBackgroundColor: '#FFF',

    iconColor: '#B744B8',
    backgroundColor: '#FFF',

  },

  menuitem: {

    inactiveIconColor: '#b3b3b3',
    inactiveBackgroundColor: '',

    iconColor: '#823FC2',
    backgroundColor: '',

  },

  menuitemstart: {

    inactiveIconColor: '#FFF',
    inactiveBackgroundColor: '',

    iconColor: '#FFF',
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

    var iconColor = colorPalette.iconColor;
    var backgroundColor = colorPalette.backgroundColor;

    if (this.props.isActive === false) {
      iconColor = colorPalette.inactiveIconColor;
      backgroundColor = colorPalette.inactiveBackgroundColor;
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

