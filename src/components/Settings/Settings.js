import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Reflux from 'reflux';
import LanguageActions from '../../stores/LanguageActions';
import LanguageStore from '../../stores/LanguageStore';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';

import ChooseArea from './ChooseArea';
import ChooseLanguage from './ChooseLanguage';


export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status') ],

  componentDidMount() {
    StatusActions.setPage('settings');
  },

  render() {

    var data = this.props.data;

    return (
      <div className="container text-center">
      
        <h2><FormattedMessage id='wheredoyoulive'/></h2>
        <ChooseArea data={data}/>

        <h2><FormattedMessage id='whichlanguagedoyouspeak'/></h2>
        <ChooseLanguage data={data}/>

      </div>
    );
  }
});
