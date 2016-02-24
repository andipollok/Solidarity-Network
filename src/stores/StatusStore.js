import Reflux from 'reflux';
import Actions from './StatusActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';

var data = {};
var cookieNameJoin = "join";
var cookieNameCommunity = "community";

export default Reflux.createStore({

    listenables: [Actions],

    init: function() {
      var cookieValueJoin = cookie.load(cookieNameJoin) || false;
      var cookieValueCommunity = cookie.load(cookieNameCommunity) || "reckyIsF1Np63HlRc"; // -todo- default community is Ecublens, here it's hardcoded but we should let this set by DataStore
      data = {
        join: cookieValueJoin,
        community: cookieValueCommunity
      };
      this.setJoin(cookieValueJoin); // -todo- this only has to be done if default value for cookie has been set
      this.setCommunity(cookieValueCommunity); // -todo- this only has to be done if default value for cookie has been set
      this.trigger(data);
    },
 
    setJoin: function(state) {
      cookie.save(cookieNameJoin, state, { path: '/' });
      data.join = state;
      this.trigger(data);
    },

    setCommunity: function(state) {
      cookie.save(cookieNameCommunity, state, { path: '/' });
      data.community = state;
      this.trigger(data);
    },

    forceTrigger: function() {
      this.trigger(data);
    }

});
