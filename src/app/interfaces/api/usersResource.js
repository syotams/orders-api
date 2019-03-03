'use strict';

import User from '../../domain/models/userModel';
import UsersApplicationService from '../../application/usersApplicationService';
import {error, success} from  '../../helpers/responses';

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

import async from 'async';


exports.create = [
	// Validate fields.
    body('first_name', 'First name must not be empty.').isLength({ min: 1 }).trim(),
    body('last_name', 'Last name must not be empty.').isLength({ min: 1 }).trim(),
    body('email', 'Email must not be empty.').isEmail().trim(),
  
    // Sanitize fields.
    sanitizeBody('*').trim().escape(),

	// Process request after validation and sanitization
	(req, res, next) => {
		// THIS SHOULD BE INJECTED USING DI
		let usersApplicationService = new UsersApplicationService();

		usersApplicationService.create(req.body, (err, success) => {
			if(err) {
				return error(res, err);
			}
			else {
				res.responseCode = 201;
				res.json({status: 'success'});
			}
		});
	}
];

exports.update = [   
    // Validate fields.
    body('first_name', 'First name must not be empty.').isLength({ min: 1 }).trim(),
    body('last_name', 'Last name must not be empty.').isLength({ min: 1 }).trim(),
    body('email', 'Email must not be empty.').isLength({ min: 1 }).trim(),

    // Sanitize fields.
    sanitizeBody('*').trim().escape(),

    (req, res, next) => {
		// THIS SHOULD BE INJECTED USING DI
		let usersApplicationService = new UsersApplicationService();

		usersApplicationService.update(req.params.id, req.body, (err, success) => {
			if(err) {
				return error(res, err);
			}
			else {
				res.responseCode = 201;
				res.json({status: 'success'});
			}
		});
	}
];

exports.archive = function(req, res) {
	// never delete user from DB!!!
	res.success();
};

exports.all = function(req, res, next) {
	User.find({}, 'first_name last_name email')
    .exec(function (err, users) {
      console.log(err);
      console.log(users);
      if (err) { return next(err); }
      // Successful
      res.json(users);
    });
};

exports.get = function(req, res, next) {
	if(req.params.id == 'me') {
		req.params.id = req.headers.authorization;
	}

	User.findById(req.params.id, 'first_name last_name email role')
    .exec(function (err, user) {
      console.log(err);
      if (err) { return next(err); }
      // Successful
      res.json(user);
    });
};