import React from 'react';
import {Link}  from 'react-router';
import cookie from 'react-cookie';
import Airtable from 'airtable';

import Community from './Community';


Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');
var cookieName = 'community';


export default class extends React.Component {

  onClick(id) {
    cookie.save(cookieName, id, { path: '/' });
    this.setState({selected: id});
  }

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

  }

  constructor(props) {
    super(props);
    this.state = { communities: [], selected: cookie.load(cookieName) };
  }

  render() {
    var that=this;
    var communityItem = function(d) {
      return ( <Community key={d.id} data={d} selected={this.state.selected} onClickHandler={this.onClick.bind(this)}></Community> );
    };

    return (
      <div className="container">
        <div className="row">
          {this.state.communities.map(communityItem, this)}
        </div>
      </div>
    );
  }
}
