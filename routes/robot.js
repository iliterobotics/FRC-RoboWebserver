var Router = require('express').Router();
var mongoose = require('mongoose');

Router.post('/', function(req, res) {
    var timestamp = req.body.timestamp;
    var robotData = req.body.robotData;

    if(timestamp) {

    }
    else {

    }

    res.end();
});

module.exports = Router;
