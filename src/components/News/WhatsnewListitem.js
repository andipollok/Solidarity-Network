import React from 'react';
import classNames from 'classnames';
import { Link }  from 'react-router';
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap';

import Reflux from 'reflux';
import DataActions from '../../stores/DataActions';
import DataStore from '../../stores/DataStore';
import LanguageActions from '../../stores/LanguageActions';
import LanguageStore from '../../stores/LanguageStore';
import Helpers from '../../stores/Helpers.js';

import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';

import Icon from '../General/Icon';
import IconActivity from '../General/IconActivity';
import Avatar from '../General/Avatar';

export default React.createClass({

  mixins: [ Reflux.connect(LanguageStore, 'language'), Reflux.connect(DataStore, 'data') ],

  componentDidMount() {
    LanguageActions.forceTrigger();
    DataActions.forceTrigger();
  },

  render() {

    if (!Helpers.checkLanguageLoaded(this) || !this.props.data || !this.state.data || !this.state.data.loaded.all) {
      return <div></div>;
    }

    var link = '';
    var icon = '';

    if(this.props.data.activity.id) {
      var type = Helpers.getActivityTypeById(this.props.data.activity.typeId, this);
      link = 'activity/' + this.props.data.activity.id;
      icon = <IconActivity type={'activity-' + type.name} area='whatsnew' shape='empty'  size='small'/>
    }
    else if (this.props.data.group.id) {
      link = 'group/' + this.props.data.group.id;
      icon = <Icon type='whatsnew' area='whatsnew' shape='empty' size='small'/>
    }

    if (link) {
      var componentLink = <a href="" onClick={this.props.onClickHandler.bind(null, link)}>Open</a>;
    }

    var date = <p>
            <span className="grey"><FormattedRelative value={this.props.data.date} /></span>
          </p>;

    return (

      <Row>

        <Col md={12} className="bottom-buffer">

          <div className="box">

              <span className="cell align-top">{icon}</span>

              <span className="cell align-top"><Avatar imageUrl={this.props.data.person.pictureUrl} size='small'/></span>            

              <span className="cell padding-left">

                <FormattedMessage id={ 'whatsnew-' + this.props.data.type.replace(/\s+/g, '') } values={{
                  personName: this.props.data.person.name,
                  activityName: this.props.data.activity.name || '',
                  groupName: this.props.data.group.name || '',
                }} defaultMessage=' '/>
              </span>
              
              <span className="cell padding-left">
              
                {componentLink}

              </span>

          </div>

        </Col>

      </Row>
    );
  }
});
