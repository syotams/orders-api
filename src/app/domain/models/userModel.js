var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	first_name: {type: String, required: true, min:2, max: 30},
    last_name: {type: String, required: true, min:2, max: 30},
    email: {type: String, required: true, min:2, max:30},
    role: {type: String, enum: ['user', 'admin'], default:'user'}
});


// Export model.
module.exports = mongoose.model('User', UserSchema);