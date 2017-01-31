import $ from 'jquery';
import {address} from './constants.jsx';

export class Account {
	constructor() {
		this.data = {
			hashId : "",
			favorited : []
		}
		
		this.login = this.login.bind(this);
		this.handleFavorite = this.handleFavorite.bind(this);
	}

	login(username, password, callback) {
		$.post(address+'/account', {username: username, password: password}, (data, status) => {
			this.data.hashId = data.hashed;
			this.data.favorited = data.favorited ? data.favorited : [];
			callback(data, status);
		});
	}

	handleFavorite(id, callback) {
		$.post(address+'/favorite', {hashId:this.data.hashId, newFavorite: id}, (data, status) => {
			let index = this.data.favorited.indexOf(id);
			if(index > -1) {
				this.data.favorited.push(data.favorited);
			} else {
				this.data.favorited = this.data.favorited.splice(index, 1);
			}
			callback(data,status);
		});
	}
}