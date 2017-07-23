/**
 * Created by Jeremy on 6/30/17.
 */

var app = require('../../express')

var pageModel = require('../models/page/page.model.server')

app.post  ('/api/assignment/website/:websiteId/page', createPage)
app.get   ('/api/assignment/website/:websiteId/page', findAllPagesForWebsite)
app.get   ('/api/assignment/page/:pageId', findPageByPageId)
app.put   ('/api/assignment/page/:pageId', updatePage)
app.delete('/api/assignment/page/:pageId', deletePage)

function createPage(req, res) {
    var websiteId = req.params['websiteId']
    var page = req.body
    page._website = websiteId
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page)
        })
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId']
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages)
        }, function () {
            res.sendStatus(404)
        })
}

function findPageByPageId(req, res) {
    var pageId = req.params['pageId']
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page)
        }, function () {
            res.sendStatus(404)
        })
}

function updatePage(req, res) {
    var updatedPage = req.body
    pageModel
        .updatePage(updatedPage._id, updatedPage)
        .then(function (page) {
            res.json(page)
        }, function () {
            res.sendStatus(404)
        })
}

function deletePage(req, res) {
    var pageId = req.params['pageId']
    pageModel
        .deletePage(pageId)
        .then(function () {
            res.sendStatus(200)
        })
}
