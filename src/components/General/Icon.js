import React from 'react';
import SvgIcon from 'react-svg-icons';
import classNames from 'classnames';

var colors = {
  // splash: {
  //   backgroundColor: '#F6F6F6',
  //   iconColor: '#FFF',
  //   solidIconColor: '#FFF'
  // },
  start: {
    backgroundColor: 'transparent',
    iconColor: '#FFF',
    solidIconColor: '#FFF',
    inactiveColor: '#b3b3b3',
    navColor: '#1d3faf'
  },
  // news: {
  //   backgroundColor: '#F6F6F6',
  //   iconColor: '#e62719',
  //   solidIconColor: '#823FC2'
  // },
  // activities: {
  //   backgroundColor: '#F6F6F6',
  //   iconColor: '#5CDAC3',
  //   solidIconColor: '#823FC2'
  // },
  // stories: {
  //   backgroundColor: '#F6F6F6',
  //   iconColor: '#40bf4d',
  //   solidIconColor: '#823FC2'
  // },
  default: {
    backgroundColor: 'transparent',
    iconColor: '#823FC2',
    solidIconColor: '#823FC2',
    inactiveColor: '#b3b3b3',
    navColor: '#1d3faf'
  },
  // secondaryinfo: {
  //   iconColor: '#b3b3b3'
  // }
}
// var inactiveColor = '#b3b3b3';

export default React.createClass({

  // shouldComponentUpdate: function(nextProps, nextState) {
  //   return false;
  // },

  render() {
    
    var data = this.props.data;
    
    // select background color and iconColor based on area (whatsnew, agenda or photos)
    var colorPalette = colors['default'];
    if (data && data.status && data.status.page && colors[data.status.page]) {
      colorPalette = colors[data.status.page];
    }

    var backgroundColor = colorPalette.backgroundColor;
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

    // iconColor = "#823FC2";

    var divClass = classNames('icon', {
      tiny: this.props.size === 'tiny',
      small: this.props.size === 'small',
      medium: this.props.size === 'medium',
      large: this.props.size === 'large',
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

