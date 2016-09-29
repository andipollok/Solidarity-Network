import Reflux from 'reflux';
import Actions from './StatusActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';

import DataActions from './DataActions';

import createHashHistory from 'history/lib/createHashHistory';

const history = createHashHistory();

import Helpers from './Helpers';

// var data = {};
// var areaName;
var cookieNameJoin = "join";
var cookieNameArea = "area";

const areaId_Ecublens = "reckyIsF1Np63HlRc";

export default Reflux.createStore({

  data: {},

  listenables: [Actions],

  init: function() {
    
    this.data = {
      filters: {},
      join: undefined,
      area: undefined,
      page: '',
      title: '',
      showPrimaryNav: true,
      secondaryNav: null,
      showBackButton: false,
      selectedActivityTypes: [],
      history: [],
      future: [],
      goto: null
    };
    
    this.awakeStatusFromCookies();

  },

  saveCookie(name, value) {
    var nextyear = new Date();
    nextyear.setFullYear(nextyear.getFullYear() + 1)
    cookie.save(name, value, { path: '/', expires: nextyear });
  },

  loadCookie(name, defaultValue) {
    return cookie.load(name) || defaultValue;
  },

  // On startup restore the status from cookies
  awakeStatusFromCookies() {

    let savedArea = this.loadCookie( cookieNameArea, areaId_Ecublens ); // Default is Ecublens
    this.setArea( savedArea );

    let savedJoin = this.loadCookie( cookieNameJoin, false ); // Default is false
    this.setJoin( savedJoin );

  },

  setJoin: function(state) {
    
    this.saveCookie(cookieNameJoin, state);
    
    this.data.join = state;
    // this.trigger(data);

  },

  setArea: function( areaId ) {
    
    this.saveCookie( cookieNameArea, areaId );
    
    this.data.areaId = areaId;
    DataActions.onAreaIsSet();
    // this.trigger(data);

  },


  resetFilterActivityType: function() {
    this.data.filters.activityType = [];
    // this.trigger(data);
  },

  addToFilterActivityType: function(typeId) {

  },

  removeFromFilterActivityType: function(typeId) {

  },


  resetFilterPaid: function() {
    this.data.filters.paid = undefined;
    // this.trigger(data);
  },

  setFilterPaid: function(value) {
    this.data.filters.paid = value;
    DataActions.onFilterChange();
  },


  resetFilterStatus: function() {
    this.data.filters.status = undefined;
    // this.trigger(data);
  },

  setFilterStatus: function(value) {
    this.data.filters.status = value;
    // this.trigger(data);
  },

  setPage: function(pagename) {
    this.data.page = pagename;
    // this.trigger(data);
  },

  setTitle: function(title) {
    this.data.title = title;
    // this.trigger(data);
  },

  showBackButton: function(status) {
    this.data.showBackButton = status;
    // this.trigger(data);
  },

  showPrimaryNav: function(status) {
    this.data.showPrimaryNav = status;
    // this.trigger(data);
  },

  setSecondaryNav: function(component) {
    this.data.secondaryNav = component;
    // this.trigger(data);
  },

  addActivityType: function(id) {
    if (this.data.selectedActivityTypes.indexOf(id) === -1) {
      this.data.selectedActivityTypes.push(id);
      // this.trigger(data);
      return true;
    }
    return false;
  },

  removeActivityType: function(id) {
    var index = this.data.selectedActivityTypes.indexOf(id);
    if (index === -1) {
      this.data.selectedActivityTypes.splice(id, 1);
      return true;
      // this.trigger(data);
    }
    return false;
  },

  clearActivityTypes: function() {
    this.data.selectedActivityTypes = [];
    // this.trigger(data);
  },

  /**
   * @param  {[type]}
   * @return {[type]}
   */
  historyAdd: function(historydata) {
    // check if the current item is the same as the item we want to add. this happens when we go back in history.
    if (this.data.history.length === 0 || historydata.pathname !== this.data.history[this.data.history.length-1].pathname) {
      // console.log('add', historydata, data.history, data.future);
      this.data.history.push(historydata);
      // this.trigger(data);
    }
  },

  historyBack: function() {
    this.data.future.push(this.data.history.pop());
    // console.log('go back', data.history, data.future);
    history.goBack();
  },

  historyForward: function() {
    this.data.history.push(this.data.future.pop());
    // console.log('go forward', data.history, data.future);
    history.goForward();
  },


  forceTrigger: function() {
    this.trigger(this.data);
  },

  setGotoDestination: function(pagename) {
    this.data.goto = pagename;
  },

  clearGotoDestination: function() {
    this.data.goto = null;
  },

});
