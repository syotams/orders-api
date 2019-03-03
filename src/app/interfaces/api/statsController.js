'use strict';

import Order from '../../domain/models/orderModel';
import User from '../../domain/models/userModel';
import OrdersApplicationService from '../../application/ordersApplicationService';
import mongoose from 'mongoose';

exports.stats = function(req, res, next) {

	let now = new Date();
	let startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	
	const aggregatorOpts = [
		{$match: {created_at: {$gt: startOfToday}}},
		{$project: {_id: 1, user: 1}},
	    {
	        $group: {
	            _id: "$user",
	            count: { $sum: 1 }
	        }
	    }
	];

	Order.aggregate(aggregatorOpts)
	.exec(function (err, result) {
      console.log(err);
      if (err) { return next(err); }
      // Successful

      User.populate(result, {path: "_id"}, function(err, result) {
      	if(err) {return next(err);}

      	res.json(result);
      });      
    });
}