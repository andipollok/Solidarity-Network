import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/App';

import About from './components/About';
import Settings from './components/Settings';

import Whatsnew from './components/Whatsnew';
import Nearme from './components/Nearme';
import Photos from './components/Photos';
import Join from './components/Join';


window.React = React;

render(
  (<Router>
    <Route name="home" path="/" component={App}>
      <Route name="about" path="/about" component={About}/>
      <Route name="settings" path="/settings" component={Settings}/>
      <Route name="whatsnew" path="/whatsnew" component={Whatsnew}/>
      <Route name="nearme" path="/nearme" component={Nearme}/>
      <Route name="photos" path="/photos" component={Photos}/>
      <Route name="join" path="/join" component={Join}/>

    </Route>
  </Router>), document.getElementById('content')
);
