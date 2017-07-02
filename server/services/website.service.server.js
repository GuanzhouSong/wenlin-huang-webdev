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

app.post  ('/api/assignment/user/:userId/website', createWebsite)
app.get   ('/api/assignment/user/:userId/website', findAllWebsitesByUser)
app.get   ('/api/assignment/website/:websiteId', findWebsiteByWebsiteId)
app.put   ('/api/assignment/website/:websiteId', updateWebsite)
app.delete('/api/assignment/website/:websiteId', deleteWebsite)

function createWebsite(req, res) {
    var userId = req.params['userId']
    var website = req.body
    website.developerId = userId
    website._id = new Date().getTime() + ""
    websites.push(website)
    res.json(website)
}

function findAllWebsitesByUser(req, res) {
    var userId = req.params['userId']
    var userWebsites = []
    for (var w in websites)
        if (websites[w].developerId === userId)
            userWebsites.push(websites[w])
    res.json(userWebsites)
}

function findWebsiteByWebsiteId(req, res) {
    var websiteId = req.params['websiteId']
    var website = websites.find(function (w) {
        return w._id === websiteId
    })
    website ? res.json(website) : res.sendStatus(404)
}

function updateWebsite(req, res) {
    var updatedWebsite = req.body
    for (var i in websites) {
        if (websites[i]._id === updatedWebsite._id) {
            websites[i] = updatedWebsite
            res.sendStatus(200)
            return
        }
    }
    res.sendStatus(404)
}

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId']
    var websiteToDelete = websites.find(function (website) {
        return website._id === websiteId
    })
    if (websiteToDelete) {
        var index = websites.indexOf(websiteToDelete)
        websites.splice(index, 1)
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
}
