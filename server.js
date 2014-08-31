var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var passport   = require('passport');

mongoose.connect('mongodb://127.0.0.1/repo');

var auth   = require('./app/auth')(passport);
var port   = 8888;
var app    = express();

require('./app/routes')(app, passport, auth);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.listen(port);

console.log('Server start on port ' + port);