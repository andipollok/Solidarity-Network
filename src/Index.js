import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import {browserHistory} from 'react-router';

import createBrowserHistory from 'history/lib/createBrowserHistory';
const history = createBrowserHistory();

import App from './components/App';
import About from './components/About';
import Settings from './components/Settings';
import Start from './components/Start';
import Whatsnew from './components/Whatsnew';
import Nearby from './components/Nearby';
import Photos from './components/Photos';
import Join from './components/Join';
import Agenda from './components/Agenda';

window.React = React;

render(
  (<Router history={browserHistory}>
    <Route name="home" path="/" component={App}>
      <IndexRoute component={Start}/>
      <Route name="about" path="/about" component={About}/>
      <Route name="settings" path="/settings" component={Settings}/>
      <Route name="nearby" path="/nearby" component={Nearby}/>
      <Route name="agenda" path="/agenda" component={Agenda}/>
      <Route name="whatsnew" path="/whatsnew" component={Whatsnew}/>
      <Route name="photos" path="/photos" component={Photos}/>
      <Route name="join" path="/join" component={Join}/>
    </Route>
  </Router>), document.getElementById('content')
);
