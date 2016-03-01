import React from 'react';
import { Link }  from 'react-router';
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
import ErrorMessage from './ErrorMessage';

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

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status'), Reflux.connect(DataStore, 'data') ],

  setLanguage: function(lang) {
    LanguageActions.setLanguage(lang);
  },

  componentDidMount() {

  },

  render: function() {

    if (this.state.language && this.state.language.selected) {
      intldata.locale = this.state.language.selected;
      intldata.messages = this.state.language.languages[this.state.language.selectedID].messages;
    }

    if (this.state.data && this.state.data.errors.length > 0) {
      var error = <ErrorMessage {...this.state.data.errors[0]}/>;
    }

    if (this.state.status) {
      var mainContainerClasses = classNames( ['mainContainer'], {
        'collapsed': this.state.status.currentPage === 'start'
      });
    }

    return (

      <IntlProvider {...intldata}>

        <div className={mainContainerClasses}>

          <Nav />

          {error}

          {this.props.children}

          <Footer />

        </div>

      </IntlProvider>
    )
  }
});
