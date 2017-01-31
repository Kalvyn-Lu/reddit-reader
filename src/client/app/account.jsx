import $ from 'jquery';
import {address} from './constants.jsx';

export class Account {
	constructor() {
		this.data = {
			hashId : "",
			liked : []
		}
		
		this.login = this.login.bind(this);
	}

	login(username, password, callback) {
		$.post(address+'/account', {username: username, password: password}, (data, status) => {
			this.data.hashId = data.hashed;
			callback(data, status);
		});
	}
}