import $ from 'jquery';

const address = 'localhost:3000'
class Account {
	constructor() {
		this.data = {
			hashId : "",
			liked : []
		}
	}

	login(username, password, callback) {
		$.post(address+'/account', username+password, function(data, status) {
			
		});
	}
}