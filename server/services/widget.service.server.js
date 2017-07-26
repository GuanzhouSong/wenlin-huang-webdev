/**
 * Created by Jeremy on 6/30/17.
 */

const app = require('../../express')
var multer = require('multer')
var upload = multer({
    dest: __dirname + '/../../public/assignment/uploads/images'
})       // _dirname is the current js file location in the file system

var widgetModel = require('../models/widget/widget.model.server')

app.post  ('/api/assignment/page/:pageId/widget', createWidget)
app.get   ('/api/assignment/page/:pageId/widget', findAllWidgetsForPage)
app.put   ('/api/assignment/page/:pageId/widget', updateWidgetsOrder)
app.get   ('/api/assignment/widget/:widgetId', findWidgetByWidgetId)
app.put   ('/api/assignment/widget/:widgetId', updateWidget)
app.delete('/api/assignment/widget/:widgetId', deleteWidget)
app.post  ('/api/upload', upload.single('image-file'), uploadImage)

function createWidget(req, res) {
    var pageId = req.params['pageId']
    var widget = req.body
    widget._page = pageId
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget)
        })
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId']
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets)
        }, function () {
            res.sendStatus(404)
        })
}

function updateWidgetsOrder(req, res) {
    var pageId = req.params['pageId']
    var from = req.query.initial
    var to = req.query.final

    widgetModel
        .updateWidgetsOrder(pageId, from, to)
        .then(function (data) {
            res.json(data)
        })
}

function findWidgetByWidgetId(req, res) {
    var widgetId = req.params['widgetId']
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget)
        }, function () {
            res.sendStatus(404)
        })
}

function updateWidget(req, res) {
    var updatedWidget = req.body
    widgetModel
        .updateWidget(updatedWidget._id, updatedWidget)
        .then(function (widget) {
            res.json(widget)
        }, function () {
            res.sendStatus(404)
        })
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId']
    widgetModel
        .deleteWidget(widgetId)
        .then(function () {
            res.sendStatus(200)
        })
}

function uploadImage(req, res) {
    var userId = req.body.userId
    var websiteId = req.body.websiteId
    var pageId = req.body.pageId
    var widgetId = req.body.widgetId

    widgetModel
        .findWidgetById(widgetId)
        .then(function (w) {
            var widget = w
            var imageFile = req.file
            widget.url = '/assignment/uploads/images/' + imageFile.filename
            return widget.save()
        })
        .then(function () {
            var callbackUrl = '/assignment/#!/website/' + websiteId + '/page/' + pageId + '/widget'
            res.redirect(callbackUrl)  // 上面两个 url 开始处别漏了 '/'
        })
}
