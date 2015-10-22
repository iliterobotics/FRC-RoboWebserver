var Router = require('express').Router();
var mongoose = require('mongoose');

Router.get('/', function(req, res) {
    res.send("Hello world!");
});

module.exports = Router;
