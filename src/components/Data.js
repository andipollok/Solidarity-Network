import Airtable from 'airtable';

export default class {
  constructor() {

    Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
    this.base = new Airtable().base('appTOXg7AH1lJqSrT');

  }
  getCommunities() {
    var that = this;
    this.base('Communities').select({
        maxRecords: 2,
        view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
        console.log("eachpage");
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('Name'));
        });
        var changeEvent = new CustomEvent('change', { detail: this.state });
        that.dispatchEvent(changeEvent); 

    }, function done(error) {
        if (error) {
            console.log(error);
        }
    });
  }
};