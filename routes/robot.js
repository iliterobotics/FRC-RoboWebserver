var Router = require('express').Router();
var db = require('../db.js');
var logger = require('../logger.js');
var clientQueue = require('./client_queue.js');
var listenedCollections = {};

Router.post('/:collection', function(req, res) {
    var timestamp = req.body.timestamp;
    var robotData = req.body.robotData;

    if(timestamp) {
		
    }
    else {
	}
	db.save(req.params.collection, robotData);
	clientQueue.addToQueue(req.params.collection, robotData);
    
    if(listenedCollections.hasOwnProperty(req.params.collection)){
        listenedCollections[req.params.collection].forEach(function(current, index, array){
            clientQueue.clearClientQueue(req.params.collection, current.ip);
            current.response.end('{docs:[' + JSON.stringify(robotData) + ']}');
        });
        listenedCollections[req.params.collection] = [];
    }
    
    logger.logPostDocument(req.params.collection, robotData);
	res.send('post recieved by server');
});

Router.get('/:collection', function(req, res) {
	logger.logGetCollection(req.params.collection);
	var queue = clientQueue.getClinetQueue(req.params.collection, req.connection.remoteAddress);
	if(queue && queue.length > 0){
		console.log('flushing queue for ' + req.params.collection + " " + req.connection.remoteAddress);
		res.send('{docs:' + JSON.stringify(queue) + '}');
		clientQueue.clearClientQueue(req.params.collection, req.connection.remoteAddress);
	}
    else{
        if(!listenedCollections.hasOwnProperty(req.params.collection)){
            listenedCollections[req.params.collection] = [];
        }
        listenedCollections[req.params.collection].push({response:res, ip:req.connection.remoteAddress});
    }
    clientQueue.addClientQueue(req.params.collection, req.connection.remoteAddress);
});

Router.get('/:collection/:id', function(req, res) {
	logger.logGetObject(req.params.collection, req.params.id);
	res.send('{debug:sucess}');
});

module.exports = Router;
