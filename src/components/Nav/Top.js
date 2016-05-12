import React from 'react';
import createHashHistory from 'history/lib/createHashHistory';

import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Icon from '../General/Icon';

import ViewSelectorButtons from '../Activities/ViewSelectorButtons';
import TypeSelectorButton from '../Activities/TypeSelectorButton';

import { FormattedMessage } from 'react-intl';


const history = createHashHistory();

export default React.createClass({

  onClickBack() {
    // StatusActions.historyBack();
    history.goBack();
  },

  onClickForward() {
    StatusActions.historyForward();
  },

  render() {

    var data = this.props.data;

    if (!data || data.status.currentPage === undefined || data.status.currentPage === 'start') {
      return <div></div>
    }

    var pageHeadings = {
      news:       <FormattedMessage id='nav_news' defaultMessage='News'/>,
      activities: <FormattedMessage id='nav_activities' defaultMessage='Activities'/>,
      activitiesday: <FormattedMessage id='nav_activities' defaultMessage='Activities'/>,
      stories:    <FormattedMessage id='nav_stories' defaultMessage='Stories'/>,
      settings: <FormattedMessage id='nav_settings' defaultMessage='Settings'/>,
      person: 'Person',
      group: 'Group',
      typeselector: 'Select activity type',
    };

    var showBackbutton = {
      news: false,
      activities: false,
      activitiesday: true,
      stories: false,
      person: true,
      group: true,
      typeselector: true
    }

    var pageHeading = pageHeadings[data.status.currentPage];

    var barClasses = classNames( "top-bar", data.status.currentPage);
    var barClassesSecondary = classNames( "top-bar secondary", data.status.currentPage);

    var BackButton = <Button onClick={this.onClickBack}>&lt; Back</Button>;

    // secondary navigation
    if (data.status.currentPage === 'activities') {

      var secondary = <Row className={barClassesSecondary}>
 
              <ViewSelectorButtons data={data}/>

        </Row>

    };

    return (
      <div className="container-fluid hidden-md hidden-lg">
        <Row className={barClasses}>
          <Col className="box solid no-padding">
            <div className="top-flex">
              <div className="top-flex-left text-left">
                {showBackbutton[data.status.currentPage] ? BackButton : null} 
              </div>
              <div className="top-flex-middle text-center">
                <h4>{pageHeading}</h4>
              </div>
              <div className="top-flex-right text-right">
                
              </div>
            </div>
          </Col>
        </Row>

        {secondary}

      </div>
    );
  }
});

