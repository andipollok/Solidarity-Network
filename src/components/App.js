import React from 'react';
import cookie from 'react-cookie';
import { Link }  from 'react-router';
import { defineMessages } from 'react-intl';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';

import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/lib/locale-data/en';
import frLocaleData from 'react-intl/lib/locale-data/fr';
import deLocaleData from 'react-intl/lib/locale-data/de';

addLocaleData(enLocaleData);
addLocaleData(frLocaleData);
addLocaleData(deLocaleData);

var intldata = {
  locale: "en",
  messages: {}
};


import Nav from './Nav';
import Footer from './Footer';
import Start from './Start';


export default React.createClass({

  mixins: [Reflux.connect(LanguageStore, 'language')],

  setLanguage: function(lang) {
    LanguageActions.setLanguage(lang);
  },

  render: function() {

    if (this.state.language && this.state.language.selected) {
      intldata.locale = this.state.language.selected;
      intldata.messages = this.state.language.languages[this.state.language.selectedID].messages;
    }

    return (

      <IntlProvider {...intldata}>

        <div>

          <Nav />

            {this.props.children}

          <Footer />

        </div>

      </IntlProvider>
    )
  }
});
