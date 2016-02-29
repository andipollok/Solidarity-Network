import React from 'react';
import classNames from 'classnames';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Icon from './Icon';

export default React.createClass({

  mixins: [Reflux.connect(DataStore, 'data')],

  componentDidMount() {
    DataActions.forceTrigger();
  },

  render() {

    var divClass = classNames( 'col-md-4', 'box', 'white', 'linked', 'padded', 'text-center', 'whatsnew',
      {
        'selected': false
      }
    ); // selected may be needed later

    if(this.props.data.activityId) {
      var icon = <Icon type={'activity-' + this.props.data.activity.type} area='whatsnew' shape='hexagon'/>
    }
    else {
      var icon = <Icon type='whatsnew' area='whatsnew' shape='hexagon'/>
    }

    return (
      <span>

        <div className={divClass} onClick={this.props.onClickHandler.bind(null, this.props.data.activity.id)}>

          {icon}

          <h2><FormattedMessage id={ 'whatsnew-' + this.props.data.type.replace(/\s+/g, '') } values={{
              personName: this.props.data.person.name,
              activityName: this.props.data.activityId ? this.props.data.activity.name : '',
              groupName: this.props.data.groupId ? this.props.data.group.name : '',
            }} defaultMessage=' '/></h2>

          <p>
            <span className="grey"><FormattedRelative value={this.props.data.date} /></span>
          </p>

        </div>
      </span>
    );
  }
});
