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

var currentArea = undefined;
var currentFilters = undefined;

var currentAreaCookieName = "area";
var currentFiltersCookieName = undefined;

export default Reflux.createStore({

listenables: [Actions],

  init: function() {

    // "recGlKnzjzZTFT0h3"; // Pully Nord
    // "reckyIsF1Np63HlRc"; // Ecublens
    
    // Load existing values from cookie or default
    // currentArea = cookie.load(currentAreaCookieName) || "recGlKnzjzZTFT0h3"; // Pully Nord
    // currentFilters = cookie.load(currentFiltersCookieName) || [];
    currentArea = localStorage.getItem(currentAreaCookieName) || "recGlKnzjzZTFT0h3"; // Pully Nord
    currentFilters = localStorage.getItem(currentFiltersCookieName) || {
    	activity: {},
    	story: {}
    	// photo: {},
    };

    // Save cookie (will create it if does not exist)
    this.saveSession();

    // data = {
    //   join: cookieValueJoin,
    //   area: cookieValueArea,
    //   page: '',
    //   title: '',
    //   showPrimaryNav: true,
    //   secondaryNav: null,
    //   showBackButton: false,
    //   selectedActivityTypes: [],
    //   history: [],
    //   future: [],
    //   goto: null
    // };

  },

  // private
  saveSession: function() {
    // cookie.save(currentAreaCookieName, currentArea, { path: '/' });
    // cookie.save(currentFiltersCookieName, currentFilters, { path: '/' });
    localStorage.setItem(currentAreaCookieName, currentArea);
    localStorage.setItem(currentFiltersCookieName, currentFilters);
  },

  setFilter: function( domain, key, value ) {
  	currentFilters[domain][key] = value;
  	this.saveSession();
  },

  resetFilter: function( domain, array ) {
    currentFilters[domain] = array;
  	this.saveSession();
  },

});
