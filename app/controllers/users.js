var express = require('express');
var User    = require('../models/user');
var utils   = require('../utils');

module.exports = function(passport) {

    return {

        all: function(req, res) {

            // REQUIRE SYSTEM TOKEN
            User.find({},  { _id: false, __v: false, password: false }, function(err, users) {
                if (err) { return res.json({ message: err }); }

                res.json(users);
            });

        },

        get: function(req, res) {
            
            // FOR USER, DON'T DISPLAY EMAIL
            User.findOne({ username: req.params.username }, { _id: false, __v: false, password: false }, function(err, user) {
                if (err) { return res.json({ message: err }); }

                res.json(user);
            });

        },

        update: function(req, res) {

            if(req.user.username != req.params.username)
                return res.status(401).json({ message: 'you are not allowed to modify profile of another user' });

            User.findOne({ username: req.params.username }, function(err, user) {
                if (err) { return res.json({ message: err }); }
                if (utils.isEmpty(user)) { return res.status(404).json({ message: 'no user found' }); }

                // CHECK FIELDS UPDATE
                user.username = req.body.username;
                user.password = req.body.password;
                user.email    = req.body.email;

                user.save(function(err) {
                    if (err) { return res.json({ message: err }); }

                    res.json({ message: 'user updated' });
                });
            });

        },

        add: function(req, res) {

            // REQUIRE SYSTEM TOKEN
            var user = new User();

            // CHECK IF ALL FIELDS IS FILLED
            user.username = req.body.username;
            user.password = req.body.password;
            user.email    = req.body.email;

            user.save(function(err) {
                if (err) { return res.json({ message: err }); }

                res.json({ message: 'user created' });
            });

        },

        delete: function(req, res) {

            // REQUIRE SYSTEM TOKEN
            User.remove({ username: req.params.username }, function(err, user) {
                if (err) { return res.json({ message: err }); }

                res.json({ message: 'user deleted' });
            });

        }

    };
};