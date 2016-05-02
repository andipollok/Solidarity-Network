import React from 'react';
import createHashHistory from 'history/lib/createHashHistory';

import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Icon from '../General/Icon';

import { FormattedMessage } from 'react-intl';


const history = createHashHistory();

export default React.createClass({

  onClickBack() {
    StatusActions.historyBack();
  },

  onClickForward() {
    StatusActions.historyForward();
  },

  render() {

    var data = this.props.data;
    
    var pageHeadings = {
      news:       <FormattedMessage id='nav_news' defaultMessage='News'/>,
      activities: <FormattedMessage id='nav_activities' defaultMessage='Activities'/>,
      stories:    <FormattedMessage id='nav_stories' defaultMessage='Stories'/>,
      person: 'Person',
      group: 'Group'
    };

    var pageHeading = pageHeadings[data.status.currentPage];

    var barClasses = classNames( "top-bar", data.status.currentPage);

    if (data.status.history && data.status.history.length > 1) {
      var title = this.state.status.history[this.state.status.history.length-2].title;
      if (title && title !== '') {
        var BackButton = <Button onClick={this.onClickBack}>&lt; {title}</Button>;
      }
      else {
        var BackButton = <Button onClick={this.onClickBack}>&lt; Back</Button>;
      }
    }

    if (data.status.future && data.status.future.length > 0) {
      var title = data.status.future[data.status.future.length-1].title;
      if (title && title !== '') {
        var ForwardButton = <Button onClick={this.onClickForward}>{title}&gt;</Button>;
      }
      else {
        var ForwardButton = <Button onClick={this.onClickForward}>Forward &gt;</Button>;
      }
    }


    return (
      <div className="container-fluid hidden-md hidden-lg">
        <Row className={barClasses}>
          <Col className="box solid no-padding">
            <div className="top-flex">
              <div className="top-flex-left text-left">
                {BackButton}
              </div>
              <div className="top-flex-middle text-center">
                <h4>{pageHeading}</h4>
              </div>
              <div className="top-flex-right text-right">
                {ForwardButton}
              </div>
            </div>
          </Col>
        </Row>

      </div>
    );
  }
});

