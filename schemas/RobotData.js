var mongoose = require('mongoose');
var db = mongoose.connection; 

db.on('error', console.error);
db.once('open', function(){
	var testSchema = new mongoose.Schema({
		name: String,
		count: Number,
		is: Boolean
	});
	var Test = mongoose.model('Test', testSchema);
	module.exports = {Test : Test};
});

mongoose.connect('mongodb://127.0.0.1/test');