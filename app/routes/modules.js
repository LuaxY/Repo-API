var express = require('express');
var router = express.Router();
var Module = require('../models/module');

function currentDate()
{
    var now = new Date();
    return now.getFullYear() + "." + ('0' + (now.getMonth()+1)).slice(-2) + "." + ('0' + now.getDate()).slice(-2);
}

function isEmpty(obj) {
    if(obj == null) { return true; }
    if(typeof obj == 'object') { return !Object.keys(obj).length; }
    return false;
}

function update(current, update) {
    if (!update || update == '' || update == current) { return current; }
    return update;
}

module.exports = function(passport) {

    router.route('/')

        .get(function(req, res) {

            Module.find({}, { _id: false, __v: false }, function(err, modules) {
                if (err) { return res.json({ message: err }); }

                res.json(modules);
            });

        })

        .post(passport.authenticate('bearer', { session: false }), function(req, res) {

            var module = new Module();

            module.name           = update(module.name,         req.body.name);
            module.author         = update(module.author,       req.body.author);
            module.url            = update(module.url,          req.body.url);
            module.description    = update(module.description,  req.body.description);
            module.category       = update(module.category,     req.body.category);
            module.version        = update(module.version,      req.body.version);
            module.dofusVersion   = update(module.dofusVersion, req.body.dofusVersion);
            module.lastUpdateDate = currentDate();

            module.save(function(err) {
                if (err) { return res.json(err); }

                res.json({ message: 'module created' });
            });

        });

    router.route('/:module_name')

        .get(function(req, res) {

            Module.findOne({ name: req.params.module_name }, { _id: false, __v: false }, function(err, module) {
                if (err) { return res.json({ message: err }); }
                if (isEmpty(module)) { return res.status(404).json({ message: 'module not found' }); }

                res.json(module);
            });

        })

        .put(passport.authenticate('bearer', { session: false }), function(req, res) {

            Module.findOne({ name: req.params.module_name }, function(err, module) {
                if (err) { return res.json({ message: err }); }

                module.name           = update(module.name,         req.body.name);
                module.url            = update(module.url,          req.body.url);
                module.description    = update(module.description,  req.body.description);
                module.category       = update(module.category,     req.body.category);
                module.version        = update(module.version,      req.body.version);
                module.dofusVersion   = update(module.dofusVersion, req.body.dofusVersion);
                module.lastUpdateDate = currentDate();

                module.save(function(err) {
                    if (err) { return res.json(err); }

                    res.json({ message: 'module updated' });
                });
                
            });

        })

        .delete(passport.authenticate('bearer', { session: false }), function(req, res) {

            Module.remove({ name: req.params.module_name }, function(err, module) {
                if (err) { return res.json({ message: err }); }

                res.json({ message: 'module deleted' });
            });

        })

    return router;
}