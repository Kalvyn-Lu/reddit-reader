const address = 'localhost:3000'
class Account {
	constructor() {
		this.data = {
			hashId = "",
			liked = []
		}
	}

	function login(username, password, callback) {
		$.post(address+'/account', username+password, function(data, status) {
			
		});
	}
}