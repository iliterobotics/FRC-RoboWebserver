var mongoose = require('mongoose');
var config = require('./config.js');
var schemas = require('./schemas/RobotData.js');

module.exports.connect = function() {
    mongoose.connect(config.mongoose_uri);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'mongo connection error:'));
    db.once('open', function (callback) {
		
    });

};

module.exports.save = function(collection, object) {
	if(collection === 'test') {
		var test = new schemas.ntest(object);
		test.save(function(err, test){
			if(err) console.error(err);
		});
	}
};

module.exports.get = function(collection, res) {
	schemas.Test.find(function(err, docs){
		if(err) console.error(err);
		if(docs){
			res.send({docs : docs});
		}
	});
};
