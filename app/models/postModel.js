var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = function() {
    var PostSchema = Schema({
        title: String,
        photoPath: String,
        user: String,
        date: {type: Date, default: Date.now}
    });

    return mongoose.model('Posts', PostSchema);
}