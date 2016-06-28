import React from 'react';
// import Router from 'react-router';
// import Reflux from 'reflux';

import StatusActions from '../../stores/StatusActions';
import LoginActions from '../../stores/LoginActions';


// import AuthStore from '../../stores/AuthStore';
// import AuthActions from '../../actions/AuthActions';

import LoginStore from '../../stores/LoginStore';

// import App from '../App';

import md5 from 'js-md5';

export default React.createClass({

	getInitialState() {
		return {
			username: "Type your username",
			password: ""
		};
	},

	onJoinUsernameChange( event ) {
		this.setState( { joinusername: event.target.value } );
	},

	onJoinPasswordChange( event ) {
		this.setState( { joinpassword: event.target.value } );
	},

	onJoinTelephoneChange( event ) {
		this.setState( { jointelephone: event.target.value } );
	},

	onAuthUsernameChange( event ) {
		this.setState( { authusername: event.target.value } );
	},

	onAuthPasswordChange( event ) {
		this.setState( { authpassword: event.target.value } );
	    console.log( "MD5 of '" + event.target.value + "' : " + md5( event.target.value ) );
	},

	onClickLogin() {
		LoginActions.logIn( this.state.authusername, md5( this.state.authpassword ) );
	},

	onClickJoin() {
		LoginActions.join(
			this.state.joinusername,
			this.state.jointelephone,
			md5( this.state.joinpassword )
		);
	},

	render() {
		return (
			<div>
				<div>
					Login form
					<form role="form">
						<input
							type="text"
							value={this.state.authusername}
							onChange={this.onAuthUsernameChange}
						/>
						<input
							type="password"
							value={this.state.authpassword}
							onChange={this.onAuthPasswordChange}
						/>
	  					<button type="submit" onClick={this.onClickLogin}>Login</button>
					</form>
				</div>
				<br/>
				<br/>
				<div>
					Join form
					<form role="form">
						<input
							type="text"
							value={this.state.joinusername}
							onChange={this.onJoinUsernameChange}
						/>
						<input
							type="password"
							value={this.state.joinpassword}
							onChange={this.onJoinPasswordChange}
						/>
						<input
							type="text"
							value={this.state.jointelephone}
							onChange={this.onJoinTelephoneChange}
						/>
	  					<button type="submit" onClick={this.onClickJoin}>Join</button>
					</form>
				</div>
			</div>

		);
	}

});

// // We're using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
// reactMixin(Login.prototype, React.addons.LinkedStateMixin);


  // constructor() {
  //   this.state = {
  //     user: '',
  //     password: ''
  //   };
  // }

  // // This will be called when the user clicks on the login button
  // login(e) {
  //   e.preventDefault();
  //   // Here, we call an external AuthService. We'll create it in the next step
  //   Auth.login(this.state.user, this.state.password)
  //     .catch(function(err) {
  //       console.log("Error logging in", err);
  //     });
  // }

// <button type="submit" onClick={this.login.bind(this)}>Submit</button>
  // <div className="form-group">
  //         <input type="text" valueLink={this.linkState('user')}placeholder="Username" />
  //         <input type="password" valueLink={this.linkState('password')} placeholder="Password" />
  //       </div>

  //<button type="submit" onClick={this.onClickLogin}>Submit</button>
        

