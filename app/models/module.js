var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ModuleSchema = new Schema({
    name: String,
    author: String,
    url: String,
    description: String,
    category: String,
    version: String,
    dofusVersion: String,
    lastUpdateDate: String
}, {
    versionKey: false
});

var Module = mongoose.model('Module', ModuleSchema);

Module.schema.path('name').validate(function(value) {
    return value.length > 3 && value.length < 20;
}, 'module name must be greater than 3 and less than 20');

Module.schema.path('name').validate(function(value) {
    return value.indexOf('_') != -1;
}, 'module name must contain underscore');

module.exports = Module;