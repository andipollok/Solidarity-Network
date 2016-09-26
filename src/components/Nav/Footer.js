import React from 'react';
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

    var settings = <p><Link to="/settings">Settings</Link></p>

    // Help button

    let helpIconFolder = 'service';

    let helpIconClasses = classNames( 'helpIcon', 'divLink', {
      'active': true // TODO clarify whether that means highlighted or enabled
    });

    let helpButtonData = this.getHelpButtonData();

	let helpIcon = <IconButton type={helpButtonData.icon} folder={helpIconFolder} size='medium' isNav={false} isActive={false} labelAlignment='center' iconPosition='left' label="Need help" />;
      
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
        </div>

      </footer>
    );
  }
});