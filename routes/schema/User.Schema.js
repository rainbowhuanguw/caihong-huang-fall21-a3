const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username:  String,
    password:  String,
}, {
    collection: 'users'
})

