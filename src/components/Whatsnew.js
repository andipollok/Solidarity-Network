import React from 'react';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';


export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data'), Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status')],

  componentDidMount() {
    DataActions.forceTrigger();
    LanguageActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  render() {
    if (this.state.status && this.state.status.community) {
      // var comm = <span>in {this.state.status.community}</span>
      if (this.state.data && this.state.data.communities && this.state.data.communities[this.state.status.community]) {
        var communityName = this.state.data.communities[this.state.status.community].name;
        var comm = <span> in {communityName}</span>
      }
    }

    return (
      <div className="jumbotron">
        <div className="container centered">
          <h1>What's new{comm}?</h1>
        </div>
      </div>
    );
  }
});
