import React from 'react';
import classNames from 'classnames';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import Helpers from '../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Icon from './Icon';

export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(DataStore, 'data') ],

  componentDidMount() {
    LanguageActions.forceTrigger();
    DataActions.forceTrigger();
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || !this.props.data) {
      return <div></div>;
    }

    var link = '';
    if (this.props.data.activity.id) {
      link = 'activity/' + this.props.data.activity.id;
    }
    else if (this.props.data.group.id) {
      link = 'group/' + this.props.data.group.id;
    }

    var divClass = classNames( 'col-md-4', 'box', 'white', 'linked', 'padded', 'text-center', 'whatsnew',
      {
        'selected': false
      }
    ); // selected may be needed later

    if(this.props.data.activity.id) {
      var icon = <Icon type={'activity-' + this.props.data.activity.type} area='whatsnew' shape='hexagon'/>
    }
    else {
      var icon = <Icon type='whatsnew' area='whatsnew' shape='hexagon'/>
    }

    return (
      <span>

        <div className={divClass} onClick={this.props.onClickHandler.bind(null, link)}>

          {icon}


          <h2><FormattedMessage id={ 'whatsnew-' + this.props.data.type.replace(/\s+/g, '') } values={{
              personName: this.props.data.person.name,
              activityName: this.props.data.activity.name || '',
              groupName: this.props.data.group.name || '',
            }} defaultMessage=' '/></h2>


          <p>
            <span className="grey"><FormattedRelative value={this.props.data.date} /></span>
          </p>

        </div>
      </span>
    );
  }
});