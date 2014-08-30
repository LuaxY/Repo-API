var express = require('express');
var router = express.Router();
var User = require('../models/user');

module.exports = function(passport) {

    router.route('/')

        .get(function(req, res) {

            User.find({},  { _id: false, __v: false, password: false }, function(err, users) {
                if (err) { res.json({ message: err }); }
                else
                {
                    res.json(users);
                }
            });

        })

        .post(function(req, res) {

            var user = new User();

            user.username = req.body.username;
            user.password = req.body.password;
            user.email    = req.body.email;

            user.save(function(err) {
                if (err) { res.json({ message: err }); }
                else
                {
                    res.json({ message: 'User created' });
                }
            });

        });

    router.route('/:user_username')

        .get(function(req, res) {

            User.find({ username: req.params.user_username }, { _id: false, __v: false, password: false }, function(err, user) {
                if (err) { res.json({ message: err }); }
                else
                {
                    res.json(user);
                }
            });

        })

        .put(function(req, res) {

            User.find({ username: req.params.user_username }, function(err, user) {
                if (err) { res.json({ message: err }); }
                else
                {
                    user.username = req.body.username;
                    user.password = req.body.password;
                    user.email    = req.body.email;

                    user.save(function(err) {
                        if (err) { res.json({ message: err }); }
                        else
                        {
                            res.json({ message: 'User updated' });
                        }
                    });
                }
            });

        })

        .delete(function(req, res) {

            User.remove({ username: req.params.user_username }, function(err, user) {
                if (err) { res.json({ message: err }); }
                else
                {
                    res.json({ message: 'User deleted' });
                }
            });

        })

    return router;
}