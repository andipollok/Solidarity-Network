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

  // constructor(props) {
  //   super(props);
  //   this.unsubscribe = statusStore.listen(this.onStatusChange);
  //   this.state = { joined: cookie.load('joined') || false };
  // },
  // componentDidMount: function() {
  //   this.unsubscribe = Store.listen(this.onLanguageChange);
  // },
  // componentWillUnmount: function() {
  //   this.unsubscribe();
  // },
  // onLanguageChange: function(newLanguage) {
  //   this.setState({ language: newLanguage });
  // },
  setLanguage: function(lang) {
    LanguageActions.setLanguage(lang);
  },

  render: function() {
    return (
      <div>
        <div onClick={this.setLanguage.bind(this,'en')}>Set lang to en</div>
        <div onClick={this.setLanguage.bind(this,'fr')}>Set lang to fr</div>

        Current language: {this.state.language}

        <Nav />

        {this.props.children || <Start />}

        <Footer />

      </div>
    )
  }
});
