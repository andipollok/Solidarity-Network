import React from 'react';
import classNames from 'classnames';
import { FormattedMessage, FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import moment from 'moment';

import Reflux from 'reflux';
import StatusActions from '../../stores/StatusActions';
import StatusStore from '../../stores/StatusStore';
import Helpers from '../../stores/Helpers.js';


export default React.createClass({

  getInitialState: function() {
    return {
      activities: [],
      activitiesFuture: [],
      foundActivities: false,
      foundActivitiesFuture: false
    };
  },

  componentDidMount() {
    StatusActions.setPage('stories');
    StatusActions.showBackButton(true);
    StatusActions.setSecondaryNav(null);
    StatusActions.forceTrigger();
  },


  render() {

    var data = this.props.data;

    var story = Helpers.getStoryById(this.props.params.id, data);

    StatusActions.setTitle(story.title);
    StatusActions.forceTrigger();

    return (
      <div className="container stories">

        <Row>
          <Col sm={12} className="top-buffer">

            <div className="card outline">

              <div className="text-center">

                <h1>{story.title}</h1>

              </div>

              <p className="top-buffer">
                {story.content}
              </p>

            </div>
          </Col>
          <Col sm={12} className="top-buffer">
            <p><FormattedMessage id="publishedon" defaultMessage="Published on"/>
                &nbsp;<FormattedDate
                      value={story.date}
                      weekday="long"
                      day="numeric"
                      month="long"
                      year="numeric" />
                &nbsp;<span className="grey">(<FormattedRelative value={story.date} />)</span>
            </p>
          </Col>
        </Row>

      </div>
    );
  }
});
