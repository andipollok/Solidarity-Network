import React from 'react';
import classNames from 'classnames';
import dateFormat from 'dateformat';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';

import { FormattedRelative, FormattedDate, FormattedMessage } from 'react-intl';

export default React.createClass({

  mixins: [Reflux.connect(LanguageStore, 'language')],

  render() {

    var divClass = classNames( 'col-md-4', 'box', 'white', 'linked', 'padded', 'centered',
      {
        'selected': false
      }
    ); // selected may be needed later

    if (this.status && this.status.language.loaded) {
      if (this.status.language.selected === "fr") {      
      }
    }
    // var dataFormatted = dateFormat(this.props.data.date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    var time = dateFormat(this.props.data.date, "h:MM TT");

    return (

        <div className={divClass} onClick={this.props.onClickHandler.bind(null, this.props.data.id)}>

          <h2>{this.props.data.name}</h2>

          <p><FormattedRelative value={this.props.data.date} /></p>

          {time}
          
        </div>

    );
  }
});
