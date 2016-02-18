import React from 'react';
import {Component} from 'react';
import {Router} from 'react-router';
import {Link}  from 'react-router';
import {RouteHandler} from 'react-router';
import cookie from 'react-cookie';
import classNames from 'classnames';

export default class Nav extends React.Component {

  componentDidMount() {
    $('.nav a').click(function(){
       if(!$('#navbar-collapse-button').hasClass('collapsed')) {
        //(.click();
        $('#navbar-collapse-button').click();
        console.log("is collapsed");
        //this.state.navOpened = true;
        
      }
    });
    $('#navbar-collapse-button').click(function() {
      if(!$('#navbar-collapse-button').hasClass('collapsed')) {
        $('#navbar-collapse-button').html("Open Menu");
      }
      else {
        $('#navbar-collapse-button').html("Close Menu");

      }
    })

  }

  constructor(props) {
    super(props);
    this.state = { joined: cookie.load('joined') || false };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <div id="navbar-collapse-button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                Open Menu
              </div>
              <Link className="navbar-brand" to="#">Solidarity Network</Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav ">
                <li><Link activeClassName="active" to="/whatsnew">What's new?</Link></li>
                <li><Link activeClassName="active" to="/photos">Photos</Link></li>
                <li><Link activeClassName="active" to="/join">Join</Link></li>
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
