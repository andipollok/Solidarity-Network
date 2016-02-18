import React from 'react';

export default React.createClass({
  render() {
    console.log(this.props);
    return (
        <div className="jumbotron">
          <div className="container centered">
            <h1>Join</h1>
          </div>
        </div>
    );
  }
});
