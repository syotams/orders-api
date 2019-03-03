
exports.authorize = function(req, res, next) {
	if(req.headers.authorization == req.params.id) {
		next();
		return;
	}	
}