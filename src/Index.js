import React from 'react';
import ReactIntl from 'react-intl';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { browserHistory } from 'react-router';

import App from './components/App';
import About from './components/About';
import Settings from './components/Settings';
import Start from './components/Start';
import Whatsnew from './components/Whatsnew';
import Nearby from './components/Nearby';
import Photos from './components/Photos';
import Join from './components/Join';
import Agenda from './components/Agenda';

// polyfill for Safari (see https://github.com/iam4x/isomorphic-flux-boilerplate/issues/97)
// -todo- this should be loaded conditionally, but require.ensure didn't work
if (!global.Intl) {
  require('intl');
  require('intl/locale-data/jsonp/en.js');
  require('intl/locale-data/jsonp/fr.js');
  require('intl/locale-data/jsonp/de.js');
}

window.React = React;

render(
  (
    <Router history={browserHistory}>
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
    </Router>
  ), document.getElementById('content')
);
