import Reflux from 'reflux';
import Actions from './StatusActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';

Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');

var data = {};
var cookieNameJoin = "joinStatus";

export default Reflux.createStore({

    listenables: [Actions],

    init: function() {
      var cookieValueJoin = cookie.load(cookieNameJoin) || false;
      data = {
        join: cookieValueJoin
      };
      // this.trigger(data);
    },
 
    setJoin: function(state) {
      cookie.save(cookieNameJoin, state, { path: '/' });
      data.join = state;
      this.trigger(data);
    },

    forceTrigger: function() {
      this.trigger(data);
    }

});
