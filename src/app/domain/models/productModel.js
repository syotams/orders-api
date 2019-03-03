var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: {type: String, required: true, min:2, max: 30},
    description: {type: String, max: 255},
    price: {type: Number, required: true}
});


// Export model.
module.exports = mongoose.model('Product', ProductSchema);