var express = require("express");
var routes = require('./routes/robotRouterMain.js');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true,  limit: '50mb'}));

app.use(routes);
app.listen(process.env.PORT || 8083);
