import Reflux from 'reflux';
import Actions from './LanguageActions';
import cookie from 'react-cookie';

var language = "fr";
var cookieName = "language";

export default Reflux.createStore({

    listenables: [Actions],

    init: function() {
      language = cookie.load(cookieName);

      var that=this;
      setTimeout(function() {
        that.trigger(language);
      },0);
    },
 
    onSetLanguage: function(lang) {
      cookie.save(cookieName, lang, { path: '/' });
      language = lang;
      this.trigger(language);
    }

});
