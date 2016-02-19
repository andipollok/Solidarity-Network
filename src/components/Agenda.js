import React from 'react';
import classNames from 'classnames';

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

  onClick(id) {
    console.log("Clicked on activity " + id);
  },

  render() {
    if (this.state.status && this.state.status.community) {
      // var comm = <span>in {this.state.status.community}</span>
      if (this.state.data && this.state.data.communities && this.state.data.communities[this.state.status.community]) {
        var communityName = this.state.data.communities[this.state.status.community].name;
        var comm = <span>in {communityName}</span>
      }
    }
    var that=this;
    var activityItem = function(id) {
      var d = this.state.data.activities[id];
      var divClass = classNames( 'col-md-4', 'box', 'half', 'white', 'linked', 'padded', 'centered',
        {
          'selected': false
        }
      ); // selected may be needed later
      return (
        <div key={id} className={divClass} onClick={that.onClick.bind(this, id)}>
          <h2>{d.name}</h2>
          <p>{d.date}</p>
        </div> );
    };
    var listActivities = <span>loading…</span>;
    if (this.state.data && this.state.data.activities && this.state.status.community) {
      // todo: filter activities to community
      var listActivities =  <span>
        {Object.keys(this.state.data.activities).filter(
        function(key) {
          // here we need to look if that activity is in a group that is in this community
          // console.log(that.state.data.activities[key], that.state.status.community);
          // return that.state.data.activities[key].community == that.state.status.community;
          return true;
        }).map(activityItem, this)}
      </span>;   
    }

    return (
      <div className="jumbotron">
        <div className="container centered">
          <h1>Agenda {comm}</h1>
          {listActivities}
        </div>
      </div>
    );
  }
});
