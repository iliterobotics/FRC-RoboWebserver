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
	var testSchema = new mongoose.Schema({
		name: String,
		count: Number,
		is: Boolean
	});

    for(var key in Schemas){
        var collection = mongoose.model(key, testSchema);
        module.exports[key] = collection;
        module.exports['n' + key] = function(object){
            return new collection(object);
        }
    }
    
/*    var Test = mongoose.model('Test', testSchema);
	module.exports.Test = Test;
	module.exports.ntest = function(object){
		return new Test(object);
	};
*/    
	
});

mongoose.connect('mongodb://127.0.0.1/test');