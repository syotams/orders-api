'use strict';

import User from '../domain/models/userModel';

exports.loadUser = function(req, res, next) {
	if(!req.headers.authorization) {
		return next(); 
	}

	User.findById(req.headers.authorization, '_id role ')
	.exec(function (err, user) {		
		if(user) {
			req.user = user;				
		}

		next();
	});
}