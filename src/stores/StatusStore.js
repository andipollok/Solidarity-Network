import Reflux from 'reflux';
import Actions from './StatusActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';

import createHashHistory from 'history/lib/createHashHistory';

const history = createHashHistory();


var data = {};
var cookieNameJoin = "join";
var cookieNameArea = "area";


export default Reflux.createStore({

    listenables: [Actions],

    init: function() {
      var cookieValueJoin = cookie.load(cookieNameJoin) || false;
      var cookieValueArea = cookie.load(cookieNameArea) || "reckyIsF1Np63HlRc"; // -todo- default community is Ecublens, here it's hardcoded but we should let this set by DataStore
      data = {
        join: cookieValueJoin,
        area: cookieValueArea,
        page: '',
        title: '',
        secondaryNav: null,
        showBackButton: false,
        selectedActivityTypes: [],
        history: [],
        future: []
      };
      // save join and community state
      // -todo- this actually only should be done if default value for cookie has been set
      cookie.save(cookieNameJoin, cookieValueJoin, { path: '/' });
      cookie.save(cookieNameArea, cookieValueArea, { path: '/' });
    },
 
    setJoin: function(state) {
      cookie.save(cookieNameJoin, state, { path: '/' });
      data.join = state;
      this.trigger(data);
    },

    setArea: function(area) {
      cookie.save(cookieNameArea, area, { path: '/' });
      data.area = area;
      this.trigger(data);
    },

    setPage: function(pagename) {
      data.page = pagename;
      this.trigger(data);
    },

    setTitle: function(title) {
      data.title = title;
      this.trigger(data);
    },

    showBackButton: function(status) {
      data.showBackButton = status;
      this.trigger(data);
    },

    setSecondaryNav: function(component) {
      data.secondaryNav = component;
      this.trigger(data);
    },

    addActivityType: function(id) {
      if (data.selectedActivityTypes.indexOf(id) === -1) {
        data.selectedActivityTypes.push(id);
        this.trigger(data);
      }
    },

    removeActivityType: function(id) {
      var index = data.selectedActivityTypes.indexOf(id);
      if (index === -1) {
        data.selectedActivityTypes.splice(id, 1);
        this.trigger(data);
      }
    },

    clearActivityTypes: function() {
      data.selectedActivityTypes = [];
      this.trigger(data);
    },

    /**
     * @param  {[type]}
     * @return {[type]}
     */
    historyAdd: function(historydata) {
      // check if the current item is the same as the item we want to add. this happens when we go back in history.
      if (data.history.length === 0 || historydata.pathname !== data.history[data.history.length-1].pathname) {
        // console.log('add', historydata, data.history, data.future);
        data.history.push(historydata);
        this.trigger(data);
      }
    },

    historyBack: function() {
      data.future.push(data.history.pop());
      // console.log('go back', data.history, data.future);
      history.goBack();
    },

    historyForward: function() {
      data.history.push(data.future.pop());
      // console.log('go forward', data.history, data.future);
      history.goForward();
    },


    forceTrigger: function() {
      this.trigger(data);
    },


});
