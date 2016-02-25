import React from 'react';
import SvgIcon from 'react-svg-icons';

var colors = {
  whatsnew: {
    backgroundColor: '#ED695A',
    iconColor: '#FFF'
  },
  agenda: {
    backgroundColor: '#77529D',
    iconColor: '#FFF'
  },
  photos: {
    backgroundColor: '#62BA6B',
    iconColor: '#FFF'
  },
  default: {
    backgroundColor: '#CCC',
    iconColor: '#FFF'
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
    var iconType = this.props.type || 'hiking';

    return (
      <div className="icon">
        <span className="inner">
          <SvgIcon name={'background-' + backgroundShape} color={backgroundColor}/>
          <SvgIcon name={'activity-' + iconType} color={iconColor}/>
        </span>
      </div>
    );
  }
});

