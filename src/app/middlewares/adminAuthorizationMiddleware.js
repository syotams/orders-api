'use strict';

import User from '../domain/models/userModel';


function authorize(req, res, next) {
	if((req.headers.authorization && req.headers.authorization == req.params.id) || req.params.id == 'me') {
		next();
		return;
	}

	if(req.user && req.user.role == 'admin') {
		return next();
	}
	else {
		return endSession(res);
	}
}

function endSession(res) {
	res.status(403);
	return res.end();
}

module.exports = { authorize };