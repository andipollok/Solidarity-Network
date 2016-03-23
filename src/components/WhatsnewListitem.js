import React from 'react';
import classNames from 'classnames';
import { Link }  from 'react-router';
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../stores/DataActions';
import DataStore from '../stores/DataStore';
import LanguageActions from '../stores/LanguageActions';
import LanguageStore from '../stores/LanguageStore';
import Helpers from '../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Icon from './Icon';
import Avatar from './Avatar';

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

    var divClass = classNames( 'whatsnew' );

    if(this.props.data.activity.id) {
      var icon = <Icon type={'activity-' + this.props.data.activity.type} area='whatsnew' shape='empty'  size='small'/>
    }
    else {
      var icon = <Icon type='whatsnew' area='whatsnew' shape='empty' size='small'/>
    }

    var date = <p>
            <span className="grey"><FormattedRelative value={this.props.data.date} /></span>
          </p>;

    return (

      <Col md={12} className="bottom-buffer">

        <div className={divClass}>

          <p>

            <span className="cell">{icon}</span>

            <span className="cell"><Avatar imageUrl={this.props.data.person.pictureUrl} size='small'/></span>            

            <span className="cell">

              <FormattedMessage id={ 'whatsnew-' + this.props.data.type.replace(/\s+/g, '') } values={{
                personName: this.props.data.person.name,
                activityName: this.props.data.activity.name || '',
                groupName: this.props.data.group.name || '',
              }} defaultMessage=' '/>
              
              <a href="" onClick={this.props.onClickHandler.bind(null, link)}>Open</a>

            </span>


          </p>

        </div>

      </Col>
    );
  }
});
