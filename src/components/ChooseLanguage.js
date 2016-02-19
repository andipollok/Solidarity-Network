import React from 'react';
import {Link}  from 'react-router';
import cookie from 'react-cookie';
import classNames from 'classnames';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';

export default React.createClass({

  mixins: [Reflux.connect(LanguageStore, 'language')],

  onClick(id) {
    LanguageActions.setLanguage(id);
  },

  componentDidMount() {
     LanguageActions.forceTrigger();
  },

  // constructor(props) {
  //   super(props);
  //   this.state = { languages: [], selected: cookie.load(cookieName) };
  // },

  render() {

    var that=this;
    var item = function(id, i) {
      var d = this.state.language.languages[id];
      var divClass = classNames( 'col-md-6', 'box', 'half', 'white', 'linked', 'padded', 'centered',
        {
          'selected': this.state.language.selected === id
        }
      );
      return (
        <div key={id} className={divClass} onClick={that.onClick.bind(this, id)}>
          <h2>{d.name}</h2>
        </div> );
    };

    var selectLanguage = <span>loading…</span>;
    if (this.state.language && this.state.language.languages) {
      selectLanguage = <span>{Object.keys(this.state.language.languages).map(item, this)}</span>;
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