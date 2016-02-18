import React from 'react';
import {Link}  from 'react-router';
import Airtable from 'airtable';

import ChooseCommunity from './ChooseCommunity';

Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');


export default class Start extends React.Component {

  componentDidMount() {

  }
  constructor(props) {
    super(props);
    // console.log("inside start, get communities:", props.data.getCommunities());
  }
  clickHandler(p) {
    window.location.assign("/#/" + p);
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container centered">
            <h1>Welcome!</h1>
            <p></p>
          </div>
        </div>
        <div className="container">

          <div className="row">

        
            <div className="col-md-4 box white linked centered padded" onClick={this.clickHandler.bind(this, "whatsnew")}>
              <h2>What's new?</h2>
              <p>See what changed since you were last here.</p>
            </div> 
        
            <div className="col-md-4 box white linked centered padded" onClick={this.clickHandler.bind(this, "nearby")}>
              <h2>Happening nearby</h2>
              <p>Do you want to see activities near you?</p>
            </div> 

            <div className="col-md-4 box white linked centered padded" onClick={this.clickHandler.bind(this, "photos")}>
              <h2>Photos</h2>
              <p>Recent photos</p>
            </div> 

          </div>

        </div>
      </div>
    );
  }
}
