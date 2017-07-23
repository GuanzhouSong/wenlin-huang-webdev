var mongoose = require('mongoose')

var pageSchema = require('./page.schema.server')
var websiteModel = require('../website/website.model.server')

var pageModel = mongoose.model('pageModel', pageSchema)

pageModel.createPage = createPage
pageModel.findAllPagesForWebsite = findAllPagesForWebsite
pageModel.findPageById = findPageById
pageModel.updatePage = updatePage
pageModel.deletePage = deletePage
pageModel.addWidget = addWidget
pageModel.deleteWidget = deleteWidget

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
            return pageModel.remove({ _id: pageId })
        })
        .then(function () {
            return websiteModel.deletePage(websiteId, pageId)
        })
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId)
            return page.save()
        })
}

function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId)
            page.widgets.splice(index, 1)
            return page.save()
        })
}
