import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/App';
import PoweredBy from './components/Powered-by';
import About from './components/About';
import Nav from './components/Nav';

window.React = React;

render(
  (<Router>
    <Route name="home" path="/" component={App}>
      <Route name="about" path="/about" component={About}/>
      <Route name="pow" path="/poweredby" component={PoweredBy}/>
    </Route>
  </Router>), document.getElementById('content')
);
