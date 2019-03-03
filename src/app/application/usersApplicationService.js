'use strict';

import User from '../domain/models/userModel';
import { validationResult } from 'express-validator/check';

export default class UsersApplicationService {

	create(data, callback) {
		// TODO: should remove validationResult from here ASAP and use another validation system HERE!
		// currently we assume that validation rules has been already set in caller, and this assumption
		// should not be assumed! JUST DO NOT HAVE MUCH TIME :(
		const errors = validationResult(data);

		if (!errors.isEmpty()) {			
			callback(errors.array());
			return;
		}

		User.findOne({email: data.email}, '_id email', (err, user) => {
			if(user) {
				callback({ email: 'already in use' });
				return;
			}

			var user = new User({
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				role: data.role
			});

			user.save(function (err) {
			  if (err) {
			  	callback(err);
			  }
			  else {
			  	// saved!
			  	callback(null, true);
			  }
			});
		});
	}

	update(id, data, callback) { 
		const errors = validationResult(data);

		if (!errors.isEmpty()) {			
			callback(errors.array());
			return;
		}

		User.findOne({email: data.email}, '_id', (err, user) => {
			if(user && user._id === id) {
				callback({ email: 'already in use' });
				return;
			}

			var user = new User({
				_id: id, // this row is very important unless you want to create a new record
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				role: data.role
			});

			User.findByIdAndUpdate(id, user, {}, callback);
		});
	}	
}