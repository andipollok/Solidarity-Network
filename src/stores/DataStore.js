import Reflux from 'reflux';
import Actions from './DataActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';
import AirtableConfig from './AirtableConfig';
import moment from 'moment';

import StatusActions from './StatusActions';
import StatusStore from './StatusStore';

import DataStore from './DataStore';

Airtable.configure({ apiKey: AirtableConfig.apiKey });
var base = new Airtable().base(AirtableConfig.base);

import Helpers from './Helpers';

var cookieNameArea = "area";

const maxRecords = {
  activities: 999,
  default: 999
};

const pageSize = {
  activities: 50,
  default: 100
};

export default Reflux.createStore({

  data: {},

  tmp: {},

  listenables: [Actions],

  init: function() {

    this.data = {
      
      whatsnew:       [],  
      // areas:          {},
      areas:          [],
      countries:      [],
      communities:    [],
      activities:     [],

      activitytypes:  [],
      // Nah. That was stupid
      // activitytypesAll:  [],
      // activitytypesWithEvents:  [],

      photos:         [],
      people:         [],
      stories:        [],

      known: {
        activities:   {} // just IDs
      },

      // Nah. That was stupid
      // count: {
      //  activityTypes: {}
      // },

      loaded: {
        whatsnew:     false,
        areas:        false,
        countries:    false, 
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

    this.loadCountries();
    this.loadAreas();

    // NB loading the current area is done in the StatusStore

  },

  throwError: function(error) {
    this.data.errors.push(error);
    this.forceTrigger();
  },

  loadCurrentAreaContent() {

      if (!StatusStore.data.areaName) {
        console.log("Undefined area. Data loading aborted");
        return;
      }

      console.log("New area declared (" + StatusStore.data.areaName + ", " + StatusStore.data.areaId + "), will now load data");

      this.loadCommunities();

      // this.loadActivities();
      this.getFilteredActivities();

      // this.loadActivityTypes();
      this.getActivityTypesAvailableInCurrentArea();

      this.loadPhotos();
      this.loadPeople();
      this.loadWhatsnew();
      this.loadStories();

  },

  onFilterChange() {

    this.reloadActivities();

  },

  onAreaIsSet() {

    StatusStore.data.areaName = Helpers.getAreaById(StatusStore.data.areaId, this.data).name;
    this.loadCurrentAreaContent();

  },

  reloadActivities() {

    // this.data.activities=  [];
    // this.data.loaded.activities = false;

    this.getFilteredActivities();

  },

  // Loads all the areas available.
  // But not their content.
  loadAreas() {
    var that = this;

    base('Areas').select({
      view: "Main View",
      sort: [{field: "Name", direction: "asc"}]
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        if (record.get('Name')) {

          // // DEBUG
          // console.log( record.getId(), record.get('Name') );

          // that.data.areas[record.getId()] = {
          //   id: record.getId(),
          //   name: record.get('Name'),
          //   ownersId: record.get('Owners'),
          //   communitiesId: record.get('Communities'),
          //   countMembers: record.get('CountMembers')
          // };

          that.data.areas.push({
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

      that.data.loaded.areas = true;

      // Possible only once the areas have been loaded so we get their names
      that.onAreaIsSet();

      if (error) {
        that.throwError(error);
      }
    });
  },

  loadCountries() {
    var that = this;

    base('Countries').select({
      view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        if (record.get('Name')) {

          let areasObjects = [];
          let areasIds = record.get('Areas');
          areasIds.map(function(areaID) { base('Areas').find(areaID, function(err, record) {
              if (err) { console.log(err); return; }
              // console.log(record.fields.Name);
              areasObjects.push( record );
            });
          });

          that.data.countries.push({
            id: record.getId(),
            name: record.get('Name'),
            iconName: record.get('Icon Name'),
            areas: areasObjects
          });

        }
      });
      fetchNextPage();

    }, function done(error) {

      that.data.loaded.countries = true;

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
            that.data.whatsnew.push({
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
      that.data.loaded.whatsnew = true;
      // console.log("found the following " + Object.keys(that.data.whatsnew).length + " whatsnew entries", that.data.whatsnew);
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
      filterByFormula: `{Area} = "${StatusStore.data.areaName}"`
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
          if (record.get('Name')) {
            that.data.communities.push({
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

      that.data.loaded.communities = true;
      // console.log("found the following " + Object.keys(that.data.groups).length + " groups", that.data.groups);
      that.forceTrigger();

      if (error) {
        that.throwError(error);
      }
    });
  },

//   createActivity( varvals ) {
//     var that = this;
//     console.log("TODO create in airtable with received data:");
//     console.log(varvals);
// //     base('Activities').create({
// // { name: "activity_title", type: "text", required: true },
// // { name: "activity_date", type: "date", required: true },
// // { name: "activity_start_time", type: "time", required: true },
// // { name: "activity_end_time", type: "time", required: true },
// // { name: "activity_street", type: "text", required: true },
// // { name: "activity_description", type: "text", required: true },

// //       name: record.get('Name'),
// //       communityId: record.get('Community') ? record.get('Community')[0] : undefined,
// //       ownersId: record.get('Owners'),
// //       date: record.get('Date'),
// //       dateEnd: record.get('Date End'),
// //       typeId: record.get('Type') ? record.get('Type')[0] : undefined,
// //       description: record.get('Description'),
// //       location: record.get('Location'),
// //       photoIds: record.get('Photos') || [],
// //       interested: record.get('Interested') || 0,
// //       attended: record.get('Attended') || 0,
// //       cancelled: record.get('cancelled')

// //       "Name": desiredUsername,
// //       "Phone": desiredTelephone,
// //       "Hash": desiredPasswordHash
// //     }, function (error, record) {
// //       if (error) {
// //         console.log( error );
// //       } else {
// //         console.log( record );        
// //         that.setCurrentUser( record.id );
// //         that.redirectAfterLogin();
// //       }
// //     });

//     // let startDateTime = undefined;
//     let startDateTime = new Date(
//       varvals.activity_date.getFullYear(),
//       varvals.activity_date.getMonth(),
//       varvals.activity_date.getDate(),
//       varvals.activity_start_time.getHours(),
//       varvals.activity_start_time.getMinutes(),
//       varvals.activity_start_time.getSeconds()
//     );
//     let stopDateTime = undefined;
//     // varvals.activity_date
//     // varvals.activity_start_time
//     // varvals.activity_end_time

//     base('Activities').create({


//       name: varvals.activity_title,
//       ownersId: undefined, // TODO
//       communityId: undefined, // TODO
//       date: startDateTime,
//       dateEnd: stopDateTime,
//       typeId: undefined, // TODO
//       location: varvals.activity_street,
//       description: varvals.activity_description,

//       // photoIds: record.get('Photos') || [],
//       // interested: record.get('Interested') || 0,
//       // attended: record.get('Attended') || 0,
//       // cancelled: record.get('cancelled')

//     }, function (error, record) {
//       if (error) {
//         console.log( error );
//       } else {
//         console.log( record );        
//         that.setCurrentUser( record.id );
//         that.redirectAfterLogin();
//       }
//     });

//     StatusActions.clearActivityTypes();
//     StatusActions.forceTrigger();
//     window.location.assign('#/activities');
//   },

  convertFilterToAirtable( domain, key, value ) {
    if (domain == 'activities') {

      switch (key) {
        case 'activityPaid':
          return `{Paid} = ` + value;
          break;
        case 'activityStatus':
          if (value == 'new') {
            // asking for new activities implies we don't want cancelled activities
            return `{Cancelled} = 0`;
          } else if (value == 'cancelled') {
            return `{Cancelled} = 1`;
          } else {
            // nothing
          }
          break;
        case 'activityType':
          let filterElements = [];
          for (var activityTypeName of Object.keys(value)) {
            filterElements.push( `{Type} = '` + activityTypeName + `'` );
          }
          if (filterElements.length > 0) {
            return 'OR( ' + filterElements.join(', ') + ' )';
          }
          break;
      }

    } else if (domain == 'stories') {

      // TODO

    }

    // empty filter by default
    return undefined;

  },

  getFilteredActivities() {
    var that = this;

    // IMPORTANT: to refresh the data we must delete this. Think of it as a cache.
    this.data.activities=  [];
    this.data.loaded.activities = false;

    // Nah. That was stupid
    // this.data.activitytypesWithEvents = [];
    // this.data.count.activityTypes = {};

    // TODO clarify if filters are a session var or a StatusStore var
    var currentUserFilters = StatusStore.data.filters || {};

    var airtableFilters = [];
    airtableFilters.push( `{Area} = "${StatusStore.data.areaName}"` );

    for (var key of Object.keys(currentUserFilters)) {
      var value = currentUserFilters[key];
      if (value !== undefined) {
        let filterElement = this.convertFilterToAirtable( 'activities', key, value );
        if (filterElement) {
          airtableFilters.push( filterElement );
        }
      }
    }

    var airtableFormula = 'AND( ' + airtableFilters.join(', ') + ' )';

    console.log("-- airtableFormula (Activities)", airtableFormula);

    base('Activities').select({
      maxRecords: maxRecords.activities || maxRecords.default,
      pageSize: pageSize.activities || pageSize.default,
      view: "Main View",
      sort: [{field: "Date Begin", direction: "asc"}],
      filterByFormula: airtableFormula
//        filterByFormula: "IS_BEFORE({date}, TODAY()) = 0",
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
          //console.log( record );
          if (record.get('Name')) {

            // Common values of all occurrences
            var activity = {
              id: record.getId(),
              name: record.get('Name'),
              date: record.get('Date Begin'),
              dateEnd: record.get('Date End'),
              communityId: record.get('Community') ? record.get('Community')[0] : undefined,
              activityGroup: record.get('Activity Group'),
              activityGroupName: record.get('Activity Group rendered'),
              ownersId: record.get('Owners'),
              ownersName: record.get('Owner Name rendered'),
              ownersPhone: record.get('Owner Phone rendered'),
              ownersEmail: record.get('Owner Email rendered'),
              // frequency: record.get('Frequency'),
              // frequencyCustomValue: record.get('Frequency Custom Value'),
              // frequencyCustomdimension: record.get('Frequency Custom Dimension'),
              typeId: record.get('Type') ? record.get('Type')[0] : undefined,
              description: record.get('Description'),
              location: record.get('Location'),
              photoIds: record.get('Photos') || [],
              min: record.get('Min'),
              max: record.get('Max'),
              interested: record.get('Interested') || 0,
              attended: record.get('Attended') || 0,
              // whatsnew: record.get('Whatsnew'),
              cancelled: record.get('Cancelled') || 0,
              storyIds: record.get('Stories'),
              paid: record.get('Paid'),
              price: record.get('Price'),
              currency: record.get('Price Currency')
              // occurrences: record.get('ActivitiesOccurrences')
            };

            // Adding the activity to the data
            that.data.activities.push( activity );

            // Remembering the activities that showed up during this browsing period
            // so next time only new ones will be considered as "new" by the filters
            that.data.known.activities[activity.id] = true;

            // Nah. That was stupid
            // // Counting how many activities are now listed for each type
            // // this is mainly for type selector filter
            // if (! that.data.count.activityTypes[activity.typeId]) {
            // 	that.data.count.activityTypes[activity.typeId] = 0;
            // }
            // that.data.count.activityTypes[activity.typeId]++;

            // TODO use the Whatsnew field
            
          }
      });
      fetchNextPage();

    }, function done(error) {

      that.data.loaded.activities = true;

      // Nah. That was stupid
      // // Refreshing the activity type array with only those who have events in the current dataset
      // that.data.activitytypesWithEvents = that.data.activitytypesAll.filter(function(t) {
      //   return that.data.count.activityTypes[t.id] && that.data.count.activityTypes[t.id] > 0
      // });

      let dat = Object.keys(that.data.known.activities);
      let str = JSON.stringify(dat);
      // console.log("DATA STR");
      // console.log(str);
      StatusStore.saveCookie( 'knownActivities', dat );

      console.log("Activities finished loading. Found " + that.data.activities.length);

      that.forceTrigger();

      if (error) {
        that.throwError(error);
      }
    });
  },

  getRelatedActivities( activity, onCompleteCallback ) {
    var that = this;

    var queryIdentifier =  "relatedActivitiesQuery" + (new Date().getTime());

    this.tmp[queryIdentifier] = {
      results: []
    };

    // NOPE
    // // IMPORTANT: to refresh the data we must delete this. Think of it as a cache.
    // this.data.activities=  [];
    // this.data.loaded.activities = false;

    // NOPE
    // // TODO clarify if filters are a session var or a StatusStore var
    // var currentUserFilters = StatusStore.data.filters || {};

    var airtableFilters = [];
    airtableFilters.push( `{Area} = "${StatusStore.data.areaName}"` );

    airtableFilters.push( `{Activity Group} = "${activity.activityGroupName}"` );

    // NOPE
    // for (var key of Object.keys(currentUserFilters)) {
    //   var value = currentUserFilters[key];
    //   if (value !== undefined) {
    //     let filterElement = this.convertFilterToAirtable( 'activities', key, value );
    //     if (filterElement) {
    //       airtableFilters.push( filterElement );
    //     }
    //   }
    // }

    var airtableFormula = 'AND( ' + airtableFilters.join(', ') + ' )';

    console.log("-- airtableFormula (related Activities)", airtableFormula);

    base('Activities').select({
      maxRecords: maxRecords.activities || maxRecords.default,
      pageSize: pageSize.activities || pageSize.default,
      view: "Main View",
      sort: [{field: "Date Begin", direction: "asc"}],
      filterByFormula: airtableFormula
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
          //console.log( record );
          if (record.get('Name')) {

            // Common values of all occurrences
            var activity = {
              id: record.getId(),
              name: record.get('Name'),
              date: record.get('Date Begin'),
              dateEnd: record.get('Date End'),
              // communityId: record.get('Community') ? record.get('Community')[0] : undefined,
              // activityGroup: record.get('Activity Group'),
              // activityGroupName: record.get('Activity Group rendered'),
              // ownersId: record.get('Owners'),
              // // frequency: record.get('Frequency'),
              // // frequencyCustomValue: record.get('Frequency Custom Value'),
              // // frequencyCustomdimension: record.get('Frequency Custom Dimension'),
              // typeId: record.get('Type') ? record.get('Type')[0] : undefined,
              description: record.get('Description'),
              location: record.get('Location'),
              // photoIds: record.get('Photos') || [],
              // min: record.get('Min'),
              // max: record.get('Max'),
              // interested: record.get('Interested') || 0,
              // attended: record.get('Attended') || 0,
              // // whatsnew: record.get('Whatsnew'),
              // cancelled: record.get('Cancelled') || 0,
              // storyIds: record.get('Stories'),
              // paid: record.get('Paid'),
              // price: record.get('Price'),
              // currency: record.get('Price Currency')
              // // occurrences: record.get('ActivitiesOccurrences')
            };

            that.tmp[queryIdentifier].results.push( activity );

          }
      });
      fetchNextPage();

    }, function done(error) {

      // NOPE
      // that.data.loaded.activities = true;

      // MAYBE LATER
      // let dat = Object.keys(that.data.known.activities);
      // let str = JSON.stringify(dat);
      // // console.log("DATA STR");
      // // console.log(str);
      // StatusStore.saveCookie( 'knownActivities', dat );

      let results = that.tmp[queryIdentifier].results;

      delete that.tmp[queryIdentifier];

      console.log("Found " + results.length + " related activities");

      onCompleteCallback( results );

      // MAYBE
      // that.forceTrigger();

      if (error) {
        that.throwError(error);
      }
    });
  },

  // getActivityTypesAvailableInCurrentArea() {


  //   var that = this;
  //   base('Activity Types').select({
  //     view: "Main View",
  //     sort: [{field: "Name", direction: "asc"}]
  //   }).eachPage(function page(records, fetchNextPage) {
  //     records.forEach(function(record) {
  //         if (record.get('Name')) {
  //           that.data.activitytypes.push({
  //             id: record.getId(),
  //             name: record.get('Name'),
  //             activityIds: record.get('Activities'),
  //             icon: record.get('Icon') || ''
  //           });
  //         }
  //     });
  //     fetchNextPage();

  //   }, function done(error) {

  //     that.data.activitytypes = that.data.activitytypes.filter(function(t) {

  //     });

  //     that.data.loaded.activitytypes = true;
      
  //     // console.log("found the following " + Object.keys(that.data.activitytypesAll).length + " activity types:", that.data.activitytypesAll.map(function(a) { return a.name; }).join(', '));
  //     that.forceTrigger();
  //     if (error) {
  //       that.throwError(error);
  //     }
  //   });
  // },

  getActivityTypesAvailableInCurrentArea() {
    var that = this;

    // IMPORTANT: to refresh the data we must delete this. Think of it as a cache.
    this.data.activitytypes = {};
    this.data.loaded.activitytypes = false; // to experiment: try to leave this to true during refreshes

    var airtableFormula = `{Area} = "${StatusStore.data.areaName}"`;

    base('Activities').select({
      maxRecords: maxRecords.activities || maxRecords.default,
      pageSize: pageSize.activities || pageSize.default,
      view: "Main View",
      sort: [{field: "Date Begin", direction: "asc"}],
      filterByFormula: airtableFormula
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
          if (record.get('Activity Type rendered')) {

            let typeName = record.get('Activity Type rendered'); // ? record.get('Name')[0] : undefined;

            if (typeName) {
              that.data.activitytypes[typeName] = true;
            }
            
          }
      });
      fetchNextPage();

    }, function done(error) {

      let activitytypeNames = Object.keys( that.data.activitytypes );

      if (activitytypeNames.length > 0) {

        var airtableFormulaForActivityTypes = 'OR( {Name} = "' + activitytypeNames.join('", {Name} = "') + '" )';

        console.log("-- airtableFormula (Activity Types)", airtableFormulaForActivityTypes);

        // reset it to receive the real data
        that.data.activitytypes = [];

        //
        // cascading query (Activity Types)
        //
        base('Activity Types').select({
          view: "Main View",
          sort: [{field: "Name", direction: "asc"}],
          filterByFormula: airtableFormulaForActivityTypes
        }).eachPage(function page(records, fetchNextPage) {
          records.forEach(function(record) {
              // console.log(record);
              if (record.get('Name')) {
                that.data.activitytypes.push({
                  id: record.getId(),
                  name: record.get('Name'),
                  activityIds: record.get('Activities'),
                  icon: record.get('Icon') || ''
                });
              }
          });
          fetchNextPage();
        }, function done(error) {
          // console.log("that.data.activitytypes");
          // console.log(that.data.activitytypes);
          console.log("Available activity types finished loading. Found ", that.data.activitytypes.length);
          that.data.loaded.activitytypes = true;
          that.forceTrigger();
          if (error) {
            that.throwError(error);
          }
        });
        //
        // end of cascading query
        //

      }

      // here we're still querying Activities
      if (error) {
        that.throwError(error);
      }

    });
  },

  loadPhotos() {
    var that = this;
    base('Photos').select({
      view: "Main View",
      filterByFormula: `{Area} = "${StatusStore.data.areaName}"`
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
          if (record.get('Nr') && record.get('Owner') && record.get('Activity') && record.get('Image') && record.get('Image').length > 0) {
            that.data.photos.push({
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
      that.data.loaded.photos = true;
      // console.log("found the following " + Object.keys(that.data.photos).length + " photos", that.data.photos);
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
      filterByFormula: `{Area} = "${StatusStore.data.areaName}"`
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
          if (record.get('Name')) {
            var pictureFullsizeUrl = '', pictureUrl = '';
            if (record.get('Picture') && record.get('Picture').length > 0) {
              pictureFullsizeUrl = record.get('Picture')[0].url;
              pictureUrl = record.get('Picture')[0].thumbnails.large.url;
            }
            that.data.people.push({
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
      that.data.loaded.people = true;
      // console.log("People loaded");
      // console.log(JSON.stringify(that.data.people, null, 2));
      // console.log("found the following " + Object.keys(that.data.people).length + " people", that.data.people);
      that.forceTrigger();
      if (error) {
        that.throwError(error);
      }
    });
  },

  loadStories() {
    var that = this;

    base('Stories').select({
      maxRecords: maxRecords.stories || maxRecords.default,
      pageSize: pageSize.stories || pageSize.default,
      view: "Main View",
      sort: [{field: "PublishDate", direction: "desc"}],
      filterByFormula: `OR({Area} = "${StatusStore.data.areaName}", {AltArea} = "${StatusStore.data.areaName}")`
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
          if (record.get('Title') && record.get('PublishDate')) {
            that.data.stories.push({
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

      that.data.loaded.stories = true;
      // console.log("found the following " + Object.keys(that.data.activities).length + " stories", that.data.stories);
      // console.log("story titles ", that.data.stories.map(function(a) { return a.title; }).join(', '));
      // console.log("story dates ", that.data.activities.map(function(a) { return moment(a.date).format("MMM Do YY"); }).join(', '));
      that.forceTrigger();

      if (error) {
        that.throwError(error);
      }
    });
  },

  forceTrigger: function() {
    if (this.checkData()) {
      this.trigger(this.data);
    }
  },

  checkData: function() {
    if (!this.data) { return false; }
    if (this.data.loaded.whatsnew && this.data.loaded.areas && this.data.loaded.communities && this.data.loaded.activities && this.data.loaded.activitytypes && this.data.loaded.photos && this.data.loaded.people && this.data.loaded.stories) {
      this.data.loaded.all = true;
      return true;
    }
    else {
      return true;
    }
  }

});



