var express = require("express");
var mongoose = require('mongoose');
var config = require('./config.js');
var app = express();

app.listen(process.env.PORT || 8083);
