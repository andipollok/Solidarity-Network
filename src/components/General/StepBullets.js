import React from 'react';
// import SvgIcon from 'react-svg-icons';
import classNames from 'classnames';

// A component used to represent steps or linked elements
// Properties:
// - horizontal / vertical
// - small / big
// - numbered bullets / not
// - linked bullets / not
// - with labels / not

// var colors = {
//   splash: {
//     backgroundColor: '#F6F6F6',
//     iconColor: '#FFF',
//     solidIconColor: '#FFF'
//   },
//   news: {
//     backgroundColor: '#F6F6F6',
//     iconColor: '#e62719',
//     solidIconColor: '#FFF'
//   },
//   activities: {
//     backgroundColor: '#F6F6F6',
//     iconColor: '#5CDAC3',
//     solidIconColor: '#FFF'
//   },
//   stories: {
//     backgroundColor: '#F6F6F6',
//     iconColor: '#40bf4d',
//     solidIconColor: '#FFF'
//   },
//   default: {
//     backgroundColor: '#F6F6F6',
//     iconColor: '#999',
//     solidIconColor: '#FFF'
//   },
//   secondaryinfo: {
//     iconColor: '#b3b3b3'
//   }
// }
// var inactiveColor = '#b3b3b3';

const bulletSizeRadius_Small = 3;
const bulletSizeRadius_Big = 5.2;
const bulletFontSize_Small = 3;
const bulletFontSize_Big = 5;
const labelPadding_Small = 2;
const labelPadding_Big = 4;
const labelFontSize_Small = 3;
const labelFontSize_Big = 4.5;
const defaultColor = "white";
const activeColor = "#8A42CD";

export default React.createClass({

  // shouldComponentUpdate: function(nextProps, nextState) {
  //   return false;
  // },

  // getInitialState() {
  //   return {
  //     step: 1
  //   };
  // },

  bullet( x, y, active, showLabel, radius, bulletFontSize, labelFontSize, labelPadding ) {
    if (showLabel) {
      
      return <g>
        <circle cx={x} cy={y} r={radius} stroke={defaultColor} strokeWidth="0.5" fill={active ? defaultColor : "none" } />
        <text x={x} y={y} textAnchor="middle" fill={ active ? activeColor : defaultColor } fontSize={bulletFontSize} dy=".32em" dx="-.025em" lineHeight="1em">1</text>
        <text x={x + radius + labelPadding} y={y} fill="white" fontSize={labelFontSize} fontWeight="200" dy=".32em" lineHeight="1em">Part</text>
      </g>

    } else {
      
      return <g>
        <circle cx={x} cy={y} r={radius} stroke={defaultColor} strokeWidth="0.5" fill={active ? defaultColor : "none" } />
        <text x={x} y={y} textAnchor="middle" fill={ active ? activeColor : defaultColor } fontSize={bulletFontSize} dy=".32em" dx="-.025em" lineHeight="1em">1</text>
      </g>

    }
  },

  render() {
    
    // NB the size of the bullets is automatic, big or small, you cannot change it with a props...
    // ... but you can provide a width and height for the rendered svg.
    // Please note though that it will affect:
    //  - the PADDING surrounding the group of rendered items,
    //  - the DISTANCE between bullets,
    //  - but not their size.
    let small = this.props.small || false;

    let horizontal = this.props.horizontal || false;
    let numbered = this.props.numbered || true;
    let linked = this.props.linked || true;
    let labels = this.props.labels || false;

    let numberOfBullets = this.props.amount || 2;
    
    let activeBullets = this.props.active || [];

    let radius = small ? bulletSizeRadius_Small : bulletSizeRadius_Big;
    let bulletFontSize = small ? bulletFontSize_Small : bulletFontSize_Big;
    let labelPadding = small ? labelPadding_Small : labelPadding_Big;
    let labelFontSize = small ? labelFontSize_Small : labelFontSize_Big;



    // var backgroundColor = colors['default'].backgroundColor;
    // var iconColor = colors['default'].iconColor;

    // // select background color and iconColor based on area (whatsnew, agenda or photos)
    // if (this.props.area && colors[this.props.area]) {
    //   backgroundColor = colors[this.props.area].backgroundColor;
    //   iconColor = colors[this.props.area].iconColor;
    //   // if fill parameter is solid (has solid background), then choose different icon color
    //   if (this.props.isOnSolid === true) {
    //     iconColor = colors[this.props.area].solidIconColor;
    //   }
    // }
    // if (this.props.isNav === true) {
    //   iconColor = '#1d3faf';
    // }
    // if (this.props.isActive === false) {
    //   iconColor = inactiveColor;
    // }

    // var divClass = classNames('icon', {
    //   small: this.props.size === 'small',
    //   medium: this.props.size === 'medium'
    // });

    // var folder = this.props.folder || 'activities';
    // var size = this.props.size || 'large';
    // var iconType = this.props.type || 'hiking';
    // name = `alo_${folder}-${iconType}-${size}`;

    // return (
    //   <span className={divClass}>
    //     <SvgIcon name={`${folder}/${size}/${name}`} color={iconColor}/>
    //   </span>
    // );

    

    let bullets = this.bullet( 20, 20, true, true, radius, bulletFontSize, labelFontSize, labelPadding );

    var width = this.props.width || 0;
    var height = this.props.width || 0;

    var svgDimensions = "0 0 40 100";

    return (
      <span>
        <svg preserveAspectRatio="xMidYMid meet" name="service/medium/alo_service-activity-medium" viewBox={svgDimensions}>
          <title>alo_service</title>
          
          <rect x="0" y="0" width="40" height="200" fill="rgba(255,255,255,.1)"></rect>
          
          <line x1="20" y1={20 + radius} x2="20" y2={40 - radius} stroke="white" strokeWidth="0.5"></line>

          {bullets}
          
          </svg>
      </span>
    );
  }
});

