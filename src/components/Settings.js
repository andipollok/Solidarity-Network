import React from 'react';
import cookie from 'react-cookie';
import classNames from 'classnames';

import ChooseCommunity from './ChooseCommunity';
import ChooseLanguage from './ChooseLanguage';
import ChooseJoin from './ChooseJoin';

export default class extends React.Component {

  render() {

    return (
      <div className="container">
      
        <h2>Where do you live?</h2>
        <ChooseCommunity />

        <h2>Status</h2>
        <p>This setting changes your status from new member to existing member.</p>
        <ChooseJoin />

        <h2>Which language do you speak?</h2>
        <ChooseLanguage />

      </div>
    );
  }
};
