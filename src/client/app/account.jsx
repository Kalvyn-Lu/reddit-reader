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
		}, "json").fail(() => {
			errorCallback();
		});
	}

	handleFavorite(post, callback) {
		$.post(address+'/favorite', {hashId:this.data.hashId, newFavorite: post}, (data, status) => {
			let index = this.indexOfPost(post);
			if(index == -1) {
				this.data.favorited.push(post);
				console.log(this.data.favorited);
			} else {
				this.data.favorited.splice(index, 1);
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
	
    indexOfPost(post) {
        for(let i = 0; i < this.data.favorited.length; i++) {
            let listId = this.data.favorited[i].data.id;
            if(listId == post.data.id) return i;
        }
        return -1;
    }
}