import React from 'react';
import cookie from 'react-cookie';
import { Link }  from 'react-router';

import Airtable from 'airtable';
Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';

import Nav from './Nav';
import Footer from './Footer';
import Start from './Start';


export default React.createClass({

  mixins: [Reflux.connect(LanguageStore, 'language')],

  setLanguage: function(lang) {
    LanguageActions.setLanguage(lang);
  },

  render: function() {

    return (
      <div>

        <Nav />

        {this.props.children || <Start />}

        <Footer />

      </div>
    )
  }
});
