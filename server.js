var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var passport   = require('passport');

// CONFIG

mongoose.connect('mongodb://127.0.0.1/repo');

var auth   = require('./app/auth')(passport);
var port   = 8888;

// ROUTES

var router = express.Router();

router.use(function(req, res, next) {
    console.log(req.method + " " + req.originalUrl + ' ( Accept: ' + req.headers.accept + ' )');
    next();
});

router.get('/', function(req, res) {
    res.json({ 
        users_url: '/api/users/{user}',
        modules_urls: '/api/modules/{module}',

    });
});

var modules = require('./app/routes/modules')(passport);
var users   = require('./app/routes/users')(passport);

// SERVER

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api', router);
app.use('/api/modules', modules);
app.use('/api/users', users);

app.listen(port);
console.log('Server start on port ' + port);