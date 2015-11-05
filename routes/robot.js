var Router = require('express').Router();
var db = require('../db.js');

Router.post('/', function(req, res) {
    var timestamp = req.body.timestamp;
    var robotData = req.body.robotData;

    if(timestamp) {

    }
    else {

    }
	
	db.save(robotData);
	
});

Router.get('/', function(req, res){
	
});

module.exports = Router;
