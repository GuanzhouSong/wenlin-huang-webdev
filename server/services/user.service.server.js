/**
 * Created by Jeremy on 6/20/17.
 */

var app = require('../../express');

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
];

app.get('/api/assignment/user', findAllUsers);
app.get('/api/assignment/user/:userId', findUserById);

function findAllUsers(req, res) {
    res.send(users);
}

function findUserById(req, res) {
    var userId = req.params["userId"];
    var user = users.find(function(user) {
        return userId == user._id;
    });
    user != null ? res.send(user) : res.sendStatus(404);
}
