import React from 'react';
import createHashHistory from 'history/lib/createHashHistory';

import classNames from 'classnames';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Icon from '../General/Icon';

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

    if (data.status.title === '' || data.status.title === undefined) {
      return <div></div>;
    }

    // primary navigation
    if (data.status.title !== null) {

      var barClasses = classNames( "top-bar", data.status.page);

      var BackButton = <Button onClick={this.onClickBack}>&lt; Back</Button>;

      var primary = (
        <Row className={barClasses}>
          <Col className="box solid no-padding">
            <div className="top-flex">
              <div className="top-flex-left text-left">
                {data.status.showBackButton ? BackButton : null} 
              </div>
              <div className="top-flex-middle text-center">
                <h4>{data.status.title}</h4>
              </div>
              <div className="top-flex-right text-right">
                
              </div>
            </div>
          </Col>
        </Row>
      );

    };


    // secondary navigation
    if (data.status.secondaryNav !== null) {
      var barClassesSecondary = classNames( "top-bar secondary", data.status.page);
      var secondary = (
        <Row className={barClassesSecondary}> 
          {data.status.secondaryNav}
        </Row>
      );

    };

    return (
      <div className="container-fluid hidden-md hidden-lg">

        {primary}

        {secondary}

      </div>
    );
  }
});

