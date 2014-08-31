var express = require('express');
var Module  = require('../models/module');
var utils   = require('../utils');

module.exports = function(passport) {

    return {

        all: function(req, res) {

            Module.find({}, { _id: false, __v: false }, function(err, modules) {
                if (err) { return res.json({ message: err }); }

                res.json(modules);
            });

        },

        get: function(req, res) {

            Module.findOne({ name: req.params.name }, { _id: false, __v: false }, function(err, module) {
                if (err) { return res.json({ message: err }); }
                if (utils.isEmpty(module)) { return res.status(404).json({ message: 'module not found' }); }

                res.json(module);
            });

        },

        update: function(req, res) {

            Module.findOne({ name: req.params.name }, function(err, module) {
                if (err) { return res.json({ message: err }); }

                module.name           = utils.update(module.name,         req.body.name);
                module.url            = utils.update(module.url,          req.body.url);
                module.description    = utils.update(module.description,  req.body.description);
                module.category       = utils.update(module.category,     req.body.category);
                module.version        = utils.update(module.version,      req.body.version);
                module.dofusVersion   = utils.update(module.dofusVersion, req.body.dofusVersion);
                module.lastUpdateDate = currentDate();

                module.save(function(err) {
                    if (err) { return res.json(err); }

                    res.json({ message: 'module updated' });
                });
                
            });

        },

        add: function(req, res) {

            var module = new Module();

            module.name           = utils.update(module.name,         req.body.name);
            module.author         = utils.update(module.author,       req.body.author);
            module.url            = utils.update(module.url,          req.body.url);
            module.description    = utils.update(module.description,  req.body.description);
            module.category       = utils.update(module.category,     req.body.category);
            module.version        = utils.update(module.version,      req.body.version);
            module.dofusVersion   = utils.update(module.dofusVersion, req.body.dofusVersion);
            module.lastUpdateDate = currentDate();

            module.save(function(err) {
                if (err) { return res.json(err); }

                res.json({ message: 'module created' });
            });

        },

        delete: function(req, res) {

            Module.remove({ name: req.params.name }, function(err, module) {
                if (err) { return res.json({ message: err }); }

                res.json({ message: 'module deleted' });
            });

        }

    };
};

function currentDate()
{
    var now = new Date();
    return now.getFullYear() + "." + ('0' + (now.getMonth()+1)).slice(-2) + "." + ('0' + now.getDate()).slice(-2);
}