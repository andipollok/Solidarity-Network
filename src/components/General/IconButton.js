import React from 'react';

import classNames from 'classnames';

import Icon from '../General/Icon';

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


var labelWidth;

const labelHeight = 38.5;
const labelFrameCornerRadius = labelHeight / 2;

const iconFrameCircleRadius = labelHeight/2;

const labelFontSize = 16;
const textHorizMargin = 10;

const defaultStrokeWidth = 1.5;

const color1 = "#823FC2";
const color2 = "#5CDAC3";
const color_light = "#FFFFFF";
const color_grey = "#A6A6A6";
const color_help = "#B744B8";
const color_transparent = "transparent"; 

var colors = {

  start: {
    labelText: color_light,
    labelStroke: color_light,
    labelBackground: color_transparent
  },

  startInactive: {
    labelText: color_grey,
    labelStroke: color_grey,
    labelBackground: color_transparent
  },

  default: {
    labelText: color2,
    labelStroke: color2,
    labelBackground: color_transparent
  },

  defaultInactive: {
    labelText: color_grey,
    labelStroke: color_grey,
    labelBackground: color_transparent
  },

  help: {
    labelText: color_help,
    labelStroke: color_help,
    labelBackground: color_light
  },

  submenu: {
    labelText: color_light,
    labelStroke: color1,
    labelBackground: color1
  },

  submenuInactive: {
    labelText: color1,
    labelStroke: color1,
    labelBackground: color_light
  },

  disabled: {
    labelText: color_light,
    labelStroke: color_grey,
    labelBackground: color_grey
  },

  disabledInactive: {
    labelText: color_grey,
    labelStroke: color_grey,
    labelBackground: color_light
  }

}

export default React.createClass({

  render() {
    
    labelWidth = 150; // 'small'
    switch (this.props.size) {
      case 'wide':
        labelWidth = 300;
        break;
      case 'medium':
        labelWidth = 200;
        break;
      case 'small':
      default:
        labelWidth = 150;
        break;
    };

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

    // let svgPadding = defaultStrokeWidth / 2;
    let svgPadding = 0;
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

    if (isActive === false && colors[color + 'Inactive']) {
      colorData = colors[color + 'Inactive'];
    }
    

    //
    // Rendering
    //

    return (
      <div className="iconButton">
        <svg preserveAspectRatio="xMidYMid meet" name="button" viewBox={svgDimensions} width={svgWidthWithPadding} height={svgHeightWithPadding}>

          <title>button</title>
          
          <rect x={rectX} y={rectY} width={labelWidth} height={labelHeight} rx={labelFrameCornerRadius} fill={colorData.labelBackground} stroke={colorData.labelStroke} strokeWidth={defaultStrokeWidth}></rect>
          
          <text x={textX} y={textY} textAnchor={labelTextAnchor} fill={colorData.labelText} fontSize={labelFontSize} dy=".32em" dx="-.025em" lineHeight="1em">{label}</text>

        </svg>

        <div className={iconPosition}>
          <Icon 
            type={this.props.type}
            folder={this.props.folder}
            size='small'
            color={this.props.color}
            isActive={this.props.isActive} />
        </div>

      </div>
    );
  }
});

