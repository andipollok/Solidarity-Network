import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import ChooseCommunity from './ChooseCommunity';
import ChooseLanguage from './ChooseLanguage';

export default class extends React.Component {

  render() {

    return (
      <div className="container text-center">
      
        <h2><FormattedMessage id='wheredoyoulive'/></h2>
        <ChooseCommunity />

        <h2><FormattedMessage id='whichlanguagedoyouspeak'/></h2>
        <ChooseLanguage />

      </div>
    );
  }
};
