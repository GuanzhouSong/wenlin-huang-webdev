/**
 * Created by Jeremy on 6/30/17.
 */

var app = require('../../express')

var pages = [
    { "_id": "321", "name": "Post 1", "pageId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "pageId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "pageId": "456", "description": "Lorem" }
]

app.post  ('/api/assignment/website/:websiteId/page', createPage)
app.get   ('/api/assignment/website/:websiteId/page', findAllPagesForWebsite)
app.get   ('/api/assignment/page/:pageId', findPageByPageId)
app.put   ('/api/assignment/page/:pageId', updatePage)
app.delete('/api/assignment/page/:pageId', deletePage)

function createPage(req, res) {
    var userId = req.params['userId']
    var page = req.body
    page.developerId = userId
    page._id = new Date().getTime() + ""
    pages.push(page)
    res.sendStatus(200);
}

function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId']
    var result = pages.filter(function(page) {
        return websiteId === page.websiteId
    })
    result != null ? res.json(pages) : res.sendStatus(404)
}

function findPageByPageId(req, res) {
    var pageId = req.params['pageId']
    var page = pages.find(function (p) {
        return p._id === pageId
    })
    page ? res.json(page) : res.sendStatus(404)
}

function updatePage(req, res) {
    var updatedPage = req.body
    for (var i in pages) {
        if (pages[i]._id === updatedPage._id) {
            pages[i] = updatedPage
            res.sendStatus(200)
            return
        }
    }
    res.sendStatus(404)
}

function deletePage(req, res) {
    var pageId = req.params['pageId']
    var pageToDelete = pages.find(function (page) {
        return page._id === pageId
    })
    if (pageToDelete) {
        var index = pages.indexOf(pageToDelete)
        pages.splice(index, 1)
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
}
