var Router = require('express').Router();
var db = require('../db.js');
var logger = require('../logger.js');

Router.post('/', function(req, res) {
    var timestamp = req.body.timestamp;
    var robotData = req.body.robotData;

    if(timestamp) {
		
    }
    else {
	
	}
	
});
Router.get('/:collection', function(req, res) {
	logger.logGetCollection(req.params.collection);
	res.send('{debug:sucess}');
});
Router.get('/:collection/:id', function(req, res) {
	logger.logGetObject(req.params.collection, req.params.id);
	res.send('{debug:sucess}');
});

module.exports = Router;
