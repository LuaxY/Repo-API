var express        = require('express');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var BearerStrategy = require('./lib/passport-http-token').Strategy;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8888;

mongoose.connect('mongodb://127.0.0.1/repo');
var User        = require('./app/models/user');
var Application = require('./app/models/application');

passport.use(new BearerStrategy(function(token, done) {
    Application.findOne({ token: token }, function(err, application) {
        if (err) { return done(err); }
        if (!application) { return done(null, false); }

        User.findOne({ username: application.username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            return done(null, user);
        });
    });
}));

var router = express.Router();

router.use(function(req, res, next) {
    console.log(req.method + " " + req.originalUrl + ' ( Accept: ' + req.headers.accept + ' )');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to Repo API !' });
});

// ROUTES

var modules = require('./app/routes/modules')(passport);
var users   = require('./app/routes/users')(passport);

// -------

app.use(passport.initialize());

app.use('/api', router);
app.use('/api/modules', modules);
app.use('/api/users', users);

app.listen(port);
console.log('Server start on port ' + port);