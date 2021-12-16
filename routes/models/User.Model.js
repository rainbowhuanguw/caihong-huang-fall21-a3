const mongoose = require("mongoose")
const UserSchema = require('../schema/User.Schema').UserSchema

const UserModel = mongoose.model("User", UserSchema);

//TODO: create if the current user doesn't exist 
function insertUser(user) {
    return UserModel.create(user);
}

function getAllUsers() {
    return UserModel.find().exec();
}

function findUserByUsername(name) {
    return UserModel.findOne({username: name}).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    insertUser,
    getAllUsers,
    findUserByUsername,
};