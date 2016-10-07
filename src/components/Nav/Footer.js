import React, {Component, PropTypes} from 'react';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';

import {Link}  from 'react-router';

import classNames from'classnames';

import IconButton from '../General/IconButton';
import Icon from '../General/Icon';

const noButton = {
  icon: null,
  label: null,
  callback: undefined,
};

export default React.createClass({

  getHelpButtonData() {

    var setSessionVar = this.props.setSessionVar;

    var data = this.props.data;

    switch (data.status.page) {

      case '':
      case 'start':
        return noButton;
        break;

      default:
        return {
          icon: 'help',
          callback: undefined, //setSessionVar.bind(null, "preferredLayout", "list"),
        };
        break;

    }

  },

  render() {

    // const {formatMessage} = this.props.intl;
    // console.log(formatMessage); 
    var settings = <p><Link to="/settings">Settings</Link></p>

    // Help button

    let helpIconFolder = 'service';

    let helpIconClasses = classNames( 'helpIcon', 'divLink', {
      'active': true // TODO clarify whether that means highlighted or enabled
    });

    let helpButtonData = this.getHelpButtonData();

  	let helpIcon = (
      <IconButton type={helpButtonData.icon} folder={helpIconFolder}
        color='help' size='medium' isActive={false} labelAlignment='left' iconPosition='left'
        label={'test'} />
    );
    
    console.log("here");

    if (helpButtonData.icon === null) {
      helpIcon = undefined;
    }

    var HelpIconComponent = ( <div className={helpIconClasses} id="helpIcon" onClick={helpButtonData.callback}>
      {helpIcon}
    </div> );


    return (
      <footer>

        <div className="bottom-flex-left text-left">
          {HelpIconComponent}
          <FormattedMessage id="needhelp"/>
        </div>

      </footer>
    );
  }
});