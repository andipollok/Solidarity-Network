import React from 'react';
import { Link }  from 'react-router';
import { FormattedMessage } from 'react-intl';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';

import CommunityList from './CommunityList';


export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data'), Reflux.connect(StatusStore, 'status')],

  onClickSelectCommunity(id) {
    StatusActions.setCommunity(id);
  },

  componentDidMount() {
    DataActions.forceTrigger();
    StatusActions.forceTrigger();
  },

  getInitialState() {
  },

  render() {
    var selectCommunity = <FormattedMessage id='loading'/>;
    if (this.state.data && this.state.data.loaded.communities && this.state.status) {
      var communityItem = function(id) {
        var d = this.state.data.communities[id];
        return ( <CommunityList key={d.id} data={d} selected={this.state.status.community} onClickHandler={this.onClickSelectCommunity}></CommunityList> );
      }.bind(this);
      selectCommunity = <span>{Object.keys(this.state.data.communities).map(communityItem, this)}</span>
    }

    return (
      <div className="container">
        <div className="row">
          {selectCommunity}
        </div>
      </div>
    );
  }
});
