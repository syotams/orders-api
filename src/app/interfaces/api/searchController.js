import User from '../../domain/models/userModel';

exports.search = 
	// TODO: sql injection
	(req, res, err) => {
		console.log('Search for ' + req.query.q);

		User.find({'first_name': { $regex: '.*' + req.query.q + '.*' } }, '_id first_name last_name email')
		.limit(10)
		.exec(function (err, users) {
			console.log(err);
	      	if (!users) { return error(res, {error: 'not found'}, 404); }
			res.json(users);
		});
	}
;