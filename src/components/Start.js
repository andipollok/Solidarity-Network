import React from 'react';
import {Link}  from 'react-router';

class Start extends React.Component {
  componentDidMount() {
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="jumbotron">
          <div className="container">
            <h1>Choose your community</h1>
            <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
            <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
          </div>
        </div>
    );
  }
}

export default Start;