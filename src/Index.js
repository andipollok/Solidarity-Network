import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/App';
import Settings from './components/Settings';
import About from './components/About';
import Nav from './components/Nav';

window.React = React;

render(
  (<Router>
    <Route name="home" path="/" component={App}>
      <Route name="about" path="/about" component={About}/>
      <Route name="settings" path="/settings" component={Settings}/>
    </Route>
  </Router>), document.getElementById('content')
);
