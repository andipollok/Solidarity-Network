import React from 'react';
import ChooseCommunity from './ChooseCommunity';

import cookie from 'react-cookie';

class Settings extends React.Component {


  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h1>Settings</h1>
          <p>Here you can change your personal settings for the application.</p>
        </div>

        <div className="container">
          <h2>Where do you live?</h2>
        </div>
        <ChooseCommunity />

        <div className="container">
          <h2>Have you joined the service yet?</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 box half white linked padded centered">
              <h2>Yes</h2>
            </div>
            <div className="col-md-6 box half white linked padded centered">
              <h2>No</h2>
            </div>
          </div>
        </div>

      </div> 
    );
  }
};

export default Settings;