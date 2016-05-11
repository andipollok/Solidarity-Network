import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';


export default React.createClass({

  showTypeSelector() {
   window.location.assign("#/activities/type");
  },

  render() {

    var data = this.props.data;

    var text = <span>
        <p>These are activities of all types.</p>
        <p>Are you looking for a certain kind of activity?</p>
        </span>

    if (data.status.selectedActivityTypes.length > 0) {
      text = <span>
          <p>
            These are all 
            { data.status.selectedActivityTypes.map(function(type) {
              return type;
            })}
            activities
          </p>
        </span>
    }

    return (
      <Row className="box padded infobox buffer text-center">

        {text}

        <Button bsSize="large" className="padded" onClick={ this.showTypeSelector }>Choose activity type</Button>
      
      </Row>
    );
  }
});
