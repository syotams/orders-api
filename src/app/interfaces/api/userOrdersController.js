'use strict';
import Order from '../../domain/models/orderModel';
import mongoose from 'mongoose';

exports.orders = function(req, res, next) {
	console.log('Fetch orders for user ' + req.params.id);

	Order.find({user: mongoose.Types.ObjectId(req.params.id)}, 'address user status products ')
	.populate('user')
    .exec(function (err, orders) {
      if (err) { return next(err); }
      // Successful
      res.json(orders);
    });
};