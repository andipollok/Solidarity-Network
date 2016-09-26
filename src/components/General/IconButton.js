import React from 'react';

import classNames from 'classnames';

// A component used to represent buttons with an icon
// Properties:
// - labelAlignment = left / center / right
// - iconPosition = left / right
// - isActive = true / false
// - label = [string]

const iconFrameCircleRadius = 20;

const labelWidth = 180;
const labelHeight = 40;
const labelFrameCornerRadius = 20;

const labelFontSize = 16;
const textHorizMargin = 10;

const solidarityPurple = "#823FC2";

const defaultPassiveIconStrokeColor = solidarityPurple;
const defaultPassiveIconBackground = "white";
const defaultPassiveLabelTextColor = solidarityPurple;
const defaultPassiveLabelBackground = "transparent";
const defaultPassiveFramesColor = solidarityPurple;

const defaultActiveIconStrokeColor = solidarityPurple;
const defaultActiveIconBackground = "white";
const defaultActiveLabelTextColor = "white";
const defaultActiveLabelBackground = solidarityPurple;
const defaultActiveFramesColor = solidarityPurple;

const defaultStrokeWidth = 2;

// const componentBackgroundColor = "rgba(255,255,255,.1)"; // For debugging
const componentBackgroundColor = "transparent"; // For production

export default React.createClass({

  // shouldComponentUpdate: function(nextProps, nextState) {
  //   return false;
  // },

  drawLabel( x, y, active, showLabel, label, radius, bulletFontSize, labelFontSize, labelPadding ) {
  },

  drawIcon( x, y, active, showLabel, label, radius, bulletFontSize, labelFontSize, labelPadding ) {

    // if (showLabel) {
      
    //   return <g>
    //     <circle cx={x} cy={y} r={radius} stroke={defaultColor} strokeWidth={defaultStrokeWidth} fill={active ? defaultColor : "none" } />
    //     <text x={x} y={y} textAnchor="middle" fill={ active ? activeColor : defaultColor } fontSize={bulletFontSize} dy=".32em" dx="-.025em" lineHeight="1em">{label}</text>
    //     <text x={x + radius + labelPadding} y={y} fill="white" fontSize={labelFontSize} fontWeight="200" dy=".32em" lineHeight="1em">Part</text>
    //   </g>

    // } else {
      
    //   return <g>
    //     <circle cx={x} cy={y} r={radius} stroke={defaultColor} strokeWidth={defaultStrokeWidth} fill={active ? defaultColor : "none" } />
    //     <text x={x} y={y} textAnchor="middle" fill={ active ? activeColor : defaultColor } fontSize={bulletFontSize} dy=".32em" dx="-.025em" lineHeight="1em">{label}</text>
    //   </g>

    // }

  },

  render() {
    
    //
    // Collecting the Props
    //

    let labelAlignment = this.props.labelAlignment || 'left';
    let iconPosition = this.props.iconPosition || 'left';
    let isActive = this.props.isActive || false;
    let label = this.props.label || "";

    //
    // Starting the math
    //

    let svgPadding = defaultStrokeWidth;
    let svgWidth = labelWidth + iconFrameCircleRadius + 2 * defaultStrokeWidth;
    let svgHeight = Math.max( labelHeight, 2 * iconFrameCircleRadius ) + 2 * defaultStrokeWidth;
    let svgWidthWithPadding = svgWidth + 2 * svgPadding;
    let svgHeightWithPadding = svgHeight + 2 * svgPadding;

    let svgDimensions = "0 0 " + svgWidth + " " + svgHeight;

    let rectX = svgPadding;
    let rectY = svgPadding;

    switch (iconPosition) {
      case 'right':
        // you're good
        break;
      case 'left':
      default:
        //rectX = svgPadding + iconFrameCircleRadius;
        rectX = svgWidth - svgPadding - labelWidth;
        break;
    }

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

    let currentIconStrokeColor = isActive ? defaultActiveIconStrokeColor : defaultPassiveIconStrokeColor;
    let currentIconBackground = isActive ? defaultActiveIconBackground : defaultPassiveIconBackground;
    let currentLabelTextColor = isActive ? defaultActiveLabelTextColor : defaultPassiveLabelTextColor;
    let currentLabelBackground = isActive ? defaultActiveLabelBackground : defaultPassiveLabelBackground;
    let currentFramesColor = isActive ? defaultActiveFramesColor : defaultPassiveFramesColor;

    //
    // Rendering
    //

    return (
      <span>
        <svg preserveAspectRatio="xMidYMid meet" name="button" viewBox={svgDimensions} width={svgWidthWithPadding} height={svgHeightWithPadding}>
          <title>button</title>
          
          <rect x={rectX} y={rectY} width={labelWidth} height={labelHeight} rx={labelFrameCornerRadius} fill={currentLabelBackground} stroke={currentFramesColor} strokeWidth={defaultStrokeWidth}></rect>
          
          <text x={textX} y={textY} textAnchor={labelTextAnchor} fill={currentLabelTextColor} fontSize={labelFontSize} dy=".32em" dx="-.025em" lineHeight="1em">{label}</text>

          <circle cx={iconX} cy={iconY} r={iconFrameCircleRadius} stroke={currentIconStrokeColor} strokeWidth={defaultStrokeWidth} fill={currentIconBackground} />

        </svg>
      </span>
    );
  }
});

