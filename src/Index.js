import React from 'react';
import ReactIntl from 'react-intl';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import App from './components/App';
import Start from './components/Start';
import Settings from './components/Settings';

import Whatsnew from './components/Whatsnew';
import Agenda from './components/Agenda';
import Photos from './components/Photos';

import Day from './components/Day';

import Group from './components/Group';
import Groups from './components/Groups';

import Activity from './components/Activity';
import Photo from './components/Photo';
import PhotoZoom from './components/PhotoZoom';

import Person from './components/Person';

import Join from './components/Join';
import Nearby from './components/Nearby';
import About from './components/About';


// polyfill for Safari (see https://github.com/iam4x/isomorphic-flux-boilerplate/issues/97)
// -todo- this should be loaded conditionally, but require.ensure didn't work
if (!global.Intl) {
  require('intl');
  require('intl/locale-data/jsonp/en.js');
  require('intl/locale-data/jsonp/fr.js');
  require('intl/locale-data/jsonp/de.js');
}

// surpress console calls from React Intl when message is not found
if (process.env.NODE_ENV !== 'production') {
  const originalConsoleError = console.error
  if (console.error === originalConsoleError) {
    console.error = (...args) => {
      if (args[0].indexOf('[React Intl] Missing message:') === 0 || args[0].indexOf('[React Intl] Cannot format message:') === 0) {
        return
      }
      originalConsoleError.call(console, ...args)
    }
  }
}


window.React = React;

// const history = createHashHistory({ queryKey: false });
const history = createHashHistory();


render(
  (
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <Route name="home" path="/" component={App}>
        <IndexRoute component={Whatsnew}/>
        <Route name="settings" path="/settings" component={Settings}/>

        <Route name="whatsnew" path="/whatsnew" component={Whatsnew}/>
        <Route name="agenda" path="/agenda" component={Agenda}/>
        <Route name="photos" path="/photos" component={Photos}/>

        <Route name="day" path="/agenda/:day/:month/:year" component={Day}/>

        <Route name="groups" path="/groups/" component={Groups}/>
        <Route name="group" path="/group/:id" component={Group}/>

        <Route name="group" path="/person/:id" component={Person}/>

        <Route name="activity" path="/activity/:id" component={Activity}/>
        <Route name="photo" path="/photo/:id" component={Photo}/>
        <Route name="photozoom" path="/photo/:id/zoom" component={PhotoZoom}/>


        <Route name="join" path="/join" component={Join}/>
        <Route name="nearby" path="/nearby" component={Nearby}/>
        <Route name="about" path="/about" component={About}/>
      </Route>
    </Router>
  ), document.getElementById('content')
);
