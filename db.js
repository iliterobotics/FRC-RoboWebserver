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
    var schema = new schemas['n' + collection](object);
		schema.save(function(err, test){
			if(err) console.error(err);
		});
};

module.exports.get = function(collection, res) {
	schemas[collection].find(function(err, docs){
		if(err) console.error(err);
		if(docs){
			res.send({docs : docs});
		}
	});
};
