var express = require("express");
var mongoose = require('mongoose');
var routes = require('./routes/robot.js');
var app = express();

app.use(routes);

app.listen(process.env.PORT || 8083);
