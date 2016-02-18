import React from 'react';
import {Link}  from 'react-router';
import {browserHistory} from 'react-router';
import Airtable from 'airtable';

import ChooseCommunity from './ChooseCommunity';

Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');


class Start extends React.Component {

  componentDidMount() {

  }
  constructor(props) {
    super(props);
    // console.log("inside start, get communities:", props.data.getCommunities());
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

          <div className="row linked" onclick="browserHistory.push('/sample');">

            <div className="col-md-4 box white">
              <h2>What's new?</h2>
              <p>See what changed since you were last here.</p>
            </div> 
            <div className="col-md-8 box">
            8 new things
            </div>
          </div>

          <div className="row top-buffer linked">
            <div className="col-md-4 box white">
              <h2>Happening nearby</h2>
              <p>Do you want to see activities near you?</p>
            </div> 
            <div className="col-md-4 box " style={{backgroundColor: 'green'}}>
              Event 1
            </div>
            <div className="col-md-4 box " style={{backgroundColor: 'purple'}}>
              Event 2
            </div>
          </div>

          <div className="row top-buffer linked">
            <div className="col-md-4 box white">
              <h2>Photos</h2>
              <p>Recent photos</p>
            </div> 
            <div className="col-md-4 box " style={{backgroundColor: 'blue'}}>
              Event 1
            </div>
            <div className="col-md-4 box " style={{backgroundColor: 'LightCoral'}}>
              Event 2
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Start;