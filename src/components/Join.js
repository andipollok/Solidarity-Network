import React from 'react';
import cookie from 'react-cookie';
import classNames from 'classnames';

import Reflux from 'reflux';
import StatusActions from '../stores/StatusActions';
import StatusStore from '../stores/StatusStore';

export default React.createClass({

  mixins: [Reflux.connect(StatusStore, 'status')],

  onClickJoined(state) {
    StatusActions.setJoin(state);
  },

  componentDidMount() {
     StatusActions.forceTrigger();
  },

  render() {
    var selectJoin = <span></span>;

    if (this.state.status) {
      var divClassJoinedYes = classNames( 'col-md-6', 'box', 'half', 'white', 'linked', 'padded', 'centered',
        {
          'selected': this.state.status.join == true
        }
      );
      var divClassJoinedNo = classNames( 'col-md-6', 'box', 'half', 'white', 'linked', 'padded', 'centered',
        {
          'selected': this.state.status.join == false
        }
      );
      var selectJoin =
        <div>
          <div className={divClassJoinedYes} onClick={this.onClickJoined.bind(this, true)}>
            <h2>Yes</h2>
          </div>
          <div className={divClassJoinedNo} onClick={this.onClickJoined.bind(this, false)}>
            <h2>No</h2>
          </div>
        </div>;
    }

    return (
      <div className="container">
        <h2>Have you joined the service yet?</h2>
        <div className="row">
          {selectJoin}
        </div>
      </div>
    );
  }
});
