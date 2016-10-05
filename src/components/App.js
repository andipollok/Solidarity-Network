import React from 'react';
import { Link }  from 'react-router';
// import createHashHistory from 'history/lib/createHashHistory';
// import withScroll from 'scroll-behavior/lib/withStandardScroll';
// 
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'react-bootstrap';

import classNames from'classnames';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import Helpers from '../stores/Helpers';
import LoginActions from '../stores/LoginActions';
import LoginStore from '../stores/LoginStore';
import SessionActions from '../stores/SessionActions';
import SessionStore from '../stores/SessionStore';

import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import frLocaleData from 'react-intl/locale-data/fr';
import deLocaleData from 'react-intl/locale-data/de';
import moment from 'moment';
import moment_locale_en from 'moment/locale/en-gb.js';
import moment_locale_fr from 'moment/locale/fr.js';
import moment_locale_de from 'moment/locale/de.js';
import ErrorMessage from './General/ErrorMessage';

import ActivityFilters from './Filters/ActivityFilters'

import iNoBounce from 'inobounce';

import attachFastClick from 'fastclick';
attachFastClick(document.body);

addLocaleData(enLocaleData);
addLocaleData(frLocaleData);
addLocaleData(deLocaleData);

var intldata = {
  locale: "en",
  messages: {}
};

var momentLocale = {
  'en': moment_locale_en,
  'fr': moment_locale_fr,
  'de': moment_locale_de
}

moment.locale('en', {
  week: {
    dow: 1 // Monday is the first day of the week.
  }
});


import Login from './Login/Login';

import Nav from './Nav/Nav';
import Top from './Nav/Top';
import Footer from './Nav/Footer';

// const history = withScroll(createHashHistory());

export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(StatusStore, 'status'), Reflux.connect(DataStore, 'data') ],

  setLanguage: function(lang) {
    LanguageActions.setLanguage(lang);
  },

  // propTypes: {
  //   loggedIn: React.PropTypes.bool.isRequired
  // },

  getInitialState() {
    return {
  //      loggedIn: LoginStore.isLoggedIn(this)
      session: {
        preferredLayout: "cards"
      },
      popup: null,
    };
  },

  toggleFiltersPopup() {
    if (this.state.popup) {
      document.getElementById('popup').style.display = 'none';
      this.setState({ popup: null});
    } else {
      document.getElementById('popup').style.display = 'block';
      this.setState({ popup: 'Filters'});
    }
  },

  setSessionVar( variable, value) {
    let modifiedState = { session: {} };
    modifiedState.session[variable] = value;
    this.setState(modifiedState);
  },

  componentWillMount() {
    LoginActions.checkSessionIsValid();
  },

  componentDidMount() {
    LanguageActions.forceTrigger();
    DataActions.forceTrigger();
    StatusStore.forceTrigger();

    iNoBounce.enable();
    // Listen for changes to the current location.
/*    const unlisten = history.listen(location => {
      StatusActions.historyAdd($.extend({}, location,
      {
        title: '',
        url: ''
      }));

    });
*/
  },

  render: function() {

    // console.log("Rendering App ");
    // console.log(this.props.children.props.route.name);
    // if ( this.props.children.props.route.name == "activities-month" ) { console.log("should show overlay"); } else { console.log("should hide overlay"); }
    // var overlay = document.getElementById('pleasewait');
    // // if ( overlay && _view == 'month' ) { overlay.style.display = 'block'; } else { console.log("could not find overlay"); }
    // if ( overlay && (this.props.children.props.route.name == "activities-month") ) { overlay.style.display = 'block'; } else { console.log("could not find overlay in App render"); }
    // // if ( overlay ) { overlay.style.display = 'block'; } else { console.log("could not find overlay in App render"); }

    if (!Helpers.checkDataLoaded(this) || !Helpers.checkLanguageLoaded(this)) {
      return <div></div>
    }

    // // if you wanted to restrict access to content
    // if (!LoginStore.isLoggedIn(this)) {
    //   return <Login></Login>
    // }

    if (this.state.language && this.state.language.selected) {
      intldata.locale = this.state.language.selected;
      intldata.messages = this.state.language.languages[this.state.language.selectedID].messages;
      moment.locale(intldata.locale, momentLocale[intldata.locale]);
    }

    if (this.state.data && this.state.data.errors.length > 0) {
      var error = <ErrorMessage {...this.state.data.errors[0]}/>;
    }

    // consolidate other data into data object to pass to children
    var data = this.state.data;
    data.language = this.state.language;
    data.status = this.state.status;
    data.area = Helpers.getAreaFromStatus(data);

    var flexContainerClasses = classNames( 'flex-container', {
      'backgroundGradient' : data.status.page === 'start'
    } );
    
    // POPUP

    var popupComponent = '';
    if (this.state.popup) {
      switch (this.state.popup) {
        case 'Filters':
          popupComponent = <ActivityFilters />;
          break;
      }
    }

    return (

      <IntlProvider {...intldata}>

        <div className={flexContainerClasses}>
    
          <div className="top-container">
            <Top data={data} setSessionVar={this.setSessionVar} toggleFiltersPopup={this.toggleFiltersPopup} />
          </div>

          {error}

          <div id="pleasewait">
            <Row className="box padded infobox top-buffer text-center">            
              <FormattedMessage id="loading"/>
            </Row>
          </div>

          <div className="main-container scrollable">

            <div id="popup">
                {popupComponent}
            </div>

            { React.cloneElement( this.props.children, { data: data, loggedIn: LoginStore.isLoggedIn(this), setSessionVar: this.setSessionVar, session: this.state.session } ) }
  
          </div>

          <Footer data={data} setSessionVar={this.setSessionVar}  />

        </div>

      </IntlProvider>
    )
  }

//          <Nav data={data}/>


});
