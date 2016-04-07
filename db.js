var mongoose = require('mongoose');
var config = require('./config.js');
var schemas = require('./schemas/robotSchemaLoader.js');

module.exports.connect = function() {
    mongoose.connect(config.mongoose_uri);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'mongo connection error:'));
    db.once('open', function (callback) {
		
    });

};

module.exports.save = function(collection, object, id) {
	console.log(object);
    schemas[collection].find({id:id}, function(err, docs){
        var replaced = false;
        if(docs){
            if(docs.length > 0){
                var schema = schemas[collection];
                schema.update({id: id}, {$set:object}, function(err){
                    replaced = true;
                    if(err)console.log(err);
                });
            }
            else{
                saveNew(collection, object);
            }
        }
        else{
            saveNew(collection, object);            
        }
    });
}

saveNew = function(collection, object){
    console.log('is a new object');
    var schema = new schemas['n' + collection](object);
    schema.save(function(err, test){
        if(err) console.error(err);
    });
}

module.exports.get = function(collection, res) {
	schemas[collection].find(function(err, docs){
		if(err) console.error(err);
		if(docs){
			res.send({docs : docs});
		}
	});
};

module.exports.getById = function(collection, id, res){
    console.log(collection, id);
	schemas[collection].find({id:id}, function(err, docs){
		if(err) console.error(err);
		if(docs){
			res.send({docs : docs});
		}
	});
};
