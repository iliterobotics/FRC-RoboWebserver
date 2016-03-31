var express = require("express");
var routes = require('./routes/robotRouterMain.js');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true,  limit: '50mb'}));

app.use(routes);
app.listen(443);
