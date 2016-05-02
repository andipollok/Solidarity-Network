import React from 'react';
import ReactIntl from 'react-intl';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import App from './components/App';
import Settings from './components/Settings/Settings';

import News from './components/News/News';
import Activities from './components/Activities/List';
import Calendar from './components/Activities/Calendar';
import Stories from './components/Stories/Stories';

import Person from './components/Person/Person';
import Group from './components/Group/Group';
import Groups from './components/Group/Groups';

import Day from './components/Activities/Day';
import Activity from './components/Activities/Activity';
import Story from './components/Stories/Story';
import Photo from './components/Photo/Photo';
import PhotoZoom from './components/Photo/PhotoZoom';


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

        <IndexRoute component={News}/>

        <Route name="settings" path="/settings" component={Settings}/>

        <Route name="news" path="/news" component={News}/>
        <Route name="activities" path="/activities" component={Activities}/>
        <Route name="activities/month" path="/activities/month" component={Calendar}/>
        <Route name="stories" path="/stories" component={Stories}/>

        <Route name="day" path="/activities/:day/:month/:year" component={Day}/>

        <Route name="groups" path="/groups/" component={Groups}/>
        <Route name="group" path="/group/:id" component={Group}/>

        <Route name="person" path="/person/:id" component={Person}/>

        <Route name="activity" path="/activity/:id" component={Activity}/>

        <Route name="story" path="/story/:id" component={Story}/>

        <Route name="photo" path="/photo/:id" component={Photo}/>
        <Route name="photozoom" path="/photo/:id/zoom" component={PhotoZoom}/>

      </Route>
    </Router>
  ), document.getElementById('content')
);
