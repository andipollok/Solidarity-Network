import React from 'react';
import {Component} from 'react';
import {Router} from 'react-router';
import {Link}  from 'react-router';
import {RouteHandler} from 'react-router';

class Nav extends React.Component {
  componentDidMount() {
   // var routeName = RouteHandler.getRoutes()[this.getRoutes().length-1].name;
   // console.log(this.props);

  }
  constructor(props,context) {
//    console.log(context.history.isActive('/asdf'));
    super(props);
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="#">Solidarity Network</Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav ">
                <li><Link activeClassName="active" to="/whatsnew">What's new?</Link></li>
                <li><Link activeClassName="active" to="/nearme">Happening near me</Link></li>
                <li><Link activeClassName="active" to="/photos">Photos</Link></li>
                <li><Link activeClassName="active" to="/join">Join Service</Link></li>
                <li><Link activeClassName="active" to="/settings">Settings</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Nav.contextTypes = {
    history: React.PropTypes.object
};

export default Nav;