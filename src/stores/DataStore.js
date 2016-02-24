import Reflux from 'reflux';
import Actions from './DataActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';

Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');

var data = {};
var cookieNameCommunity = "community";


export default Reflux.createStore({

    listenables: [Actions],

    init: function() {
      
      data = {
        communities:  { },
        groups:       { },
        activities:   { },
        photos:       { },
        people:       { },

        loaded: {
          communities: false,
          groups:      false,
          activities:  false,
          photos:      false,
          people:      false
        },
        errors: []
      };

      this.loadCommunities();
      this.loadActivities();
      this.loadGroups();
      this.loadPhotos();
      this.loadPeople();

    },

    throwError: function(error) {
      data.errors.push(error);
      this.forceTrigger();
    },

    loadCommunities() {
      var that = this;
      var cookieValueCommunity = cookie.load(cookieNameCommunity) || ""; // -todo- this value should be taken from StatusStore!

      base('Communities').select({
        maxRecords: 200,
        view: "Main View"
      }).eachPage(function page(records, fetchNextPage) {

        records.forEach(function(record) {
          if (record.get('Name')) {
            data.communities[record.getId()] = {
              id: record.getId(),
              name: record.get('Name'),
              owner: record.get('Owner'),
              groups: record.get('Groups'),
              countMembers: record.get('CountMembers')
            };
          }
        });
        if (!cookieValueCommunity && Object.keys(data.communities).length > 0) {
          // -todo- set cookie of default community via StatusStore
//          cookie.save(cookieNameCommunity, Object.keys(data.communities)[0], { path: '/' }) // -todo- this value should be set via StatusStore!!
        }

        data.loaded.communities = true;
        that.forceTrigger();

      }, function done(error) {
        if (error) {
          that.throwError(error);
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
                owner: record.get('Owner'),
                description: record.get('Description'),
                headerimage: record.get('Header Image'),
                activities: record.get('Activities'),
                official: record.get('Official')
              };
            }
        });
        data.loaded.groups = true;
        // console.log("found the following " + Object.keys(data.groups).length + " groups", data.groups);
        that.forceTrigger();

      }, function done(error) {
        if (error) {
          that.throwError(error);
        }
      });
    },

    loadActivities() {
      var that = this;
      base('Activities').select({
        maxRecords: 200,
        view: "Main View"
//        filterByFormula: "IS_BEFORE({date}, TODAY()) = 0",
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
        data.loaded.activities = true;
        // console.log("found the following " + Object.keys(data.activities).length + " activities", data.activities);
        that.forceTrigger();

      }, function done(error) {
        if (error) {
          that.throwError(error);
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
        data.loaded.photos = true;
        // console.log("found the following " + Object.keys(data.photos).length + " photos", data.photos);
        that.forceTrigger();

      }, function done(error) {
        if (error) {
          that.throwError(error);
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
        data.loaded.people = true;
        // console.log("found the following " + Object.keys(data.people).length + " people", data.people);
        that.forceTrigger();

      }, function done(error) {
        if (error) {
          that.throwError(error);
        }
      });
    },
 
    forceTrigger: function() {
      this.trigger(data);
    }

});



