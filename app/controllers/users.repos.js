var express = require('express');
var User    = require('../models/user');
var Module  = require('../models/module');
var utils   = require('../utils');

module.exports = function(passport) {

    return {

        all: function(req, res) {

            Module.find({ author: req.params.username }, { _id: false, __v: false }, function(err, module) {
                if (err) { return res.json({ message: err }); }
                //if (utils.isEmpty(module)) { return res.status(404).json({ message: 'no modules found' }); }

                res.json(module);
            });

        },

        get: function(req, res) {

            if(req.params.repo.indexOf('.json') != -1)
            {
                req.params.repo = req.params.repo.replace('.json', '');

                Module.find({ author: req.params.username, name: req.params.repo }, { _id: false, __v: false }, function(err, module) {
                    if (err) { return res.json({ message: err }); }

                    res.json(module);
                });
            }
            else
            {
                Module.findOne({ author: req.params.username, name: req.params.repo }, { _id: false, __v: false }, function(err, module) {
                    if (err) { return res.json({ message: err }); }
                    if (utils.isEmpty(module)) { return res.status(404).json({ message: 'module not found' }); }

                    res.json(module);
                });
            }

        },

        update: function(req, res) {

        },

        add: function(req, res) {

        },

        delete: function(req, res) {

        },

        search: function(req, res) {

            req.params.repo = req.params.repo.replace('.json', '');

            Module.find({ author: req.params.username, name: { $regex : '.*'+req.params.repo+'.*' } }, { _id: false, __v: false }, function(err, module) {
                if (err) { return res.json({ message: err }); }
                //if (utils.isEmpty(module)) { return res.status(404).json({ message: 'no modules found' }); }

                res.json(module);
            });

        }

    };
};