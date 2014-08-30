var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ApplicationSchema = new Schema({
    name: String,
    username: String,
    token: String,
    description: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Application', ApplicationSchema);