import React from 'react';
import {Account} from '../account.jsx';
import {address} from '../constants.jsx';

class Login extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			username: "",
			password: ""
		}
	}
	
	render() {
		return(
			<div className="login">
				<form onSubmit={(event) => {this.handleSubmit(event, 
					this.props.route.account, 
					this.state.username, 
					this.state.password)}}>
					
					<label>
						Username:
						<input type="text" name="username" onChange={(event)=> {
							this.setState({
								username:event.target.value
							});
						}}/>
					</label>
					
					<label>
						Password:
						<input type="text" name="password" onChange={(event)=> {
							this.setState({
								password:event.target.value
							});
						}}/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
			</div>
		);
	}
	
	handleSubmit(event, account, username, password) {
		account.login(username, password, (data, status) => {
			this.props.router.push('/reader/hot');
		});
		event.preventDefault();
	}
}

Login.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

export default Login;