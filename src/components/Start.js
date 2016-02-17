import React from 'react';
import {Link}  from 'react-router';

class Start extends React.Component {
  componentDidMount() {
    console.log("inside start, get communities:", this.props.data.getCommunities());
  }
  constructor(props) {
    super(props);
    console.log("inside start, get communities:", props.data.getCommunities());
  }
  render() {
    return (
        <div className="jumbotron">
          <div className="container">
            <h1>Hello! Where do you live?</h1>
            <p>Choose your community. You can always change these settings later.</p>
          </div>
        </div>
    );
  }
}

export default Start;