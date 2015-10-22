var Router = require('express').Router();

Router.get('/', function(req, res) {
    res.send("Hello world!");
});

module.exports = Router;
