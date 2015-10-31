var express = require("express");
var routes = require('./routes/robot.js');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.PORT || 8083);
