/**
 * Created by Jeremy on 6/20/17.
 */

var app = require('../../express')
var userModel = require('../models/user/user.model.server')

app.get   ('/api/assignment/user', findAllUsers)
app.get   ('/api/assignment/user/:userId', findUserById)
app.post  ('/api/assignment/user', createUser)
app.put   ('/api/assignment/user/:userId', updateUser)
app.delete('/api/assignment/user/:userId', deleteUser)

function findAllUsers(req, res) {
    var username = req.query['username']
    var password = req.query['password']
    if (username && password) {  // finding a particular user based on username & password passed using queryString
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user)  res.json(user)
                else       res.sendStatus(404)
            })
    } else if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user)  res.json(user)
                else       res.sendStatus(404)
            })
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users)
            })
    }
}

function findUserById(req, res) {
    var userId = req.params["userId"]

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user)
        }, function () {
            res.sendStatus(404)
        })
}

function createUser(req, res) {
    var user = req.body
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user)
        })
}

function updateUser(req, res) {
    var newUser = req.body
    userModel
        .updateUser(newUser._id, newUser)
        .then(function (status) {
            res.send(status)
        })
}

function deleteUser(req, res) {
    var userId = req.params['userId']
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status)
        })
}
