import React from 'react';

// Example
// <StepBullets small={false} amount={4} active={[false, true, true, false]} height={100} />

import classNames from 'classnames';

// A component used to represent steps or linked elements
// Properties:
// - horizontal / vertical
// - small / big
// - numbered bullets / not
// - linked bullets / not
// - with labels / not

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
const defaultStrokeWidth = 0.5;

// const componentBackgroundColor = "rgba(255,255,255,.1)"; // For debugging
const componentBackgroundColor = "transparent"; // For production

export default React.createClass({

  // shouldComponentUpdate: function(nextProps, nextState) {
  //   return false;
  // },

  drawBullet( x, y, active, showLabel, label, radius, bulletFontSize, labelFontSize, labelPadding ) {

    if (showLabel) {
      
      return <g>
        <circle cx={x} cy={y} r={radius} stroke={defaultColor} strokeWidth={defaultStrokeWidth} fill={active ? defaultColor : "none" } />
        <text x={x} y={y} textAnchor="middle" fill={ active ? activeColor : defaultColor } fontSize={bulletFontSize} dy=".32em" dx="-.025em" lineHeight="1em">{label}</text>
        <text x={x + radius + labelPadding} y={y} fill="white" fontSize={labelFontSize} fontWeight="200" dy=".32em" lineHeight="1em">Part</text>
      </g>

    } else {
      
      return <g>
        <circle cx={x} cy={y} r={radius} stroke={defaultColor} strokeWidth={defaultStrokeWidth} fill={active ? defaultColor : "none" } />
        <text x={x} y={y} textAnchor="middle" fill={ active ? activeColor : defaultColor } fontSize={bulletFontSize} dy=".32em" dx="-.025em" lineHeight="1em">{label}</text>
      </g>

    }

  },

  createBulletItem( bullet ) {        
    return this.drawBullet(
      bullet[0],
      bullet[1],
      bullet[2],
      bullet[3],
      bullet[4],
      bullet[5],
      bullet[6],
      bullet[7],
      bullet[8]
    );
  },

  drawLine( x1, y1, x2, y2 ) {
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={defaultColor} strokeWidth={defaultStrokeWidth}></line>
  },

  createLineItem( line ) {        
    return this.drawLine(
      line[0],
      line[1],
      line[2],
      line[3]
    );
  },

  render() {
    
    //
    // Collecting the Props
    //

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
    let showLabel = this.props.labels || false;

    let numberOfBullets = this.props.amount || 2;
    
    // Format [ true, false, false ] = 3 bullets, the first one is active
    let activeBullets = this.props.active || [];

    let radius = small ? bulletSizeRadius_Small : bulletSizeRadius_Big;
    let bulletFontSize = small ? bulletFontSize_Small : bulletFontSize_Big;
    let labelPadding = small ? labelPadding_Small : labelPadding_Big;
    let labelFontSize = small ? labelFontSize_Small : labelFontSize_Big;

    //
    // Starting the math
    //

    let width = this.props.width || 40;
    let height = this.props.height || 100;

    let svgDimensions = "0 0 " + width + " " + height;

    let numberOfBulletRows = horizontal ? 1 : numberOfBullets;
    let numberOfBulletCols = horizontal ? numberOfBullets : 1;

    let bulletXIncr =  width / ( numberOfBulletCols + 1 )
    let bulletYIncr = height / ( numberOfBulletRows + 1 )
    let bulletX0 = bulletXIncr;
    let bulletY0 = bulletYIncr;

    // let bullets = "";
    // for (var i = 0; i < numberOfBullets; i++) {
    //   let bulletX = bulletX0 + ( horizontal ? ( i * bulletXIncr ) : 0 );
    //   let bulletY = bulletY0 + ( horizontal ? 0 : ( i * bulletYIncr ) );
    //   let bulletActive = ( activeBullets.length >= i+1 && activeBullets[i] );
    //   bullets += this.bullet( bulletX, bulletY, bulletActive, showLabel, radius, bulletFontSize, labelFontSize, labelPadding );
    //   console.log(bulletX, bulletY, bulletActive, showLabel, radius, bulletFontSize, labelFontSize, labelPadding);
    // }

    let bulletsArray = [];
    let linesArray = [];

    var prevBulletX, prevBulletY = undefined, undefined;

    for (let i = 0; i < numberOfBullets; i++) {
      
      // Bullet
      let bulletX = bulletX0 + ( horizontal ? ( i * bulletXIncr ) : 0 );
      let bulletY = bulletY0 + ( horizontal ? 0 : ( i * bulletYIncr ) );
      let bulletActive = ( activeBullets.length >= i+1 && activeBullets[i] );
      let bulletLabel = i + 1;
      bulletsArray.push( [
        bulletX,
        bulletY,
        bulletActive,
        showLabel,
        bulletLabel,
        radius,
        bulletFontSize,
        labelFontSize,
        labelPadding
      ] );

      // Line if not first bullet (because we need coordinates of bullet N and N+1)
      if (i > 0) {
        let x1 = horizontal ? ( prevBulletX + radius ) : prevBulletX;
        let y1 = horizontal ? prevBulletY : ( prevBulletY + radius );
        let x2 = horizontal ? ( bulletX - radius ) : bulletX;
        let y2 = horizontal ? bulletY : ( bulletY - radius );
        linesArray.push( [
          x1, y1, x2, y2
        ] );
      }

      prevBulletX = bulletX;
      prevBulletY = bulletY;

    }

    return (
      <span>
        <svg preserveAspectRatio="xMidYMid meet" name="service/medium/alo_service-activity-medium" viewBox={svgDimensions}>
          <title>alo_service</title>
          
          <rect x="0" y="0" width="40" height="200" fill={componentBackgroundColor}></rect>
          
          {linesArray.map( this.createLineItem, this )}

          {bulletsArray.map( this.createBulletItem, this )}
          
          </svg>
      </span>
    );
  }
});

