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
    var username = req.query['username']
    var password = req.query['password'];
    if (username && password) {  // finding a particular user based on username & password passed using queryString
        for (var u in users) {
            var user = users[u];
            if (user.username === username && user.password === password) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    } else {
        res.json(users);
    }
}

function findUserById(req, res) {
    var userId = req.params["userId"];
    var user = users.find(function(user) {
        return userId == user._id;
    });
    user != null ? res.send(user) : res.sendStatus(404);
}
