import React from 'react';
import {Link}  from 'react-router';
import cookie from 'react-cookie';
import Airtable from 'airtable';

import Reflux from 'reflux';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';

import Community from './Community';

Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');


export default React.createClass({

  mixins: [Reflux.connect(StatusStore, 'status')],

  onClickSelectCommunity(id) {
    console.log("onClickSelectCommunity", id);
    StatusActions.setCommunity(id);
  },

  componentDidMount() {
     StatusActions.forceTrigger();
  },

  componentDidMount() {
    var that = this;
    base('Communities').select({
        maxRecords: 20,
        view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
        var results = [];
        records.forEach(function(record) {
            if (record.get('Name')) {

              // get name from owner from table People
              base('People').find(record.get('Owner'), function(err, recordPerson) {
                if (err) { console.log(err); return; }
                results.push({
                  id: record.getId(),
                  name: record.get('Name'),
                  owner: recordPerson.get('Name'),
                  groups: record.get('Groups'),
                  countMembers: record.get('CountMembers')
                });
                that.setState({communities: results});
              });
            }
        });

    }, function done(error) {
        if (error) {
            console.log(error);
        }
    });

  },

  getInitialState() {
    return {
      communities: []
    }
  },

  render() {
    var selectCommunity = <span>loading…</span>;
    if (this.state.status) {
      var communityItem = function(d) {
        // console.log(d.id, that.state.status.community);
        return ( <Community key={d.id} data={d} selected={this.state.status.community} onClickHandler={this.onClickSelectCommunity}></Community> );
      }.bind(this);
      selectCommunity = <span>{this.state.communities.map(communityItem, this)}</span>
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
