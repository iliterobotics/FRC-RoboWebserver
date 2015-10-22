var express = require("express");
var routes = require('./routes/robot.js');
var app = express();

app.use(routes);

app.listen(process.env.PORT || 8083);
