var mongoose = require('mongoose');
var config = require('./config.js');

module.exports.connect = function() {
    mongoose.connect(config.mongoose_uri);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'mongo connection error:'));
    db.once('open', function (callback) {
		
    });

};

module.exports.save = function(collection, object) {
	
};

module.exports.get = function(collection, id) {
	
};
