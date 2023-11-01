require('dotenv').config();
let mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect( process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	age: Number,
	favouriteFoods: [String]
});

module.exports = mongoose.model('Person', personSchema);