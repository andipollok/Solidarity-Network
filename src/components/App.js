import React from 'react';
import { Link }  from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import classNames from'classnames';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';

import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/lib/locale-data/en';
import frLocaleData from 'react-intl/lib/locale-data/fr';
import deLocaleData from 'react-intl/lib/locale-data/de';
import moment from 'moment';
import moment_locale_en from 'moment/locale/en-gb.js';
import moment_locale_fr from 'moment/locale/fr.js';
import moment_locale_de from 'moment/locale/de.js';
import ErrorMessage from './ErrorMessage';

import iNoBounce from 'inobounce';

import attachFastClick from 'fastclick';
attachFastClick(document.body);

addLocaleData(enLocaleData);
addLocaleData(frLocaleData);
addLocaleData(deLocaleData);

var intldata = {
  locale: "en",
  messages: {}
};

var momentLocale = {
  'en': moment_locale_en,
  'fr': moment_locale_fr,
  'de': moment_locale_de
}

moment.locale('en', {
  week: {
    dow: 1 // Monday is the first day of the week.
  }
});


import Nav from './Nav';
import Top from './Top';
import Footer from './Footer';
import Start from './Start';

const history = createHashHistory();

export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status'), Reflux.connect(DataStore, 'data') ],

  setLanguage: function(lang) {
    LanguageActions.setLanguage(lang);
  },

  componentDidMount() {
    LanguageActions.forceTrigger();
    iNoBounce.enable();
    // Listen for changes to the current location.
/*    const unlisten = history.listen(location => {
      StatusActions.historyAdd($.extend({}, location,
      {
        title: '',
        url: ''
      }));
    });*/
  },

  render: function() {

    if (this.state.language && this.state.language.selected) {
      intldata.locale = this.state.language.selected;
      intldata.messages = this.state.language.languages[this.state.language.selectedID].messages;
      moment.locale(intldata.locale, momentLocale[intldata.locale]);
    }

    if (this.state.data && this.state.data.errors.length > 0) {
      var error = <ErrorMessage {...this.state.data.errors[0]}/>;
    }

    return (

      <IntlProvider {...intldata}>

        <div className="flex-container">

          <Nav />

          <div className="top-container">
            <Top />
          </div>

          {error}

          <div className="main-container scrollable">
  
            {this.props.children}
  
          </div>

          <Footer />

        </div>

      </IntlProvider>
    )
  }
});
