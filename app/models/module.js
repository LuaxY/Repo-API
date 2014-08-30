var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// name validators

function name_format(value) {
    return value.indexOf('_') != -1;
}

function name_size(value) {
    return value.length > 3 && value.length < 20;
}

var name_validator = [
    { validator: name_format, msg: 'module name must contain underscore' },
    { validator: name_size, msg: 'module name must be greater than 3 and less than 20' }
];

// version validator

function version_format() {

}

var version_validator = [
    { validator: /\d.\d.\d/, msg: 'version is not in format x.x.x'}
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