import React from 'react';
import { Link }  from 'react-router';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Col, Row } from 'react-bootstrap';

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
      var divClass = classNames( 'box half white linked padded text-center',
        {
          'selected': this.state.language.selectedID === id
        }
      );
      return (
        <Col md={6} key={id} className="bottom-buffer" onClick={that.onClickSetLanguage.bind(this, id)}>
          <div className={divClass}>
            <h2>{d.name}</h2>
          </div>
        </Col> );
    };

    var selectLanguage = <FormattedMessage id='loading'/>;
    if (this.state.language && this.state.language.languages) {
      selectLanguage = <span>{Object.keys(this.state.language.languages).map(languageItem, this)}</span>;
    }

    return (
      <div className="container">
        <Row className="row">
          {selectLanguage}        
        </Row>
      </div>
    );
  }
});
// 