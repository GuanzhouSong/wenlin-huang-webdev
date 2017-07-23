/**
 * Created by Jeremy on 6/30/17.
 */

var app = require('../../express')
var websiteModel = require('../models/website/website.model.server')

app.post  ('/api/assignment/user/:userId/website', createWebsiteForUser)
app.get   ('/api/assignment/user/:userId/website', findAllWebsitesByUser)
app.get   ('/api/assignment/website/:websiteId', findWebsiteByWebsiteId)
app.put   ('/api/assignment/website/:websiteId', updateWebsite)
app.delete('/api/assignment/user/:userId/website/:websiteId', deleteWebsite)

function createWebsiteForUser(req, res) {
    var userId = req.params['userId']
    var website = req.body
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website)
        })
}

function findAllWebsitesByUser(req, res) {
    var userId = req.params['userId']
    websiteModel
        .findAllWebsitesByUser(userId)
        .then(function (websites) {
            res.json(websites)
        }, function () {
            res.sendStatus(404)
        })
}

function findWebsiteByWebsiteId(req, res) {
    var websiteId = req.params['websiteId']
    websiteModel
        .findById(websiteId)
        .then(function (website) {
            res.json(website)
        }, function () {
            res.sendStatus(404)
        })
}

function updateWebsite(req, res) {
    var websiteId = req.params['websiteId']
    var updatedWebsite = req.body
    websiteModel
        .updateWebsite(websiteId, updatedWebsite)
        .then(function (website) {
            res.json(website)
        }, function () {
            res.sendStatus(404)
        })
}

function deleteWebsite(req, res) {
    var userId = req.params['userId']
    var websiteId = req.params['websiteId']
    websiteModel
        .deleteWebsite(userId, websiteId)
        .then(function (status) {
            res.send(status)
        }, function () {
            res.sendStatus(404)
        })
}
