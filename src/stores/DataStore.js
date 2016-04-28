import Reflux from 'reflux';
import Actions from './DataActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';
import AirtableConfig from './AirtableConfig';
import moment from 'moment';

Airtable.configure({ apiKey: AirtableConfig.apiKey });
var base = new Airtable().base(AirtableConfig.base);

var data = {};
var cookieNameCommunity = "community";


export default Reflux.createStore({

    listenables: [Actions],

    init: function() {
      
      data = {
        whatsnew:       [],  
        communities:    [],
        groups:         [],
        activities:     [],
        activitytypes:  [],
        photos:         [],
        people:         [],

        loaded: {
          whatsnew:     false,
          communities:  false,
          groups:       false,
          activities:   false,
          activitytypes:false,
          photos:       false,
          people:       false,
          all:          false,  
        },
        errors: []
      };

      this.loadCommunities();
      this.loadActivities();
      this.loadActivityTypes();
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
        fetchNextPage();

      }, function done(error) {
        if (!cookieValueCommunity && Object.keys(data.communities).length > 0) {
          // -todo- set cookie of default community via StatusStore
//          cookie.save(cookieNameCommunity, Object.keys(data.communities)[0], { path: '/' }) // -todo- this value should be set via StatusStore!!
        }
        data.loaded.communities = true;
        that.forceTrigger();
        if (error) {
          that.throwError(error);
        }
      });
    },

    loadWhatsnew() {
      var that = this;
      base('Whatsnew').select({
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
        fetchNextPage();

      }, function done(error) {
        data.loaded.whatsnew = true;
        // console.log("found the following " + Object.keys(data.whatsnew).length + " whatsnew entries", data.whatsnew);
        that.forceTrigger();
        if (error) {
          that.throwError(error);
        }
      });
    },

    loadGroups() {
      var that = this;
      base('Groups').select({
        view: "Main View",
        sort: [{field: "Name", direction: "asc"}]
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('Name')) {
              data.groups.push({
                id: record.getId(),
                name: record.get('Name'),
                communityId: record.get('Community') ? record.get('Community')[0] : undefined,
                ownerId: record.get('Owner') ? record.get('Owner')[0] : undefined,
                description: record.get('Description'),
                headerimage: record.get('Header Image'),
                activities: record.get('Activities'),
                official: record.get('Official')
              });
            }
        });
        fetchNextPage();

      }, function done(error) {

        data.loaded.groups = true;
        // console.log("found the following " + Object.keys(data.groups).length + " groups", data.groups);
        that.forceTrigger();

        if (error) {
          that.throwError(error);
        }
      });
    },

    loadActivities() {
      var that = this;
      base('Activities').select({
        maxRecords: 999,
        pageSize: 100,
        view: "Main View",
        sort: [{field: "Date", direction: "asc"}]
//        filterByFormula: "IS_BEFORE({date}, TODAY()) = 0",
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('Name') && record.get('Date')) {
              data.activities.push({
                id: record.getId(),
                name: record.get('Name'),
                groupId: record.get('Group') ? record.get('Group')[0] : undefined,
                date: record.get('Date'),
                dateEnd: record.get('Date End'),
                typeId: record.get('Type') ? record.get('Type')[0] : undefined,
                description: record.get('Description'),
                photos: record.get('Photos') || [],
                interested: record.get('Interested') || 0,
                attended: record.get('Attended') || 0,
                cancelled: record.get('cancelled')
              });
            }
        });
        fetchNextPage();

      }, function done(error) {

        data.loaded.activities = true;
        // console.log("found the following " + Object.keys(data.activities).length + " activities", data.activities);
        // console.log("activity names ", data.activities.map(function(a) { return a.name; }).join(', '));
        // console.log("activity dates ", data.activities.map(function(a) { return moment(a.date).format("MMM Do YY"); }).join(', '));
        that.forceTrigger();

        if (error) {
          that.throwError(error);
        }
      });
    },

    loadActivityTypes() {
      var that = this;
      base('Activity Types').select({
        view: "Main View",
        sort: [{field: "Name", direction: "asc"}]
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('Name')) {
              data.activitytypes.push({
                id: record.getId(),
                name: record.get('Name'),
                activityIds: record.get('Activities'),
                icon: record.get('Icon') || ''
              });
            }
        });
        fetchNextPage();

      }, function done(error) {
        data.loaded.activitytypes = true;
        // console.log("found the following " + Object.keys(data.activitytypes).length + " activity types:", data.activitytypes.map(function(a) { return a.name; }).join(', '));
        that.forceTrigger();
        if (error) {
          that.throwError(error);
        }
      });
    },

    loadPhotos() {
      var that = this;
      base('Photos').select({
        view: "Main View"
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('Nr') && record.get('Owner') && record.get('Activity') && record.get('Image') && record.get('Image').length > 0) {
              data.photos.push({
                id: record.getId(),
                nr: record.get('Nr'),
                image: record.get('Image') || [],
                description: record.get('Description') || '',
                ownerId: record.get('Owner')[0] || '',
                activityId: record.get('Activity')[0] || ''
              });
            }
        });
        fetchNextPage();

      }, function done(error) {
        data.loaded.photos = true;
        // console.log("found the following " + Object.keys(data.photos).length + " photos", data.photos);
        that.forceTrigger();
        if (error) {
          that.throwError(error);
        }
      });
    },

    loadPeople() {
      var that = this;
      base('People').select({
        view: "Main View"
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('Name')) {
              var pictureFullsizeUrl = '', pictureUrl = '';
              if (record.get('Picture') && record.get('Picture').length > 0) {
                pictureFullsizeUrl = record.get('Picture')[0].url;
                pictureUrl = record.get('Picture')[0].thumbnails.large.url;
              }
              data.people.push({
                id: record.getId(),
                name: record.get('Name'),
                surname: record.get('Surname'),
                phone: record.get('Phone'),
                email: record.get('Email'),
                pictureFullsizeUrl: pictureFullsizeUrl,
                pictureUrl: pictureUrl
              });
            }
        });
        fetchNextPage();

      }, function done(error) {
        data.loaded.people = true;
        // console.log(JSON.stringify(data.people, null, 2));
        // console.log("found the following " + Object.keys(data.people).length + " people", data.people);
        that.forceTrigger();
        if (error) {
          that.throwError(error);
        }
      });
    },
 
    forceTrigger: function() {
      if (data.loaded.whatsnew && data.loaded.communities && data.loaded.groups && data.loaded.activities && data.loaded.activitytypes && data.loaded.photos && data.loaded.people) {
        data.loaded.all = true;
      }
      this.trigger(data);
    }

});



