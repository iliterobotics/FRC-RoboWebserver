var fs = require('fs');

exports.logGetCollection = function(collection){
	var logEntry = generateDateString() + ' --- Pulling collection:' + collection;
	fs.appendFile('./logs/get.log', logEntry + '\r\n', function(err){
		if(err){
			console.log('write error to get.log: ' + err);
		}
		else{
			console.log(logEntry);
		}
	});
}

exports.logGetObject = function(collection, id){
	var logEntry = generateDateString() + ' --- Pulling object w/ id:' + id + ' from collection:' + collection;
	fs.appendFile('./logs/get.log', logEntry + '\r\n', function(err){
		if(err){
			console.log('write error to get.log: ' + err);
		}
		else{
			console.log(logEntry);
		}
	});
}

exports.logPostDocument = function(collection, object){
    var logEntry = generateDateString() + ' --- Posting object w/ id:' + object._id + ' to collection:' + collection;
	fs.appendFile('./logs/post.log', logEntry + '\r\n', function(err){
		if(err){
			console.log('write error to post.log: ' + err);
		}
		else{
			console.log(logEntry);
		}
	});
}

generateDateString = function(){
    var date = new Date();
	return '' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();	
}