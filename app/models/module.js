var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// name validators

var name_validator = [
    { validator: /^(.*)_(.*)$/, msg: 'module name must contain underscore' },
    { validator: /^[a-zA-Z_]{3,20}$/, msg: 'module name must be greater or equal than 3 and less or equal than 20' }
];

// version validator

var version_validator = [
    { validator: /^\d.\d.\d$/, msg: 'version is not in format x.x.x'}
];

var ModuleSchema = new Schema({
    name: { type: String, validate: name_validator },
    author: String,
    url: String,
    description: String,
    category: String,
    version: { type: String, validate: version_validator },
    dofusVersion: String,
    lastUpdateDate: String
}, {
    versionKey: false
});

var Module = mongoose.model('Module', ModuleSchema);
module.exports = Module;