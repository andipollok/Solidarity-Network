import React from 'react';
import {Link}  from 'react-router';
import cookie from 'react-cookie';
import Airtable from 'airtable';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';

import Community from './Community';


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
    var selectCommunity = <span>loading…</span>;
    if (this.state.data && this.state.data.communities && this.state.status) {
      var communityItem = function(id) {
        var d = this.state.data.communities[id];
        return ( <Community key={d.id} data={d} selected={this.state.status.community} onClickHandler={this.onClickSelectCommunity}></Community> );
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
