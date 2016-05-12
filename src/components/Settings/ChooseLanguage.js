import React from 'react';
import { Link }  from 'react-router';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Col, Row, Button, ButtonGroup } from 'react-bootstrap';

import Reflux from 'reflux';
import LanguageActions from '../../stores/LanguageActions';
import LanguageStore from '../../stores/LanguageStore';

export default React.createClass({

  onClickSetLanguage(id) {
    LanguageActions.setLanguage(id);
  },

  render() {

    var data = this.props.data;

    var languageItem = function(id) {
      var d = data.language.languages[id];
      var buttonClass = classNames( 'padded top-buffer',
        {
          'active': data.language.selectedID === id
        }
      );
      return (
        <Button bsSize="large" key={id} className={buttonClass} onClick={this.onClickSetLanguage.bind(this, id)}>
          {d.name}
        </Button> );
    }.bind(this);

    var selectLanguage = <FormattedMessage id='loading'/>;
    if (data.language && data.language.languages) {
      selectLanguage = <span>{Object.keys(data.language.languages).map(languageItem, this)}</span>;
    }

    return (
      <div className="container">
        <Row>
          <ButtonGroup>
            {selectLanguage}        
          </ButtonGroup>
        </Row>
      </div>
    );
  }
});
// 