import Reflux from 'reflux';
import Actions from './LanguageActions';
import cookie from 'react-cookie';
import Airtable from 'airtable';
import AirtableConfig from './AirtableConfig';

import messages_en from '../languages/en.json';
import messages_fr from '../languages/fr.json';

var messages = {
  en: messages_en,
  fr: messages_fr
}

Airtable.configure({ apiKey: AirtableConfig.apiKey });
var base = new Airtable().base(AirtableConfig.base);

var data = {};
var cookieName = "language";


export default Reflux.createStore({

    listenables: [Actions],

    init: function() {
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
                  short: record.get('Short'),
                  messages: messages[record.get('Short')]
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

    forceTrigger: function() {
      this.trigger(data);
    }

});
