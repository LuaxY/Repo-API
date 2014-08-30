var express = require('express');
var router = express.Router();
var User = require('../models/user');

function isEmpty(obj) {
  return !Object.keys(obj).length;
}

module.exports = function(passport) {

    router.route('/')

        .get(function(req, res) {

            User.find({},  { _id: false, __v: false, password: false }, function(err, users) {
                if (err) { res.json({ message: err }); return; }

                res.json(users);
            });

        })

        .post(function(req, res) {

            var user = new User();

            user.username = req.body.username;
            user.password = req.body.password;
            user.email    = req.body.email;

            user.save(function(err) {
                if (err) { res.json({ message: err }); return; }

                res.json({ message: 'user created' });
            });

        });

    router.route('/:user_username')

        .get(function(req, res) {

            User.find({ username: req.params.user_username }, { _id: false, __v: false, password: false }, function(err, user) {
                if (err) { res.json({ message: err }); return; }

                res.json(user);
            });

        })

        .put(passport.authenticate('bearer', { session: false }), function(req, res) {

            if(req.user.username != req.params.user_username)
            {
                res.status(401).json({ message: 'you are not allowed to modify profile of another user' });
                return;
            }

            User.findOne({ username: req.params.user_username }, function(err, user) {
                if (err) { res.json({ message: err }); return; }
                if (isEmpty(user)) { res.status(404).json({ message: 'no user found' }); return; }

                user.username = req.body.username;
                user.password = req.body.password;
                user.email    = req.body.email;

                user.save(function(err) {
                    if (err) { res.json({ message: err }); return; }

                    res.json({ message: 'user updated' });
                });
            });

        })

        .delete(function(req, res) {

            User.remove({ username: req.params.user_username }, function(err, user) {
                if (err) { res.json({ message: err }); return; }

                res.json({ message: 'user deleted' });
            });

        })

    return router;
}