import React from 'react';
import {Link}  from 'react-router';
import cookie from 'react-cookie';
import Airtable from 'airtable';
import classNames from 'classnames';

Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');
var cookieName = 'language';


export default class extends React.Component {

  onClick(id) {
    cookie.save(cookieName, id, { path: '/' });
    this.setState({selected: id});
  }

  componentDidMount() {
    var that = this;
    base('Languages').select({
        maxRecords: 20,
        view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
        var results = [];
        records.forEach(function(record) {
            if (record.get('Name')) {
              results.push({
                id: record.getId(),
                name: record.get('Name'),
                short: record.get('Short')
              });

            }
        });
        that.setState({languages: results});

    }, function done(error) {
        if (error) {
            console.log(error);
        }
    });
  }

  constructor(props) {
    super(props);
    this.state = { languages: [], selected: cookie.load(cookieName) };
  }

  render() {
    var that=this;
    var item = function(d, i) {
      var divClass = classNames( 'col-md-6', 'box', 'half', 'white', 'linked', 'padded', 'centered',
        {
          'selected': this.state.selected == d.id
        }
      );
      return (
        <div key={d.id} className={divClass} onClick={that.onClick.bind(this, d.id)}>
          <h2>{d.name}</h2>
        </div> );
    };

    return (
      <div className="container">
        <div className="row">
          {this.state.languages.map(item, this)}
        </div>
      </div>
    );
  }
}
