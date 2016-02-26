import React from 'react';
import {Link}  from 'react-router';

export default React.createClass({
  render() {
    return (
      <footer>
        <p><Link to="/settings">Settings</Link></p>
      </footer>
    );
  }
});