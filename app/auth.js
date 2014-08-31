var User           = require('./models/user');
var Application    = require('./models/application');
var BearerStrategy = require('../lib/passport-http-token').Strategy;

module.exports = function(passport) {

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

    return {

        ensureAuthenticated: function(req, res, next) {
            passport.authenticate('bearer', function(err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.json({ message: 'Require valid user authentication' }); }

                req.user = user;
                return next();
            })(req, res, next);
        }
    };
}