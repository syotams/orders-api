var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	user: { type: Schema.ObjectId, ref: 'User', required: true },
	products: [],
	// FIX: Maybe it's better not to use enum for it's EVIL, use integer and map it to appliccation enum
	status: {type: String, required: true, enum:['Created', 'Delivered', 'Closed', 'Archived'], default:'Created'},
	address: {type: String, min: 2, max: 50},
	created_at: { type: Date, default: Date.now },
});

// Export model.
module.exports = mongoose.model('Order', OrderSchema);