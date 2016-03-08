import Reflux from 'reflux';
import Actions from './DataActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';
import AirtableConfig from './AirtableConfig';

Airtable.configure({ apiKey: AirtableConfig.apiKey });
var base = new Airtable().base(AirtableConfig.base);

var data = {};
var cookieNameCommunity = "community";


export default Reflux.createStore({

    listenables: [Actions],

    init: function() {
      
      data = {
        whatsnew:     [],  
        communities:  [],
        groups:       [],
        activities:   [],
        photos:       [],
        people:       [],

        loaded: {
          whatsnew:    false,
          communities: false,
          groups:      false,
          activities:  false,
          photos:      false,
          people:      false,
          all:         false,  
        },
        errors: []
      };

      this.loadCommunities();
      this.loadActivities();
      this.loadGroups();
      this.loadPhotos();
      this.loadPeople();
      this.loadWhatsnew();

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
        view: "Main View",
        sort: [{field: "Name", direction: "asc"}]
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          if (record.get('Name')) {
            data.communities.push({
              id: record.getId(),
              name: record.get('Name'),
              ownerId: record.get('Owner')[0],
              groupIds: record.get('Groups'),
              countMembers: record.get('CountMembers')
            });
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

    loadWhatsnew() {
      var that = this;
      base('Whatsnew').select({
        maxRecords: 200,
        view: "Main View",
        sort: [{field: "Date", direction: "desc"}]
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('Date') && record.get('Type') && record.get('Person')) {
              data.whatsnew.push({
                id: record.getId(),
                date: record.get('Date'),
                type: record.get('Type'),
                params: record.get('Params'),
                activityId: record.get('Activity') ? record.get('Activity')[0] : undefined,
                groupId: record.get('Group') ? record.get('Group')[0] : undefined,
                personId: record.get('Person')[0]
              });
            }
        });
        data.loaded.whatsnew = true;
        // console.log("found the following " + Object.keys(data.whatsnew).length + " whatsnew entries", data.whatsnew);
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
        view: "Main View",
        sort: [{field: "Name", direction: "asc"}]
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('Name')) {
              data.groups.push({
                id: record.getId(),
                name: record.get('Name'),
                communityId: record.get('Community')[0],
                ownerId: record.get('Owner')[0],
                description: record.get('Description'),
                headerimage: record.get('Header Image'),
                activities: record.get('Activities'),
                official: record.get('Official')
              });
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
        view: "Main View",
        sort: [{field: "Date", direction: "asc"}]
//        filterByFormula: "IS_BEFORE({date}, TODAY()) = 0",
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('Name') && record.get('Date')) {
              data.activities.push({
                id: record.getId(),
                name: record.get('Name'),
                groupId: record.get('Group')[0],
                date: record.get('Date'),
                type: record.get('Type') || 'default',
                description: record.get('Description'),
                photos: record.get('Photos') || [],
                interested: record.get('Interested') || 0,
                attended: record.get('Attended') || 0,
                cancelled: record.get('cancelled')
              });
            }
        });
        data.loaded.activities = true;
        // console.log("found the following " + Object.keys(data.activities).length + " activities", data.activities);
        // console.log("activity dates", data.activities.map(function(a) { return a.name; }).join(', '));
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
            if (record.get('Nr') && record.get('Activity') && record.get('Image') && record.get('Image').length > 0) {
              data.photos.push({
                id: record.getId(),
                nr: record.get('Nr'),
                image: record.get('Image') || [],
                description: record.get('Description') || '',
                ownerId: record.get('Owner') || '',
                activityId: record.get('Activity')[0] || ''
              });
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
              data.people.push({
                id: record.getId(),
                name: record.get('Name'),
                surname: record.get('Surname'),
                headshot: record.get('Headshot')
              });
            }
        });
        data.loaded.people = true;
        // console.log(JSON.stringify(data.people, null, 2));
        // console.log("found the following " + Object.keys(data.people).length + " people", data.people);
        that.forceTrigger();

      }, function done(error) {
        if (error) {
          that.throwError(error);
        }
      });
    },
 
    forceTrigger: function() {
      if (data.loaded.whatsnew && data.loaded.communities && data.loaded.groups && data.loaded.activities && data.loaded.photos && data.loaded.people) {
        data.loaded.all = true;
      }
      this.trigger(data);
    }

});



