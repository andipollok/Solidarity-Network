import React from 'react';
import classNames from 'classnames';
import dateFormat from 'dateformat';

import Reflux from 'reflux';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';

export default React.createClass({

  mixins: [Reflux.connect(LanguageStore, 'language')],

  render() {

    var divClass = classNames( 'col-md-4', 'box', 'white', 'linked', 'padded', 'centered',
      {
        'selected': false
      }
    ); // selected may be needed later
    

    dateFormat.i18n = {
      dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
      ]
    };
    var dataFormatted = dateFormat(this.props.data.date, "dddd, mmmm dS, yyyy, h:MM:ss TT");

    return (

        <div className={divClass} onClick={this.props.onClickHandler.bind(null, this.props.data.id)}>

          <h2>{this.props.data.name}</h2>
          <p>{dataFormatted}</p>

        </div>

    );
  }
});
