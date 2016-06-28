import Reflux from 'reflux';
import Actions from './LoginActions';
import StatusActions from './StatusActions';
// import cookie from 'react-cookie';
import Airtable from 'airtable';
import AirtableConfig from './AirtableConfig';
// import moment from 'moment';

import md5 from 'js-md5';

Airtable.configure({ apiKey: AirtableConfig.apiKey });
var base = new Airtable().base(AirtableConfig.base);

// import Helpers from './Helpers';

// var data = {};
// var cookieNameArea = "area";
// var areaId = "";
// var areaName = "";

var loggedIn = false;
var currentUser = null;

export default Reflux.createStore({

  listenables: [Actions],

  isLoggedIn: function() {
    return loggedIn;
  },

  redirectAfterLogin: function() {
    // not sure this is very React-ish but hey it works
    StatusActions.setPage('home');
    StatusActions.forceTrigger();
  },

  setLoggedInUser: function(userid) {
    loggedIn = true;
    currentUser = userid;
  },

  logIn: function( username, candidateHash ) {
    // console.log( "logging in" );
    loggedIn = false;
    var that = this;
    base('People').select({
      view: "Authentication",
      filterByFormula: "Name=\"" + username + "\"",
      // sort: [{field: "Date", direction: "desc"}]
    }).firstPage(function (error, records) {

      if (error) {
        console.log( "Error occured during login of '" + username + "'" );
        that.throwError(error);
      } else {
        if (records.length == 0) {
          console.log( "Unknown user '" + username + "'" );
        } else {
          records.forEach(function(record) {
            if ( candidateHash == record.get('Hash') ) {
              console.log( "User '" + username + "' successfully logged in" );
              that.setLoggedInUser( record.id );
              console.log(currentUser);
              
              // that.trigger(); // that does nothing

              that.redirectAfterLogin();

            }
          });
          if (!loggedIn) {
            console.log( "Login of '" + username + "' unsuccessful" );
          }
        }
      }

    });
  },

  join: function( desiredUsername, desiredTelephone, desiredPasswordHash ) {
    var that = this;
    base('People').create({
      "Name": desiredUsername,
      "Phone": desiredTelephone,
      "Hash": desiredPasswordHash
    }, function (error, record) {
      if (error) {
        console.log( error );
      } else {
        console.log( record );        
        that.setLoggedInUser( record.id );
        that.redirectAfterLogin();
      }
    });
  },

  // forceTrigger: function() {
  //   // if (this.checkData()) {
  //     this.trigger();
  //   // }
  // }

});
