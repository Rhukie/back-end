let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String

});

let Users =  mongoose.model('Users', UserSchema);

module.exports = Users;