import Reflux from 'reflux';
import Actions from './DataActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';

Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');

var data = {};

export default Reflux.createStore({

    listenables: [Actions],

    init: function() {
      
      data = {
        communities: {},
        groups: {},
        activities: {},
        photos: {},
        people: {}
      };

      this.loadCommunities();
      this.loadActivities();
      this.loadGroups();
      this.loadPhotos();
      this.loadPeople();

      console.log("Data from DataStore: ",data);


    },

    loadCommunities() {
      var that = this;
      base('Communities').select({
        maxRecords: 200,
        view: "Main View"
      }).eachPage(function page(records, fetchNextPage) {

        records.forEach(function(record) {
            if (record.get('Name')) {
              data.communities[record.getId()] = {
                id: record.getId(),
                name: record.get('Name'),
                owner: "",
                groups: record.get('Groups'),
                countMembers: record.get('CountMembers')
              };
            }
        });
        that.forceTrigger();

      }, function done(error) {
        if (error) {
          console.log(error);
        }
      });
    },

    loadGroups() {
      var that = this;
      base('Groups').select({
        maxRecords: 200,
        view: "Main View"
      }).eachPage(function page(records, fetchNextPage) {

        records.forEach(function(record) {
            if (record.get('Name')) {
              data.groups[record.getId()] = {
                id: record.getId(),
                name: record.get('Name'),
                community: record.get('Community')[0],
                owner: record.get('Community'),
                description: record.get('Description'),
                headerimage: record.get('Header Image'),
                activities: record.get('Activities'),
                official: record.get('Official')
              };
            }
        });
        // console.log("found the following " + Object.keys(data.groups).length + " groups", data.groups);
        that.forceTrigger();

      }, function done(error) {
        if (error) {
          console.log(error);
        }
      });
    },

    loadActivities() {
      var that = this;
      base('Activities').select({
        maxRecords: 200,
        view: "Main View"
      }).eachPage(function page(records, fetchNextPage) {

        records.forEach(function(record) {
            if (record.get('Name')) {
              data.activities[record.getId()] = {
                id: record.getId(),
                name: record.get('Name'),
                group: record.get('Group')[0],
                date: record.get('Date'),
                description: record.get('Description'),
                photos: [],
                interested: record.get('Interested'),
                attended: record.get('Attended')
              };
            }
        });
        // console.log("found the following " + Object.keys(data.activities).length + " activities", data.activities);
        that.forceTrigger();

      }, function done(error) {
        if (error) {
          console.log(error);
        }
      });
    },

    loadPhotos() {
      var that = this;
      base('Photos').select({
        maxRecords: 200,
        view: "Main View"
      }).eachPage(function page(records, fetchNextPage) {

        records.forEach(function(record) {
            if (record.get('Nr')) {
              data.photos[record.getId()] = {
                id: record.getId(),
                nr: record.get('Nr'),
                image: record.get('Image'),
                description: record.get('Description'),
                owner: record.get('Owner'),
                activities: record.get('Activities')
              };
            }
        });
        // console.log("found the following " + Object.keys(data.photos).length + " photos", data.photos);
        that.forceTrigger();

      }, function done(error) {
        if (error) {
          console.log(error);
        }
      });
    },

    loadPeople() {
      var that = this;
      base('People').select({
        maxRecords: 200,
        view: "Main View"
      }).eachPage(function page(records, fetchNextPage) {

        records.forEach(function(record) {
            if (record.get('Name')) {
              data.people[record.getId()] = {
                id: record.getId(),
                name: record.get('Name'),
                surname: record.get('Surname'),
                headshot: record.get('Headshot')
              };
            }
        });
        // console.log("found the following " + Object.keys(data.people).length + " people", data.people);
        that.forceTrigger();

      }, function done(error) {
        if (error) {
          console.log(error);
        }
      });
    },
 
    forceTrigger: function() {
      this.trigger(data);
    }

});



