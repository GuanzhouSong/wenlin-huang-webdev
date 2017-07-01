/**
 * Created by Jeremy on 6/30/17.
 */

var app = require('../../express')

var websites = [
    { "_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go", "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem" }
]

app.get('/api/assignment/user/:userId/website', findAllWebsitesByUser)

function findAllWebsitesByUser(req, res) {
    var userId = req.params['userId']
    var userWebsites = []
    for (var w in websites)
        if (websites[w].developerId === userId)
            userWebsites.push(websites[w])
    res.json(userWebsites)
}
