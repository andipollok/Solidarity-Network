import React from 'react';
import cookie from 'react-cookie';
import classNames from 'classnames';

import ChooseCommunity from './ChooseCommunity';
import ChooseLanguage from './ChooseLanguage';

export default class extends React.Component {

  render() {

    return (
      <div className="container">
        <h2>Which language do you speak?</h2>

        <ChooseLanguage />

        <h2>Where do you live?</h2>

        <ChooseCommunity />
        
      </div>

    );
  }
};
