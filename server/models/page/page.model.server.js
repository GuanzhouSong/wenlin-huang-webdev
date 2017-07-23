var mongoose = require('mongoose')

var pageSchema = require('./page.schema.server')
var websiteModel = require('../website/website.model.server')

var pageModel = mongoose.model('pageModel', pageSchema)

pageModel.createPage = createPage
pageModel.findAllPagesForWebsite = findAllPagesForWebsite
pageModel.findPageById = findPageById
pageModel.updatePage = updatePage
pageModel.deletePage = deletePage

module.exports = pageModel

function createPage(websiteId, page) {
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel.addPage(websiteId, page._id)
        })
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({ _website: websiteId })
}

function findPageById(pageId) {
    return pageModel.findById(pageId)
}

function updatePage(pageId, page) {
    return pageModel.update({ _id: pageId }, { $set: page })
}

function deletePage(pageId) {
    var websiteId

    return pageModel
        .findById(pageId)
        .then(function (page) {
            websiteId = page._website
            return pageModel
                .remove({ _id: pageId })
        })
        .then(function () {
            return websiteModel.deletePage(websiteId, pageId)
        })
}
