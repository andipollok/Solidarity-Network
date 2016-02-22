import React from 'react';
import {Link}  from 'react-router';
import cookie from 'react-cookie';
import classNames from 'classnames';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';

export default React.createClass({

  mixins: [Reflux.connect(LanguageStore, 'language')],

  onClickSetLanguage(id) {
    LanguageActions.setLanguage(id);
  },

  componentDidMount() {
    LanguageActions.forceTrigger();
  },

  render() {

    var that=this;
    var languageItem = function(id) {
      var d = this.state.language.languages[id];
      var divClass = classNames( 'col-md-6', 'box', 'half', 'white', 'linked', 'padded', 'centered',
        {
          'selected': this.state.language.selectedID === id
        }
      );
      return (
        <div key={id} className={divClass} onClick={that.onClickSetLanguage.bind(this, id)}>
          <h2>{d.name}</h2>
        </div> );
    };

    var selectLanguage = <span>loading…</span>;
    if (this.state.language && this.state.language.languages) {
      selectLanguage = <span>{Object.keys(this.state.language.languages).map(languageItem, this)}</span>;
    }

    return (
      <div className="container">
        <div className="row">
          {selectLanguage}        
        </div>
      </div>
    );
  }
});
// 