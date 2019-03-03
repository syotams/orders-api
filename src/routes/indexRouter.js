var express = require('express');
var router = express.Router();

import usersResource from '../app/interfaces/api/usersResource';
import {error, success} from  '../app/helpers/responses';
const { check,validationResult } = require('express-validator/check');
import User from '../app/domain/models/userModel';
import searchController from '../app/interfaces/api/searchController';
import statsController from '../app/interfaces/api/statsController';

/* GET home page. */
router.get('', function(req, res, next) {
  res.render('index', { title: 'myShop' });
});

router.get('/stats', statsController.stats);
router.get('/search', searchController.search);

router.post('/auth/register', usersResource.create);
router.post('/auth/login', [
    // username must be an email
    check('email').isEmail()
  ], 

  (req, res, next) => {
	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	// WE DO NOT CHECK PASSWORD
	User.findOne({ email: req.body.email }, '_id')
	.exec(function (err, user) {
		console.log(err);
      	if (!user) { return error(res, {error: 'Unauthorized'}, 401); }

      	// JUST FOR CONVIENIENCE WE SEND USER ID, THIS SHOULD A REAL TOKEN ON PRODUCTION
		res.json({token: user._id}); 
	}); 
});

module.exports = router;
