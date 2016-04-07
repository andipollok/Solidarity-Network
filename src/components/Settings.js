import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import Helpers from '../stores/Helpers.js';

import ChooseCommunity from './ChooseCommunity';
import ChooseLanguage from './ChooseLanguage';


export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status') ],

  componentDidMount() {
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
    StatusActions.setArea('settings');
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this)) {
      return <div></div>;
    }

    return (
      <div className="container text-center">
      
        <h2><FormattedMessage id='wheredoyoulive'/></h2>
        <ChooseCommunity />

        <h2><FormattedMessage id='whichlanguagedoyouspeak'/></h2>
        <ChooseLanguage />

      </div>
    );
  }
});
