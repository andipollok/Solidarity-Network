import Reflux from 'reflux';
import StatusActions from './StatusActions';
import Actions from './DataActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';
import AirtableConfig from './AirtableConfig';
import moment from 'moment';

Airtable.configure({ apiKey: AirtableConfig.apiKey });
var base = new Airtable().base(AirtableConfig.base);

import Helpers from './Helpers';

var data = {};
var cookieNameArea = "area";
var areaId = "";
var areaName = "";

export default Reflux.createStore({

    listenables: [Actions],

    init: function() {

      // allAreas
      areaId = cookie.load(cookieNameArea) || "reckyIsF1Np63HlRc"; // -todo- default community is Ecublens, here it's hardcoded but we should let this set by DataStore

      data = {
        whatsnew:       [],  
        areas:          [],
        communities:    [],
        activities:     [],
        activitytypes:  [],
        photos:         [],
        people:         [],
        stories:        [],

        loaded: {
          whatsnew:     false,
          areas:        false,
          communities:  false,
          activities:   false,
          activitytypes:false,
          photos:       false,
          people:       false,
          stories:      false,
          all:          false,
        },
        errors: []
      };

      this.loadAreaData();

    },

    onAreaChange: function() {
      this.init();
    },

    throwError: function(error) {
      data.errors.push(error);
      this.forceTrigger();
    },

    loadAreaData() {
      var that = this;

      // TODO filter only by the active area

      base('Areas').select({
        view: "Main View",
        sort: [{field: "Name", direction: "asc"}]
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          if (record.get('Name')) {
            data.areas.push({
              id: record.getId(),
              name: record.get('Name'),
              ownersId: record.get('Owners'),
              communitiesId: record.get('Communities'),
              countMembers: record.get('CountMembers')
            });
          }
        });
        fetchNextPage();

      }, function done(error) {

        data.loaded.areas = true;

        areaName = Helpers.getAreaById(areaId, data).name;

        that.loadCommunities();
        that.loadActivities();
        that.loadActivityTypes();
        that.loadPhotos();
        that.loadPeople();
        that.loadWhatsnew();
        that.loadStories();

        if (error) {
          that.throwError(error);
        }
      });
    },

    loadWhatsnew() {
      var that = this;
      base('News').select({
        view: "Main View",
        sort: [{field: "Date", direction: "desc"}]
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('Date') && record.get('Type')) {
              data.whatsnew.push({
                id: record.getId(),
                date: record.get('Date'),
                type: record.get('Type'),
                params: record.get('Params'),
                activityId: record.get('Activity') ? record.get('Activity')[0] : undefined,
                communityId: record.get('Community') ? record.get('Community')[0] : undefined,
                personId: record.get('Person') ? record.get('Person')[0] : undefined
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

    loadCommunities() {
      var that = this;
      base('Communities').select({
        view: "Main View",
        sort: [{field: "Name", direction: "asc"}],
        filterByFormula: `{Area} = "${areaName}"`
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('Name')) {
              data.communities.push({
                id: record.getId(),
                name: record.get('Name'),
                areaId: record.get('Area') ? record.get('Area')[0] : undefined,
                ownersId: record.get('Owners'),
                description: record.get('Description'),
                headerimage: record.get('Header Image'),
                activities: record.get('Activities'),
                official: record.get('Official')
              });
            }
        });
        fetchNextPage();

      }, function done(error) {

        data.loaded.communities = true;
        // console.log("found the following " + Object.keys(data.groups).length + " groups", data.groups);
        that.forceTrigger();

        if (error) {
          that.throwError(error);
        }
      });
    },

    updateArea( userID, newArea ) {
      // TODO check the area is really different
      base('People').update(userID, {
        "Area": newArea
      }, function(err, record) {
          if (err) { console.log(err); return; }
          console.log(record);
          this.onAreaChange(); // TODO - only if it actually changed
      });
    },

    createActivity( varvals ) {
      var that = this;
      console.log("TODO create in airtable with received data:");
      console.log(varvals);
  //     base('Activities').create({
  // { name: "activity_title", type: "text", required: true },
  // { name: "activity_date", type: "date", required: true },
  // { name: "activity_start_time", type: "time", required: true },
  // { name: "activity_end_time", type: "time", required: true },
  // { name: "activity_street", type: "text", required: true },
  // { name: "activity_description", type: "text", required: true },

  //       name: record.get('Name'),
  //       communityId: record.get('Community') ? record.get('Community')[0] : undefined,
  //       ownersId: record.get('Owners'),
  //       date: record.get('Date'),
  //       dateEnd: record.get('Date End'),
  //       typeId: record.get('Type') ? record.get('Type')[0] : undefined,
  //       description: record.get('Description'),
  //       location: record.get('Location'),
  //       photoIds: record.get('Photos') || [],
  //       interested: record.get('Interested') || 0,
  //       attended: record.get('Attended') || 0,
  //       cancelled: record.get('cancelled')

  //       "Name": desiredUsername,
  //       "Phone": desiredTelephone,
  //       "Hash": desiredPasswordHash
  //     }, function (error, record) {
  //       if (error) {
  //         console.log( error );
  //       } else {
  //         console.log( record );        
  //         that.setCurrentUser( record.id );
  //         that.redirectAfterLogin();
  //       }
  //     });

      // let startDateTime = undefined;
      let startDateTime = new Date(
        varvals.activity_date.getFullYear(),
        varvals.activity_date.getMonth(),
        varvals.activity_date.getDate(),
        varvals.activity_start_time.getHours(),
        varvals.activity_start_time.getMinutes(),
        varvals.activity_start_time.getSeconds()
      );
      let stopDateTime = undefined;
      // varvals.activity_date
      // varvals.activity_start_time
      // varvals.activity_end_time

      base('Activities').create({


        name: varvals.activity_title,
        ownersId: undefined, // TODO
        communityId: undefined, // TODO
        date: startDateTime,
        dateEnd: stopDateTime,
        typeId: undefined, // TODO
        location: varvals.activity_street,
        description: varvals.activity_description,

        // photoIds: record.get('Photos') || [],
        // interested: record.get('Interested') || 0,
        // attended: record.get('Attended') || 0,
        // cancelled: record.get('cancelled')

      }, function (error, record) {
        if (error) {
          console.log( error );
        } else {
          console.log( record );        
          that.setCurrentUser( record.id );
          that.redirectAfterLogin();
        }
      });

      StatusActions.clearActivityTypes();
      StatusActions.forceTrigger();
      window.location.assign('#/activities');
    },

    loadActivities() {
      var that = this;

      base('Activities').select({
        maxRecords: 999,
        pageSize: 100,
        view: "Main View",
        sort: [{field: "Date", direction: "asc"}],
        filterByFormula: `{Area} = "${areaName}"`
//        filterByFormula: "IS_BEFORE({date}, TODAY()) = 0",
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('Name') && record.get('Date')) {
              data.activities.push({
                id: record.getId(),
                name: record.get('Name'),
                communityId: record.get('Community') ? record.get('Community')[0] : undefined,
                ownersId: record.get('Owners'),
                date: record.get('Date'),
                dateEnd: record.get('Date End'),
                typeId: record.get('Type') ? record.get('Type')[0] : undefined,
                description: record.get('Description'),
                location: record.get('Location'),
                photoIds: record.get('Photos') || [],
                interested: record.get('Interested') || 0,
                attended: record.get('Attended') || 0,
                cancelled: record.get('cancelled')
              });
            }
        });
        fetchNextPage();

      }, function done(error) {

        data.loaded.activities = true;
        // console.log("found " + Object.keys(data.activities).length + " activities in " + areaName);
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
        view: "Main View",
        filterByFormula: `{Area} = "${areaName}"`
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
        view: "Main View",
        filterByFormula: `{Area} = "${areaName}"`
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
        // console.log("People loaded");
        // console.log(JSON.stringify(data.people, null, 2));
        // console.log("found the following " + Object.keys(data.people).length + " people", data.people);
        that.forceTrigger();
        if (error) {
          that.throwError(error);
        }
      });
    },

    loadUserProfile() {
      var that = this;
      base('People').find('recv71CYpQUlg4KdI', function(err, record) {
        if (err) { console.log(err); return; }
        console.log('loaded user profile');
        console.log(record);
        //areaId = cookie.load(cookieNameArea) || "reckyIsF1Np63HlRc"; // -todo- default community is Ecublens, here it's hardcoded but we should let this set by DataStore
      });
      // select({
      //   view: "Main View",
      //   filterByFormula: `{Area} = "${areaName}"`
      // }).eachPage(function page(records, fetchNextPage) {
      //   records.forEach(function(record) {
      //       if (record.get('Name')) {
      //         var pictureFullsizeUrl = '', pictureUrl = '';
      //         if (record.get('Picture') && record.get('Picture').length > 0) {
      //           pictureFullsizeUrl = record.get('Picture')[0].url;
      //           pictureUrl = record.get('Picture')[0].thumbnails.large.url;
      //         }
      //         data.people.push({
      //           id: record.getId(),
      //           name: record.get('Name'),
      //           surname: record.get('Surname'),
      //           phone: record.get('Phone'),
      //           email: record.get('Email'),
      //           pictureFullsizeUrl: pictureFullsizeUrl,
      //           pictureUrl: pictureUrl
      //         });
      //       }
      //   });
      //   fetchNextPage();

      // }, function done(error) {
      //   data.loaded.people = true;
      //   // console.log("People loaded");
      //   // console.log(JSON.stringify(data.people, null, 2));
      //   // console.log("found the following " + Object.keys(data.people).length + " people", data.people);
      //   that.forceTrigger();
      //   if (error) {
      //     that.throwError(error);
      //   }
      // });
    },

    loadStories() {
      var that = this;

      base('Stories').select({
        maxRecords: 999,
        pageSize: 100,
        view: "Main View",
        sort: [{field: "PublishDate", direction: "desc"}],
        filterByFormula: `OR({Area} = "${areaName}", {AltArea} = "${areaName}")`
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('Title') && record.get('PublishDate')) {
              data.stories.push({
                id: record.getId(),
                title: record.get('Title'),
                date: record.get('PublishDate'),
                content: record.get('Story'),
                photoIds: record.get('Photos') || [],
                activityId: record.get('Activity') ? record.get('Activity')[0] : undefined
              });
            }
        });
        fetchNextPage();

      }, function done(error) {

        data.loaded.stories = true;
        // console.log("found the following " + Object.keys(data.activities).length + " stories", data.stories);
        // console.log("story titles ", data.stories.map(function(a) { return a.title; }).join(', '));
        // console.log("story dates ", data.activities.map(function(a) { return moment(a.date).format("MMM Do YY"); }).join(', '));
        that.forceTrigger();

        if (error) {
          that.throwError(error);
        }
      });
    },
 
    forceTrigger: function() {
      if (this.checkData()) {
        this.trigger(data);
      }
    },

    checkData: function() {
      if (!data) { return false; }
      if (data.loaded.whatsnew && data.loaded.areas && data.loaded.communities && data.loaded.activities && data.loaded.activitytypes && data.loaded.photos && data.loaded.people && data.loaded.stories) {
        data.loaded.all = true;
        return true;
      }
      else {
        return true;
      }
    }



});



