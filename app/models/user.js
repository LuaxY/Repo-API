var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    email: String
}, {
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema);