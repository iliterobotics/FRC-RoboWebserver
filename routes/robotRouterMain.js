var Router = require('express').Router();
var db = require('../db.js');
var logger = require('../logger.js');
var clientQueue = require('./client_queue.js');
var listenedCollections = {};
var RobotData = require('../schemas/robotSchemaLoader');
var zlib = require('zlib');

Router.post('/add_schema/:name', function(req, res){
    var timestamp = req.body.timestamp;
    var robotData = req.body.robotData;
    console.log('I\'ve just been sent a schema ' + req.params.name);
    RobotData.addSchema(req.params.name, robotData);
    res.end();
});

Router.post('/:collection/:id', function(req, res){
    var timestamp = req.body.timestamp;
    var robotData = req.body.robotData;

    if(timestamp) {
		
    }
    else {
	}
    db.save(req.params.collection, robotData, req.params.id);
    clientQueue.addToQueue(req.params.collection, null, robotData);
    clientQueue.addToQueue(req.params.collection, req.params.id, robotData);
    
    if(listenedCollections.hasOwnProperty(req.params.collection)){
        listenedCollections[req.params.collection].forEach(function(current, index, array){
            clientQueue.clearClientQueue(req.params.collection, null, current.ip);
            current.response.end('{docs:[' + JSON.stringify(robotData) + ']}', 'binary');
        });
        listenedCollections[req.params.collection] = [];
    }
    if(listenedCollections.hasOwnProperty(req.params.collection + req.params.id)){
        listenedCollections[req.params.collection + req.params.id].forEach(function(current, index, array){
            clientQueue.clearClientQueue(req.params.collection, req.params.id, current.ip);
            current.response.end('{docs:[' + JSON.stringify(robotData) + ']}', 'binary');
        });
        listenedCollections[req.params.collection + req.params.id] = [];
    }
    
    logger.logPostDocument(req.params.collection, req.params.id);
	res.send('post recieved by server');
});

Router.get('/:collection', function(req, res) {
	logger.logGetCollection(req.params.collection);
	var queue = clientQueue.getClinetQueue(req.params.collection, null, req.connection.remoteAddress);
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
        db.get(req.params.collection, res);
    }
    clientQueue.addClientQueue(req.params.collection, req.connection.remoteAddress);
});
Router.get('/:collection/:id', function(req, res) {
    logger.logGetObject(req.params.collection, req.params.id);
	var queue = clientQueue.getClinetQueue(req.params.collection, req.params.id, req.connection.remoteAddress);
	if(queue && queue.length > 0){
		console.log('flushing queue for ' + req.params.collection + " " + req.connection.remoteAddress);
		res.send('{docs:' + JSON.stringify(queue) + '}');
		clientQueue.clearClientQueue(req.params.collection, req.params.id, req.connection.remoteAddress);
	}
    else{
        if(!listenedCollections.hasOwnProperty(req.params.collection + req.params.id)){
            listenedCollections[req.params.collection + req.params.id] = [];
        }
        listenedCollections[req.params.collection + req.params.id].push({response:res, ip:req.connection.remoteAddress});
		db.getById(req.params.collection, req.params.id, res);
    }
    clientQueue.addClientQueue(req.params.collection, req.params.id, req.connection.remoteAddress);
});
Router.get('/direct/:collection/:id', function(req, res){
    db.getById(req.params.collection, req.params.id, res);
});
module.exports = Router;
