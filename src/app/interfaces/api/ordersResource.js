'use strict';

import Order from '../../domain/models/orderModel';
import OrdersApplicationService from '../../application/ordersApplicationService';
import mongoose from 'mongoose';

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


exports.create = [
    // Convert the genre to an array.
    (req, res, next) => {
        if(!(req.body.products instanceof Array)) {
            if(typeof req.body.products==='undefined') {
                req.body.products=[];
            }
            else {
                req.body.products = new Array(req.body.products);
            }
        }
        next();
    },

    // Validate fields.
    body('user', 'User must not be empty.').isLength({ min: 1 }).trim(),
    body('address', 'Adress must not be empty.').isLength({ min: 1 }).trim(),
  
    // Sanitize fields.
    sanitizeBody('*').trim().escape(),

    sanitizeBody('products.*').trim().escape(),

    // Process request after validation and sanitization
    (req, res, next) => {
        // THIS SHOULD BE INJECTED USING DI
        let ordersApplicationService = new OrdersApplicationService();

        ordersApplicationService.create(req.body, (err, success) => {
            if(err) {
                res.json({status: 'error', errors: err});
            }
            else {
                res.responseCode = 201;
                res.json({status: 'success'});
            }
        });
    }
];

exports.update = [
    // Convert the genre to an array.
    (req, res, next) => {
        if(!(req.body.products instanceof Array)) {
            if(typeof req.body.products==='undefined') {
                req.body.products=[];
            }
            else {
                req.body.products = new Array(req.body.products);
            }
        }
        next();
    },

    // Validate fields.
    body('user', 'User must not be empty.').isLength({ min: 1 }).trim(),
    body('address', 'Adress must not be empty.').isLength({ min: 1 }).trim(),
  
    // Sanitize fields.
    sanitizeBody('*').trim().escape(),

    sanitizeBody('products.*').trim().escape(),

    (req, res, next) => {
        // THIS SHOULD BE INJECTED USING DI
        let ordersApplicationService = new OrdersApplicationService();

        ordersApplicationService.update(req.params.id, req.body, (err, success) => {
            if(err) {
                res.json({status: 'error', errors: err});
            }
            else {
                res.responseCode = 201;
                res.json({status: 'success'});
            }
        });
    }
];

exports.archive = function(req, res) {
	
};

exports.all = function(req, res, next) {
    let criteria = {};

    if(req.user && req.user.role == 'user') {
        console.log('User orders is fetched rather then for admin');
        criteria = {user: mongoose.Types.ObjectId(req.user._id)};
    }

	Order.find(criteria, 'address user status products created_at ')
    .where({status: {$ne: 'Archived'}})
    .sort('-created_at')
    .populate('user')
    .exec(function (err, orders) {
      if (err) { return next(err); }
      // Successful
      res.json(orders);
    });
};

exports.get = function(req, res) {
    Order.findById(req.params.id, 'address user status products ')
    .populate('user')
    .exec(function (err, orders) {
      if (err) { return next(err); }
      // Successful
      res.json(orders);
    });
};