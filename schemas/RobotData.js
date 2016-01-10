var mongoose = require('mongoose');
var db = mongoose.connection; 

var Schemas = {
    test:{
		name: String,
		count: Number,
		is: Boolean
	},
    tester:{
        age:Number,
        fav_color:String
    }
}

db.on('error', console.error);

db.once('open', function(){
    module.exports.refreshSchemas();
});

module.exports.addSchema = function(colname, object){
    mongoose.connection.db.listCollections().next(function(err, collinfo) {
        console.log(collinfo);
        //if (!collinfo) {
            Schemas[colname] = object;
            var collection = mongoose.model(colname, Schemas[colname]);
            module.exports[colname] = collection;
            module.exports['n' + colname] = function(obj){
                return new collection(obj);
            }
        //}
    });
}
module.exports.refreshSchemas = function(){
    for(var key in Schemas){
        var collection = mongoose.model(key, Schemas[key]);
        module.exports[key] = collection;
        module.exports['n' + key] = function(object){
            return new collection(object);
        }
    }
}

mongoose.connect('mongodb://127.0.0.1/test');