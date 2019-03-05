var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = function() {
    var UserSchema = Schema({
        name: String,
        password: String,
        date: {type: Date, default: Date.now}
    });

    return mongoose.model('Users', UserSchema);
}