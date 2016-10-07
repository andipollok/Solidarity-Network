import React from 'react';

import classNames from 'classnames';

// A component used to represent buttons with an icon
// Properties:
// - labelAlignment = left / center / right
// - iconPosition = left / right
// - isActive = true / false
// - label = [string]

// 
// Buttons can have four states:
//  - enabled and not selected ( = clickable ),
//  - enabled and selected ( = clickable & highlighted ),
//  - disabled but visible ( = grayed, not clickable ),
//  - invisible ( = not displayed at all )
//

const iconFrameCircleRadius = 20;

const labelWidth = 150;
const labelHeight = 40;
const labelFrameCornerRadius = 20;

const labelFontSize = 16;
const textHorizMargin = 10;

const color1 = "#823FC2";
const color2 = "#5CDAC3";
const color_light = "#FFFFFF";
const color_grey = "#A6A6A6";
const color_help = "#B744B8";
const color_transparent = "transparent"; 

var colors = {

  // White
  // buttons on gradient background in start
  start: {
    iconStroke: color_light,
    iconBackground: color_transparent,
    labelText: color_light,
    labelBackground: color_transparent,
    labelStroke: color_light 
  },
  // Green
  // back button
  default: {
    iconStroke: color2,
    iconBackground: color_transparent,
    labelText: color2,
    labelBackground: color_transparent,
    labelStroke: color2 
  },

  defaultInactive: {
    iconStroke: color_grey,
    iconBackground: color_transparent,
    labelText: color_grey,
    labelBackground: color_transparent,
    labelStroke: color_grey
  },
  // Purple
  // buttons on all screens in navigation
  menu: {
    iconStroke: color1,
    iconBackground: color_light,
    labelText: color_light,
    labelBackground: color1,
    labelStroke: color1
  },

  menuInactive: {
    iconStroke: color1,
    iconBackground: color_light,
    labelText: color1,
    labelBackground: color_light,
    labelStroke: color1
  },

  help: {
    iconStroke: color_help,
    iconBackground: color_light,
    labelText: color_help,
    labelBackground: color_light,
    labelStroke: color_help
  }

  // active: {
  //   iconStroke: color_light,
  //   iconBackground: color1,
  //   labelText: color_light,
  //   labelBackground: color1,
  //   labelStroke: color1 
  // },
  // passive: {
  //   iconStroke: color_light,
  //   iconBackground: color1,
  //   labelText: color_light,
  //   labelBackground: color1,
  //   labelStroke: color1 
  // }
}


/*const defaultPassiveIconStrokeColor = solidarityPurple;
const defaultPassiveIconBackground = "transparent";
const defaultPassiveLabelTextColor = solidarityPurple;
const defaultPassiveLabelBackground = "transparent";
const defaultPassiveFramesColor = solidarityPurple;

const defaultActiveIconStrokeColor = solidarityPurple;
const defaultActiveIconBackground = "white";
const defaultActiveLabelTextColor = "white";
const defaultActiveLabelBackground = solidarityPurple;
const defaultActiveFramesColor = solidarityPurple;


const gradientBgActiveIconStrokeColor = "white";
const gradientBgActiveIconBackground = "transparent";
const gradientBgActiveLabelTextColor = "white";
const gradientBgActiveLabelBackground = "transparent";
const gradientBgActiveFramesColor = "transparent";

const gradientBgPassiveIconStrokeColor = "#A6A6A6";
const gradientBgPassiveIconBackground = "transparent";
const gradientBgPassiveLabelTextColor = "#A6A6A6";
const gradientBgPassiveLabelBackground = "transparent";
const gradientBgPassiveFramesColor = "transparent";*/

const defaultStrokeWidth = 2;

export default React.createClass({

  render() {
    
    //
    // Collecting the Props
    //

    let labelAlignment = this.props.labelAlignment || 'left';
    let iconPosition = this.props.iconPosition || 'left';
    let isActive = this.props.isActive || false;
    let color = this.props.color || "default";
    let label = this.props.label || "";

    //
    // Starting the math
    //

    let svgPadding = defaultStrokeWidth / 2;
    let svgWidth = labelWidth + defaultStrokeWidth;
    let svgHeight = Math.max( labelHeight, 2 * iconFrameCircleRadius ) + defaultStrokeWidth;
    let svgWidthWithPadding = svgWidth + 2 * svgPadding;
    let svgHeightWithPadding = svgHeight + 2 * svgPadding;

    let svgDimensions = "0 0 " + svgWidth + " " + svgHeight;

    let rectX = svgPadding;
    let rectY = svgPadding;

    let labelTextAnchor = "middle";
    let textX = rectX + 0.5 * labelWidth;
    let textY = rectY + 0.5 * labelHeight;

    // if (labelAlignment) {} // TODO test if null

    switch (labelAlignment) {
      case 'right':
        labelTextAnchor = 'end';
        textX = rectX + labelWidth - labelFrameCornerRadius - iconFrameCircleRadius - textHorizMargin;
        break;
      case 'center':
        labelTextAnchor = 'middle';
        break;
      case 'left':
      default:
        labelTextAnchor = 'start';
        textX = rectX + labelFrameCornerRadius + iconFrameCircleRadius + textHorizMargin;
        break;
    }

    let iconX = rectX + labelFrameCornerRadius;
    let iconY = rectY + 0.5 * labelHeight;

    switch (iconPosition) {
      case 'right':
        iconX = rectX + labelWidth - labelFrameCornerRadius;
        break;
      case 'left':
      default:
        // you're good
        break;
    }


    //
    // Styling
    //

    var colorData = colors['default'];
    if (colors[color]) {
      colorData = colors[color];
    }

    // let currentIconStrokeColor = isActive ? defaultActiveIconStrokeColor : defaultPassiveIconStrokeColor;
    // let currentIconBackground = isActive ? defaultActiveIconBackground : defaultPassiveIconBackground;
    // let currentLabelTextColor = isActive ? defaultActiveLabelTextColor : defaultPassiveLabelTextColor;
    // let currentLabelBackground = isActive ? defaultActiveLabelBackground : defaultPassiveLabelBackground;
    // let currentLabelStroke = isActive ? defaultActiveFramesColor : defaultPassiveFramesColor;
    if (isActive === false && colors[color + 'Inactive']) {
      colorData = colors[color + 'Inactive'];
    }

    //
    // Rendering
    //

    return (
      <span>
        <svg preserveAspectRatio="xMidYMid meet" name="button" viewBox={svgDimensions} width={svgWidthWithPadding} height={svgHeightWithPadding}>

          <title>button</title>
          
          <rect x={rectX} y={rectY} width={labelWidth} height={labelHeight} rx={labelFrameCornerRadius} fill={colorData.labelBackground} stroke={colorData.labelStroke} strokeWidth={defaultStrokeWidth}></rect>
          
          <text x={textX} y={textY} textAnchor={labelTextAnchor} fill={colorData.labelText} fontSize={labelFontSize} dy=".32em" dx="-.025em" lineHeight="1em">{label}</text>

          <circle cx={iconX} cy={iconY} r={iconFrameCircleRadius} stroke={colorData.iconStroke} strokeWidth={defaultStrokeWidth} fill={colorData.iconBackground} />

        </svg>
      </span>
    );
  }
});

