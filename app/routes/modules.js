var express = require('express');
var router = express.Router();
var Module = require('../models/module');

function currentDate()
{
    var now = new Date();
    return now.getFullYear() + "." + ('0' + (now.getMonth()+1)).slice(-2) + "." + ('0' + now.getDate()).slice(-2);
}

function isEmpty(obj) {
  return !Object.keys(obj).length;
}

module.exports = function(passport) {

    router.route('/')

        .get(passport.authenticate('bearer', { session: false }), function(req, res) {

            Module.find({}, { _id: false, __v: false }, function(err, modules) {
                if (err) { res.json({ message: err }); }
                else
                {
                    res.json(modules);
                }
            });

        })

        .post(function(req, res) {

            var module = new Module();

            module.name           = req.body.name;
            module.author         = req.body.author;
            module.url            = req.body.url;
            module.description    = req.body.description;
            module.category       = req.body.category;
            module.version        = req.body.version;
            module.dofusVersion   = req.body.dofusVersion;
            module.lastUpdateDate = currentDate();

            module.save(function(err) {
                if (err) { res.json(err); }
                else
                {
                    res.json({ message: 'module created' });
                }
            });

        });

    router.route('/:module_name')

        .get(function(req, res) {

            Module.find({ name: req.params.module_name }, { _id: false, __v: false }, function(err, module) {
                if (err) { res.json({ message: err }); }
                else if (isEmpty(module)) { res.status(404).json({ message: 'no module found' }); }
                else
                {
                    res.json(module);
                }
            });

        })

        .put(function(req, res) {

            Module.find({ name: req.params.module_name }, function(err, module) {
                if (err) { res.json({ message: err }); }
                else
                {
                    module.name           = req.body.name;
                    //module.author         = req.body.author;
                    module.url            = req.body.url;
                    module.description    = req.body.description;
                    module.category       = req.body.category;
                    module.version        = req.body.version;
                    module.dofusVersion   = req.body.dofusVersion;
                    module.lastUpdateDate = currentDate();

                    module.save(function(err) {
                        if (err) { res.json(err); }
                        else
                        {
                            res.json({ message: 'module updated' });
                        }
                    });
                }
                
            });

        })

        .delete(function(req, res) {

            Module.remove({ name: req.params.module_name }, function(err, module) {
                if (err) { res.json({ message: err }); }
                else
                {
                    res.json({ message: 'module deleted' });
                }
            });

        })

    return router;
}