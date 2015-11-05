var fs = require('fs');

exports.logGetCollection = function(collection){
	var date = new Date();
	var dateString = '' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
	var logEntry = dateString + ' --- Pulling collection:' + collection;
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
	var date = new Date();
	var dateString = '' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
	var logEntry = dateString + ' --- Pulling object w/ id:' + id + ' from collection:' + collection;
	fs.appendFile('./logs/get.log', logEntry + '\r\n', function(err){
		if(err){
			console.log('write error to get.log: ' + err);
		}
		else{
			console.log(logEntry);
		}
	});
}