import React from 'react';
import SvgIcon from 'react-svg-icons';
import classNames from 'classnames';

var colors = {
  whatsnew: {
    backgroundColor: '#F6F6F6',
    iconColor: '#77529D',
    solidIconColor: '#FFF'
  },
  agenda: {
    backgroundColor: '#F6F6F6',
    iconColor: '#77529D',
    solidIconColor: '#FFF'
  },
  photos: {
    backgroundColor: '#F6F6F6',
    iconColor: '#77529D',
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
    if (this.props.area && colors[this.props.area]) {
      backgroundColor = colors[this.props.area].backgroundColor;
      iconColor = colors[this.props.area].iconColor;
      if (this.props.fill === 'solid') {
        iconColor = colors[this.props.area].solidIconColor;
      }
    }

    var backgroundShape = this.props.shape || 'circle';
    var iconType = this.props.type || 'activity-hiking';

    var divClass = classNames('icon', {
      small: this.props.size === 'small'
    });

    var backgroundElement = <SvgIcon name={'background-' + backgroundShape} color={backgroundColor}/>;


    return (
      <span className={divClass}>
        <span className="inner">
          <SvgIcon name={iconType} color={iconColor}/>
        </span>
      </span>
    );
  }
});

