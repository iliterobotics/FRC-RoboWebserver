var Router = require('express').Router();
var db = require('../db.js');
var logger = require('../logger.js');
var client;

Router.post('/:collection', function(req, res) {
    var timestamp = req.body.timestamp;
    var robotData = req.body.robotData;

    if(timestamp) {
		
    }
    else {
	}
	db.save(req.params.collection, robotData);
	if(client)db.get(req.params.collection, client);
	res.send('post recieved');
});


Router.get('/:collection', function(req, res) {
	logger.logGetCollection(req.params.collection);
	client = res;
});
Router.get('/:collection/:id', function(req, res) {
	logger.logGetObject(req.params.collection, req.params.id);
	res.send('{debug:sucess}');
});

module.exports = Router;
