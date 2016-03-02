import React from 'react';
import SvgIcon from 'react-svg-icons';

var colors = {
  whatsnew: {
    backgroundColor: '#F6F6F6',
    iconColor: '#77529D'
  },
  agenda: {
    backgroundColor: '#F6F6F6',
    iconColor: '#77529D'
  },
  photos: {
    backgroundColor: '#F6F6F6',
    iconColor: '#77529D'
  },
  default: {
    backgroundColor: '#F6F6F6',
    iconColor: '#999'
  }
}

export default React.createClass({

  render() {
    var backgroundColor = colors['default'].backgroundColor;
    var iconColor = colors['default'].iconColor;
    if (this.props.area && colors[this.props.area]) {
      backgroundColor = colors[this.props.area].backgroundColor;
      iconColor = colors[this.props.area].iconColor;
    }
    var backgroundShape = this.props.shape || 'circle';
    var iconType = this.props.type || 'activity-hiking';

    return (
      <div className="icon">
        <span className="inner">
          <SvgIcon name={'background-' + backgroundShape} color={backgroundColor}/>
          <SvgIcon name={iconType} color={iconColor}/>
        </span>
      </div>
    );
  }
});

