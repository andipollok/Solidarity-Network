import React from 'react';
import classNames from 'classnames';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

export default React.createClass({

  mixins: [Reflux.connect(LanguageStore, 'language')],

  render() {

    var divClass = classNames( 'col-md-4', 'box', 'white', 'linked', 'padded', 'text-center',
      {
        'selected': false
      }
    ); // selected may be needed later

    return (

        <div className={divClass} onClick={this.props.onClickHandler.bind(null, this.props.data.id)}>

          <h2>{this.props.data.name}</h2>

          <p></p>

          <p><FormattedMessage id="on" defaultMessage=" "/>
             &nbsp;<FormattedDate
                    value={this.props.data.date}
                    weekday="long"
                    day="numeric"
                    month="long"
                    year="numeric" /> 
              &nbsp;<span className="grey">(<FormattedRelative value={this.props.data.date} />)</span>
          </p>

          <p><p><FormattedMessage id='numberofphotos' values={{numPhotos: countMembers}}/></p></p>
          
        </div>

    );
  }
});
