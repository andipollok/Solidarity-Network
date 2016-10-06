import React from 'react';

// Example
// <StepBullets small={true} amount={4} numbered={false} active={[false, true, true, false]} height={20} width={300} horizontal={true} linked={false} />
//
// <StepBullets small={false} amount={3} numbered={true} active={[false, false, true]} height={100} width={40} horizontal={false} linked={false} labels={["Step 1", "Step 2", "Step 3"]} />
//
// <StepBullets small={false} amount={3} numbered={true} active={[false, false, true]} height={100} width={40} horizontal={false} linked={false} labels={["Step 1", "Step 2", "Step 3"]} callbalcks={[this.resetFilter, this.resetFilter, this.resetFilter]} />


// A component used to represent steps or linked elements
// Properties:
// - horizontal / vertical
// - small / big
// - numbered bullets / not
// - linked bullets / not
// - with labels / not
// - which have what icon (NB if icons are provided then "numbered" property is ignored)
// - which are active

const bulletSizeRadius_Small = 3;
const bulletSizeRadius_Big = 7;
const bulletFontSize_Small = 3;
const bulletFontSize_Big = 5;
const labelHPadding_Small = 2;
const labelHPadding_Big = 4;
const labelVPadding_Small = 3;
const labelVPadding_Big = 6;
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

  logg() {
    console.log("Hello");
  },

  // with inner label
  // TODO with inner icon
  drawBullet( x, y, active, innerLabel, outerLabel, outerLabelSlot, radius, bulletFontSize, labelFontSize, labelHPadding, labelVPadding, callback ) {

    var bullet = null;

    if (outerLabel) {
      
      let outerLabelX = x;
      let outerLabelY = y;
      let outerLabelTextAnchor = 'left';
      switch (outerLabelSlot) {
        case 'right':
        default:
          outerLabelX = x + radius + labelHPadding;
          break;
        case 'bottom':
          outerLabelY = y + radius + labelVPadding;
          outerLabelTextAnchor = 'middle';
          break;
      }

      bullet = <g>
        <circle cx={x} cy={y} r={radius} stroke={defaultColor} strokeWidth={defaultStrokeWidth} fill={active ? defaultColor : "none" } />
        <text x={x} y={y} textAnchor="middle" fill={ active ? activeColor : defaultColor } fontSize={bulletFontSize} dy=".32em" dx="-.025em" lineHeight="1em">{innerLabel}</text>
        <text x={outerLabelX} y={outerLabelY} textAnchor={outerLabelTextAnchor} fill="white" fontSize={labelFontSize} fontWeight="200" dy=".32em" lineHeight="1em">{outerLabel}</text>
      </g>

    } else {
      
      bullet = <g>
        <circle cx={x} cy={y} r={radius} stroke={defaultColor} strokeWidth={defaultStrokeWidth} fill={active ? defaultColor : "none" } />
        <text x={x} y={y} textAnchor="middle" fill={ active ? activeColor : defaultColor } fontSize={bulletFontSize} dy=".32em" dx="-.025em" lineHeight="1em">{innerLabel}</text>
      </g>

    }

    if (callback) {
      return <g key={x+y} onClick={callback} cursor="pointer">
          {bullet}
        </g>
    } else {
      return <g key={x+y}>
          {bullet}
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
      bullet[8],
      bullet[9],
      bullet[10],
      bullet[11]
    );
  },

  drawLine( x1, y1, x2, y2 ) {
    return <line key={x1+x2+y1+y2} x1={x1} y1={y1} x2={x2} y2={y2} stroke={defaultColor} strokeWidth={defaultStrokeWidth}></line>
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
    let numberOfBullets = this.props.amount || 2;
    
    // Format [ true, false, false ] = 3 bullets, the first one is active
    let activeBullets = this.props.active || [];
    
    // array of labels or false
    let outerLabels = this.props.labels || false;

    // array of callbacks or false
    let callbacks = this.props.callbacks || false;

    let radius = small ? bulletSizeRadius_Small : bulletSizeRadius_Big;
    let bulletFontSize = small ? bulletFontSize_Small : bulletFontSize_Big;
    let labelHPadding = small ? labelHPadding_Small : labelHPadding_Big;
    let labelVPadding = small ? labelVPadding_Small : labelVPadding_Big;
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
    //   bullets += this.bullet( bulletX, bulletY, bulletActive, showOuterLabel, radius, bulletFontSize, labelFontSize, labelPadding );
    //   console.log(bulletX, bulletY, bulletActive, showOuterLabel, radius, bulletFontSize, labelFontSize, labelPadding);
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
      let outerLabel = ( outerLabels && i < outerLabels.length ) ? outerLabels[i] : false; // text or false
      let outerLabelSlot = horizontal ? 'bottom' : 'right';
      let callback = ( callbacks && i < callbacks.length ) ? callbacks[i] : false; // function or false
      bulletsArray.push( [
        bulletX,
        bulletY,
        bulletActive,
        bulletLabel,
        outerLabel,
        outerLabelSlot,
        radius,
        bulletFontSize,
        labelFontSize,
        labelHPadding,
        labelVPadding,
        callback
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
          
          // <rect x="0" y="0" width="40" height="200" fill={componentBackgroundColor}></rect>

    return (
      <span className="stepBullets">

        <svg preserveAspectRatio="xMidYMid meet" name="stepbullets" viewBox={svgDimensions}>
                    
          {linesArray.map( this.createLineItem, this )}

          {bulletsArray.map( this.createBulletItem, this )}
          
          </svg>
      </span>
    );
  }
});

