import Reflux from 'reflux';
import Actions from './DataActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';
import AirtableConfig from './AirtableConfig';
import moment from 'moment';

import StatusActions from './StatusActions';
import StatusStore from './StatusStore';

Airtable.configure({ apiKey: AirtableConfig.apiKey });
var base = new Airtable().base(AirtableConfig.base);

import Helpers from './Helpers';

var cookieNameArea = "area";

export default Reflux.createStore({

  data: {},

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
      photos:         [],
      people:         [],
      stories:        [],

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

      StatusStore.data.areaName = Helpers.getAreaById(StatusStore.data.areaId, this.data).name;

      console.log("New area name: " + StatusStore.data.areaName);

      this.loadCommunities();
      this.loadActivities();
      this.loadActivityTypes();
      this.loadPhotos();
      this.loadPeople();
      this.loadWhatsnew();
      this.loadStories();

      console.log("New area finished loading");

  },

  onAreaIsSet() {

      this.loadCurrentAreaContent();

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
      filterByFormula: `{Area} = "${StatusStore.data.areaName}"`
//        filterByFormula: "IS_BEFORE({date}, TODAY()) = 0",
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
          if (record.get('Name') && record.get('Date')) {

            // Common values of all occurrences
            var activityBase = {
              id: record.getId(),
              name: record.get('Name'),
              communityId: record.get('Community') ? record.get('Community')[0] : undefined,
              ownersId: record.get('Owners'),
              date: record.get('Date'),
              dateEnd: record.get('Date End'),
              frequency: record.get('Frequency'),
              frequencyCustomValue: record.get('Frequency Custom Value'),
              frequencyCustomdimension: record.get('Frequency Custom Dimension'),
              typeId: record.get('Type') ? record.get('Type')[0] : undefined,
              description: record.get('Description'),
              location: record.get('Location'),
              paid: record.get('Paid'),
              price: record.get('Price'),
              currency: record.get('Price Currency')
            };

            // TODO take into account Date Limit and Number Limit

            // TODO reconciliate when some occurrence data is expected but not present
            	// Probably by keeping a "Date" field
            // TODO reconciliate when there is occurrence data that does not match the recurring event settings

            // TODO change Date into First Begin Date and Date End into First End Date

            // TODO determine if we want to let the fields Location, Min, Max be modifiable for each occurrence (or event Description but I highly discourage it)

            // TODO use the Whatsnew field

   //          // Retrieve now the additional occurrence values 
   //          base('ActivitiesOccurrences').select({
	   //      maxRecords: 999,
	   //      pageSize: 100,
	   //      view: "Main View",
	   //      sort: [{field: "Date", direction: "asc"}],
	   //      filterByFormula: `{Base Activity} = "${record.getId()}"`
	   //    }).eachPage(function page(occurrenceRecords, fetchNextPageOccurrences) {

	   //    	occurrenceRecords.forEach(function(occurrenceRecord) {
   //        		if (occurrenceRecord.get('Name') && occurrenceRecord.get('Date')) {

              
	   //              // Copy the common values
	   //              var activityOccurrence = ( JSON.parse( JSON.stringify( activityBase ) ) );
	                
	   //              // Add this occurrence's values
				// 	activityOccurrence.photoIds = occurrenceRecord.get('Photos') || [];
				// 	activityOccurrence.interested = occurrenceRecord.get('Interested') || 0;
				// 	activityOccurrence.attended = occurrenceRecord.get('Attended') || 0;
				// 	activityOccurrence.cancelled = occurrenceRecord.get('cancelled');
	                
	   //              // Push the activity and activity occurrence unified data as a single "activity"
	   //              // record in the data array, so the display code doesn't need to change much.
	   //              data.activities.push( activityOccurrence );

				// }
   //    		});
   //    		fetchNextPageOccurrences();

	   //    }, function doneOccurrence(error) {

	   //      if (error) {
	   //        that.throwError(error);
	   //      }

	   //    });
            
          }
      });
      fetchNextPage();

      //
      // BEFORE RECURRING EVENTS:
      //
      // records.forEach(function(record) {
      //     if (record.get('Name') && record.get('Date')) {
      //       data.activities.push({
      //         id: record.getId(),
      //         name: record.get('Name'),
      //         communityId: record.get('Community') ? record.get('Community')[0] : undefined,
      //         ownersId: record.get('Owners'),
      //         date: record.get('Date'),
      //         dateEnd: record.get('Date End'),
      //         typeId: record.get('Type') ? record.get('Type')[0] : undefined,
      //         description: record.get('Description'),
      //         location: record.get('Location'),

      //         photoIds: record.get('Photos') || [],
      //         interested: record.get('Interested') || 0,
      //         attended: record.get('Attended') || 0,
      //         cancelled: record.get('cancelled')

      //       });
      //     }
      // });
      // fetchNextPage();
      //

    }, function done(error) {

      that.data.loaded.activities = true;
      // console.log("found " + Object.keys(data.activities).length + " activities in " + data.areaName);
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
      that.data.loaded.activitytypes = true;
      // console.log("found the following " + Object.keys(that.data.activitytypes).length + " activity types:", that.data.activitytypes.map(function(a) { return a.name; }).join(', '));
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
      maxRecords: 999,
      pageSize: 100,
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



