'use strict';

exports.error = function(res, error, status) {
	error.status = 'error';
	res.status(status || 400).json(error);
}

exports.created = function(res, entity) {
	err.status = 'success';
	res.status(status || 201);
	entity ? res.json(entity) : res.end();
}