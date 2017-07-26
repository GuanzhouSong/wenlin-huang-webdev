/**
 * Created by Jeremy on 7/19/17.
 */

var mongoose = require('mongoose')
var userSchema = require('./user.schema.server')
var userModel = mongoose.model('userModel', userSchema)

userModel.createUser = createUser
userModel.findUserById = findUserById
userModel.findAllUsers = findAllUsers
userModel.findUserByUsername = findUserByUsername
userModel.findUserByCredentials = findUserByCredentials
userModel.updateUser = updateUser
userModel.deleteUser = deleteUser
userModel.addWebsite = addWebsite        // adds the website to the website[] in user
userModel.deleteWebsite = deleteWebsite  // removes the website to in website[] in user

module.exports = userModel

function createUser(user) {
    return userModel.create(user)
}

function findUserById(userId) {
    return userModel.findById(userId)
}

function findAllUsers() {
    return userModel.find()
}

function findUserByUsername(username) {
    return userModel.findOne({
        username: username
    })
}

function findUserByCredentials(username, password) {
    return userModel.findOne({
        username: username,
        password: password
    })
}

function updateUser(userId, newUser) {
    delete newUser.password  // to disallow certain attributes you don't want to update in newUser
    return userModel.update({ _id: userId }, { $set: newUser })
}

function deleteUser(userId) {
    return userModel.remove({ _id: userId })
}

function addWebsite(userId, websiteId) {
    return userModel                      // grab the user with the userId,
        .findById(userId)                 // push the website in its websites[]
        .then(function (user) {           // and save the updated user in database
            user.websites.push(websiteId)
            return user.save()            // wait until the promise to come back
        })
}

function deleteWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId)
            user.websites.splice(index, 1)
            return user.save()
        })
}
