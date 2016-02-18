import React from 'react';
import cookie from 'react-cookie';
import classNames from 'classnames';

export default class extends React.Component {

  onClickJoined(state) {
    cookie.save('joined', state, { path: '/' });
    this.setState({joined: state});
  }

  constructor(props) {
    super(props);
    this.state = { joined: cookie.load('joined') || false };
  }

  render() {

    var divClassJoinedYes = classNames( 'col-md-6', 'box', 'half', 'white', 'linked', 'padded', 'centered',
      {
        'selected': this.state.joined == true
      }
    );
    var divClassJoinedNo = classNames( 'col-md-6', 'box', 'half', 'white', 'linked', 'padded', 'centered',
      {
        'selected': this.state.joined == false
      }
    );

    return (
      <div className="container">
        <h2>Have you joined the service yet?</h2>
        <div className="row">
          <div className={divClassJoinedYes} onClick={this.onClickJoined.bind(this, true)}>
            <h2>Yes</h2>
          </div>
          <div className={divClassJoinedNo} onClick={this.onClickJoined.bind(this, false)}>
            <h2>No</h2>
          </div>
        </div>
      </div>
    );
  }
};
