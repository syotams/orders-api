'use strict';

import User from '../domain/models/userModel';
import Order from '../domain/models/orderModel';
import { validationResult } from 'express-validator/check';

export default class OrdersApplicationService {

	create(data, callback) {
		// TODO: should remove validationResult from here ASAP and use another validation system HERE!
		// currently we assume that validation rules has been already set in caller, and this assumption
		// should not be assumed! JUST DO NOT HAVE MUCH TIME :(
		const errors = validationResult(data);

		if (!errors.isEmpty()) {			
			callback(errors.array());
			return;
		}

		var order = new Order({
			address: data.address,
			user: data.user,
			products: data.products,
			status: 'Created'
		});

		order.save(function (err) {
		  if (err) {
		  	callback(err);
		  }
		  else {
		  	// saved!
		  	callback(null, true);
		  }
		});
	}

	update(id, data, callback) { 
		const errors = validationResult(data);

		if (!errors.isEmpty()) {			
			callback(errors.array());
			return;
		}

		var order = new Order({
			_id: id, // this row is very important unless you want to create a new record
			address: data.address,
			user: data.user,
			products: data.products,
			status: data.status
		});

		Order.findByIdAndUpdate(id, order, {}, callback);	
	}
}