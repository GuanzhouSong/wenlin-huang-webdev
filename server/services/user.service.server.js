/**
 * Created by Jeremy on 6/20/17.
 */

var app = require('../../express')
var userModel = require('../models/user/user.model.server')

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(localStrategy))
passport.serializeUser(function (user, done) {
     done(null, user._id)
})

passport.deserializeUser(function (_id, done) {
    userModel
        .findUserById(_id)
        .then(function (user) {
            done(null, user)
        }, function (err) {
            done(err, null)
        })
})

// app.get   ('/api/assignment/user', findUserByCredentials)
app.post   ('/api/assignment/login', passport.authenticate('local'), login)
app.get    ('/api/assignment/checkLoggedIn', checkLoggedIn)

app.get   ('/api/assignment/user/:userId', findUserById)
app.post  ('/api/assignment/user', createUser)
app.put   ('/api/assignment/user/:userId', updateUser)
app.delete('/api/assignment/user/:userId', deleteUser)

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (user)  return done(null, user)
                return done(null, false)  // 如果身份验证失败, 则 false 会直接导致请求中断,
            },                             // 返回 401 Unauthorized; 否则继续执行之后的 login 函数
            function(err) {
                return done(err)
            }
        )
}

function login(req, res) {
    var user = req.user
    res.json(user)
}

function checkLoggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0')  // isAuthenticated() is a convenient function that checks
}                                                     // if passport has already authenticated the user in the session

function findUserByCredentials(req, res) {
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
    }
    // else {
    //     userModel
    //         .findAllUsers()
    //         .then(function (users) {
    //             res.json(users)
    //         })
    // }
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
        }, function () {
            res.sendStatus(404)
        })
}
