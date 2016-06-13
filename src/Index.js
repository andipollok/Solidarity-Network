import React from 'react';
import ReactIntl from 'react-intl';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import App from './components/App';
import Settings from './components/Settings/Settings';
import Start from './components/Start/Start';

import News from './components/News/News';
import Upcoming from './components/Activities/Upcoming';
import Calendar from './components/Activities/Calendar';
import TypeSelector from './components/General/TypeSelector';

import StoriesLatest from './components/Stories/Latest';
import StoriesCalendar from './components/Stories/Calendar';
import StoriesDay from './components/Stories/Day';

import Photowall from './components/Stories/Photowall';

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

global.Perf = require('react-addons-perf');

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
    <Router history={history} onUpdate={
      function() { 
        var mainScrollElement = document.getElementById('main-scroll');
        if (mainScrollElement) {
          mainScrollElement.scrollTop = 0;
        }
      }
    }>
      <Route name="home" path="/" component={App}>

        <IndexRoute component={Start}/>

        <Route name="home" path="/home" component={Start}/>

        <Route name="settings" path="/settings" component={Settings}/>

        <Route name="news" path="/news" component={News}/>
 
        <Route name="activities" path="/activities" component={Upcoming}/>

        <Route name="activities-upcoming" path="/activities/upcoming" component={Upcoming}/>
        <Route name="activities-month" path="/activities/month" component={Calendar}/>
        <Route name="activities-type" path="/activities/type" component={TypeSelector}/>
        <Route name="day" path="/activities/:day/:month/:year" component={Day}/>
        <Route name="activity" path="/activity/:id" component={Activity}/>

        <Route name="stories" path="/stories" component={StoriesLatest}/>

        <Route name="stories-latest" path="/stories/latest" component={StoriesLatest}/>
        <Route name="stories-month" path="/stories/month" component={StoriesCalendar}/>
        <Route name="stories-type" path="/stories/type" component={TypeSelector}/>
        <Route name="day" path="/stories/:day/:month/:year" component={StoriesDay}/>
        <Route name="story" path="/story/:id" component={Story}/>

        <Route name="photos" path="/stories/wall" component={Photowall}/>
        
        <Route name="groups" path="/groups/" component={Groups}/>
        <Route name="group" path="/group/:id" component={Group}/>

        <Route name="person" path="/person/:id" component={Person}/>
        

        <Route name="photo" path="/photo/:id" component={Photo}/>
        <Route name="photozoom" path="/photo/:id/zoom" component={PhotoZoom}/>

      </Route>
    </Router>
  ), document.getElementById('content')
);
