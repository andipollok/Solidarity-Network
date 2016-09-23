import React from 'react';

import classNames from 'classnames';

// A component used to represent buttons with an icon
// Properties:
// - labelAlignment = left / center / right
// - iconPosition = left / right
// - isActive = true / false
// - label = [string]

const iconFrameCircleRadius = 30;

const labelWidth = 180;
const labelHeight = 40;
const labelFrameCornerRadius = 20;

const labelFontSize = 16;

const solidarityPurple = "#823FC2";

const defaultPassiveIconStrokeColor = solidarityPurple;
const defaultPassiveIconBackground = "transparent";
const defaultPassiveLabelTextColor = solidarityPurple;
const defaultPassiveLabelBackground = "transparent";
const defaultPassiveFramesColor = solidarityPurple;

const defaultActiveIconStrokeColor = solidarityPurple;
const defaultActiveIconBackground = "transparent";
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

  // createBulletItem( bullet ) {        
  //   return this.drawBullet(
  //     bullet[0],
  //     bullet[1],
  //     bullet[2],
  //     bullet[3],
  //     bullet[4],
  //     bullet[5],
  //     bullet[6],
  //     bullet[7],
  //     bullet[8]
  //   );
  // },

  // drawLine( x1, y1, x2, y2 ) {
  //   return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={defaultColor} strokeWidth={defaultStrokeWidth}></line>
  // },

  // createLineItem( line ) {        
  //   return this.drawLine(
  //     line[0],
  //     line[1],
  //     line[2],
  //     line[3]
  //   );
  // },

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

    let svgPadding = 3 * defaultStrokeWidth;
    let svgWidth = labelWidth + iconFrameCircleRadius + 2 * svgPadding;
    let svgHeight = Math.max( labelHeight, 2 * iconFrameCircleRadius ) + 2 * svgPadding;

    let svgDimensions = "0 0 " + svgWidth + " " + svgHeight;

    let rectX = svgPadding;
    let rectY = svgPadding;

    // TODO different math according to the alignment
    let textX = rectX + 0.5 * labelWidth;
    let textY = rectY + 0.5 * labelHeight;

    //
    // Styling
    //

    let currentIconStrokeColor = isActive ? defaultActiveIconStrokeColor : defaultPassiveIconStrokeColor;
    let currentIconBackground = isActive ? defaultActiveIconBackground : defaultPassiveIconBackground;
    let currentLabelTextColor = isActive ? defaultActiveLabelTextColor : defaultPassiveLabelTextColor;
    let currentLabelBackground = isActive ? defaultActiveLabelBackground : defaultPassiveLabelBackground;
    let currentFramesColor = isActive ? defaultActiveFramesColor : defaultPassiveFramesColor;

    let labelTextAnchor = "inherit";
    switch (labelAlignment) {
      case 'right':
        labelTextAnchor = 'end';
        break;
      case 'center':
        labelTextAnchor = 'middle';
        break;
      case 'left':
      default:
        labelTextAnchor = 'start';
        break;
    }

    // let numberOfBulletRows = horizontal ? 1 : numberOfBullets;
    // let numberOfBulletCols = horizontal ? numberOfBullets : 1;

    // let bulletXIncr =  width / ( numberOfBulletCols + 1 )
    // let bulletYIncr = height / ( numberOfBulletRows + 1 )
    // let bulletX0 = bulletXIncr;
    // let bulletY0 = bulletYIncr;

    // // let bullets = "";
    // // for (var i = 0; i < numberOfBullets; i++) {
    // //   let bulletX = bulletX0 + ( horizontal ? ( i * bulletXIncr ) : 0 );
    // //   let bulletY = bulletY0 + ( horizontal ? 0 : ( i * bulletYIncr ) );
    // //   let bulletActive = ( activeBullets.length >= i+1 && activeBullets[i] );
    // //   bullets += this.bullet( bulletX, bulletY, bulletActive, showLabel, radius, bulletFontSize, labelFontSize, labelPadding );
    // //   console.log(bulletX, bulletY, bulletActive, showLabel, radius, bulletFontSize, labelFontSize, labelPadding);
    // // }

    // let bulletsArray = [];
    // let linesArray = [];

    // var prevBulletX, prevBulletY = undefined, undefined;

    // for (let i = 0; i < numberOfBullets; i++) {
      
    //   // Bullet
    //   let bulletX = bulletX0 + ( horizontal ? ( i * bulletXIncr ) : 0 );
    //   let bulletY = bulletY0 + ( horizontal ? 0 : ( i * bulletYIncr ) );
    //   let bulletActive = ( activeBullets.length >= i+1 && activeBullets[i] );
    //   let bulletLabel = i + 1;
    //   bulletsArray.push( [
    //     bulletX,
    //     bulletY,
    //     bulletActive,
    //     showLabel,
    //     bulletLabel,
    //     radius,
    //     bulletFontSize,
    //     labelFontSize,
    //     labelPadding
    //   ] );

    //   // Line if not first bullet (because we need coordinates of bullet N and N+1)
    //   if (i > 0) {
    //     let x1 = horizontal ? ( prevBulletX + radius ) : prevBulletX;
    //     let y1 = horizontal ? prevBulletY : ( prevBulletY + radius );
    //     let x2 = horizontal ? ( bulletX - radius ) : bulletX;
    //     let y2 = horizontal ? bulletY : ( bulletY - radius );
    //     linesArray.push( [
    //       x1, y1, x2, y2
    //     ] );
    //   }

    //   prevBulletX = bulletX;
    //   prevBulletY = bulletY;

    // }



    // for text
    // 

    return (
      <span>
        <svg preserveAspectRatio="xMidYMid meet" name="button" viewBox={svgDimensions} width={svgWidth} height={svgHeight}>
          <title>button</title>
          
          <rect x={rectX} y={rectY} width={labelWidth} height={labelHeight} rx={labelFrameCornerRadius} fill={currentLabelBackground} stroke={currentFramesColor} strokeWidth={defaultStrokeWidth}></rect>
          
          <text x={textX} y={textY} textAnchor={labelTextAnchor} fill={currentLabelTextColor} fontSize={labelFontSize} dy=".32em" dx="-.025em" lineHeight="1em">{label}</text>

        </svg>
      </span>
    );
  }
});

