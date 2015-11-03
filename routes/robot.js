var Router = require('express').Router();
var db = require('../db.js');

Router.post('/', function(req, res) {
    var timestamp = req.body.timestamp;
    var robotData = req.body.robotData;

    if(timestamp) {

    }
    else {

    }
	
});

module.exports = Router;
