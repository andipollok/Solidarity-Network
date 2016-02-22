import Reflux from 'reflux';
import Actions from './LanguageActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';
import i18next from 'i18next';

Airtable.configure({ apiKey: 'keyI22v2hdm84ezJv' });
var base = new Airtable().base('appTOXg7AH1lJqSrT');

var data = {};
var cookieName = "language";


export default Reflux.createStore({

    listenables: [Actions],

    init: function() {
      this.loadInternational();
      var cookieValue = cookie.load(cookieName);
      var that = this;
      data = {
        languages: {},
        selected: "",
        loaded: false
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
                if (record.getId() === cookieValue) {
                  data.selectedID = record.getId();
                }
              }
          });
          // if no cookie was found matching a language id, select the default language english
          if (!data.selectedID) {
            var defaultLang = Object.keys(data.languages).filter(function(lang) { return data.languages[lang].short === "en"; })
            data.selectedID = defaultLang[0] || "";
          }
          data.loaded = true;
          that.setLanguage(data.selectedID);

      }, function done(error) {
          if (error) {
              console.log(error);
          }
      });

    },
 
    setLanguage: function(languageID) {
      cookie.save(cookieName, languageID, { path: '/' });
      data.selectedID = languageID;
      if (data.languages[languageID]) {
        data.selected = data.languages[languageID].short;
      }
      else {
        data.selected = "";
      }
      this.trigger(data);
    },

    loadInternational: function() {
      i18next.init({
        lng: 'en',
        resources: {
          en: {
            translation: {
              "key": "hello world"
            }
          }
        }
      }, (err, t) => {
        // initialized and ready to go!
        const hw = i18next.t('key'); // hw = 'hello world'
      });
    },

    forceTrigger: function() {
      this.trigger(data);
    }

});
