var express = require('express');
var router = express.Router();
var User = require('../models/user');

function isEmpty(obj) {
    if(obj == null) { return true; }
    if(typeof obj == 'object') { return !Object.keys(obj).length; }
    return false;
}

module.exports = function(passport) {

    router.route('/')

        // REQUIRE SYSTEM TOKEN
        .get(function(req, res) {

            User.find({},  { _id: false, __v: false, password: false }, function(err, users) {
                if (err) { return res.json({ message: err }); }

                res.json(users);
            });

        })

        // REQUIRE SYSTEM TOKEN
        .post(function(req, res) {

            var user = new User();

            // CHECK IF ALL FIELDS IS FILLED
            user.username = req.body.username;
            user.password = req.body.password;
            user.email    = req.body.email;

            user.save(function(err) {
                if (err) { return res.json({ message: err }); }

                res.json({ message: 'user created' });
            });

        });

    router.route('/:user_username')

        .get(function(req, res) {

            // FOR USER, DON'T DISPLAY EMAIL
            User.findOne({ username: req.params.user_username }, { _id: false, __v: false, password: false }, function(err, user) {
                if (err) { return res.json({ message: err }); }

                res.json(user);
            });

        })

        .put(passport.authenticate('bearer', { session: false }), function(req, res) {

            if(req.user.username != req.params.user_username)
                return res.status(401).json({ message: 'you are not allowed to modify profile of another user' });

            User.findOne({ username: req.params.user_username }, function(err, user) {
                if (err) { return res.json({ message: err }); }
                if (isEmpty(user)) { return res.status(404).json({ message: 'no user found' }); }

                // CHECK FIELDS UPDATE
                user.username = req.body.username;
                user.password = req.body.password;
                user.email    = req.body.email;

                user.save(function(err) {
                    if (err) { return res.json({ message: err }); }

                    res.json({ message: 'user updated' });
                });
            });

        })

        .delete(function(req, res) {

            // REQUIRE SYSTEM TOKEN
            User.remove({ username: req.params.user_username }, function(err, user) {
                if (err) { return res.json({ message: err }); }

                res.json({ message: 'user deleted' });
            });

        })

    return router;
}