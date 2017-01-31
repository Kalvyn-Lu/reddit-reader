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

	login(username, password, successCallback, errorCallback) {
		$.post(address+'/account', {username: username, password: password}, (data, status) => {
			this.data.hashId = data.hashed;
			this.data.favorited = data.favorited ? data.favorited : [];
			successCallback(data, status);
		}).fail(() => {
			errorCallback();
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
	
	create(username, password, callback, errorCallback) {
		$.post(address+'/newAccount', {username: username, password: password}, (data, status) => {
			callback(data, status);
		}).fail(() => {
			errorCallback();
		});
	}
}