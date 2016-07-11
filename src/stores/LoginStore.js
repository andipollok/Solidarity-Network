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
//var currentUser = null;

var usernameFieldInAirtable = "Name";
var sessionExpiryHours = 24;

export default Reflux.createStore({

  listenables: [Actions],

  isLoggedIn: function() {
    return loggedIn;
  },

  redirectAfterLogin: function() {
    // not sure this is very React-ish but hey it works
    window.location.assign('#/');
  },

  setCurrentUser: function(userid) {
    loggedIn = ( userid != null );
    //currentUser = userid;
    localStorage.setItem("currentUser", userid);
  },

  // private
  setLoggedOut: function() {
    this.setCurrentUser( null );
    this.redirectAfterLogin();
  },

  // private
  setLoggedIn: function( userid ) {
    this.setCurrentUser( userid );
    this.redirectAfterLogin();
  },

  // private
  startNewSession: function( userid ) {
    let expiryDate =  new Date();
    expiryDate.setHours( expiryDate.getHours() + sessionExpiryHours ); // sessions expire in +24 hours
    let pseudoRandomSessionID = md5( userid + expiryDate );
    // save session id on airtable side
    base('People').update(userid, {
      "SessionID": pseudoRandomSessionID,
      "SessionExpires": expiryDate
    }, function(err, record) {
        if (err) { console.log(err); return; }
        console.log(record);
    });
    // save session id in browser
    localStorage.setItem('sessionCookie', pseudoRandomSessionID);
  },

  // logs out if not
  checkSessionIsValid: function() {
    let sessionCookie = localStorage.getItem('sessionCookie');
    if (sessionCookie === null) { return false; }
    let valid = false;
    let validUserID = undefined;
    let that = this;
    base('People').select({
      view: "Authentication",
      filterByFormula: "SessionID=\"" + sessionCookie + "\"",
    }).firstPage(function (error, records) {

      if (error) {
      
        console.log( "Error occured during login of '" + username + "'" );
        that.throwError(error);
      
      } else {
      
        if (records.length > 0) {
          let nowDate = new Date();
          records.forEach(function(record) {
            let expiry = record.get('SessionExpires');
            if ( expiry != null ) {
              let expiryDate = new Date( expiry );
              if (nowDate < expiryDate) {
                console.log("Session is still valid.");
                validUserID = record.id;
                valid = true;
              } else {
                console.log("Session expired.");
              }
            }
          });
        }
      
      }

    if (!valid) {
      // log out
      that.setLoggedOut();
    } else {
      // auto relog in if needed
      that.setLoggedIn( validUserID );
    }

    });

  },

  // if we go here it means we need to log in (if here is a session it is not valid)
  logIn: function( username, candidateHash ) {
    // console.log( "logging in" );
    loggedIn = false;
    var that = this;
    base('People').select({
      view: "Authentication",
      filterByFormula: usernameFieldInAirtable + "=\"" + username + "\"",
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
              // that.setCurrentUser( record.id );
              // // that.trigger(); // that does nothing
              // that.redirectAfterLogin();
              that.startNewSession( record.id );
              that.setLoggedIn( record.id );
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
        that.setCurrentUser( record.id );
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
