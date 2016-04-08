import React from 'react';
import SvgIcon from 'react-svg-icons';
import classNames from 'classnames';

var colors = {
  whatsnew: {
    backgroundColor: '#F6F6F6',
    iconColor: '#e62719',
    solidIconColor: '#FFF'
  },
  agenda: {
    backgroundColor: '#F6F6F6',
    iconColor: '#77529D',
    solidIconColor: '#FFF'
  },
  photos: {
    backgroundColor: '#F6F6F6',
    iconColor: '#40bf4d',
    solidIconColor: '#FFF'
  },
  default: {
    backgroundColor: '#F6F6F6',
    iconColor: '#999',
    solidIconColor: '#FFF'
  }
}

export default React.createClass({

  render() {
    
    var backgroundColor = colors['default'].backgroundColor;
    var iconColor = colors['default'].iconColor;

    // select background color and iconColor based on area (whatsnew, agenda or photos)
    if (this.props.area && colors[this.props.area]) {
      backgroundColor = colors[this.props.area].backgroundColor;
      iconColor = colors[this.props.area].iconColor;
      // if fill parameter is solid (has solid background), then choose different icon color
      if (this.props.fill === 'solid') {
        iconColor = colors[this.props.area].solidIconColor;
      }
    }
    if (this.props.active === true) {
      iconColor = colors[this.props.area].solidIconColor;
    }

    var backgroundShape = this.props.shape || 'circle';
    var iconType = this.props.type || 'activity-hiking';

    var divClass = classNames('icon', {
      small: this.props.size === 'small'
    });

    var backgroundElement = <SvgIcon name={'background-' + backgroundShape} color={backgroundColor}/>;


    return (
      <span className={divClass}>
        <SvgIcon name={iconType} color={iconColor}/>
      </span>
    );
  }
});

