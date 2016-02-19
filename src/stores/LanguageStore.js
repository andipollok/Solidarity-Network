import Reflux from 'reflux';
import Actions from './LanguageActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';

Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');

var data = {};
var cookieName = "language";


export default Reflux.createStore({

    listenables: [Actions],

    init: function() {
      var cookieValue = cookie.load(cookieName);
      var that = this;
      data = {
        languages: {},
        selected: ""
      };

      base('Languages').select({
          maxRecords: 20,
          view: "Main View"
      }).eachPage(function page(records, fetchNextPage) {

          records.forEach(function(record) {
              if (record.get('Name')) {
                data.languages[record.getId()] = {
                  name: record.get('Name'),
                  short: record.get('Short')
                };
                if (record.getId() == cookieValue) {
                  data.selected = record.getId();
                }
              }
          });
          // if no cookie was found matching a language id, select the default language english
          if (!data.selected) {
            var defaultLang = Object.keys(data.languages).filter(function(lang) { return data.languages[lang].short === "en"; })
            data.selected = defaultLang[0] || "";
          }

          that.setLanguage(data.selected);

      }, function done(error) {
          if (error) {
              console.log(error);
          }
      });

    },
 
    setLanguage: function(lang) {
      cookie.save(cookieName, lang, { path: '/' });
      data.selected = lang;
      this.trigger(data);
    },

    forceTrigger: function() {
      this.trigger(data);
    }

});
