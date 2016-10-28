import * as buffer from 'buffer';
import AsyncStorage from 'react-native';

var _ = require('lodash'); 
const authKey = 'auth';
const userKey = 'user' ;
class AuthService {
	getAuthInfo(cb){
		AsyncStorage.multiGet([authKey,userKey], (err,val) => {
			if(err){
				return cb(err);
			}
			
			if(!val){
				return cb();
			}

			var zippedObj = _.zipObject(val);
			if(!zippedObj['authKey']){
				return cb();
			}

			var authInfo = {
				headers : {
					Authorization : 'Basic ' + zippedObj[authKey]
				},
				user: JSON.parse(zippedObj[userKey])
			} 

			return cb(null, authInfo);
		});
	}

	login(creds, cb){
		var b = new buffer.Buffer(creds.username+':'+creds.password);
		var encodedAuth = b.toString('base64');
		fetch('https://api.github.com/user', {
			headers: {
				'Authorization' : 'Basic ' + encodedAuth
			}
		})
		.then((response)=>{
			if(response.status>=200 && response.status<300){
				return response;
			}
			
			throw {
				badCredentials : response.status==401,
				unknownError : response.status != 401
			}
		})
		.then((response)=>{
			return response.json();
		})
		.then((result)=>{ 
			AsyncStrorage.multiSet([
				[authKey, encodedAuth],
				[userKey, JSON.stringify(result)]
				],(err)=>{
					if(err){
						throw err;
					}
					return cb({success: true});
				})
			
		})
		.catch((err)=>{
			return cb(err)
		});

	}
}

module.exports = new AuthService();  