/**
 * Created by Jeremy on 6/30/17.
 */

const app = require('../../express')
var multer = require('multer')
var upload = multer({
    dest: __dirname + '/../../public/assignment/uploads/images'
})       // _dirname is the current js file location in the file system

var widgets = [
    { "_id": "123", "name": "Gizmodo", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "name": "LOREM IPSUM", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "name": "LOREM IPSUM", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<h1>Lorem ipsum</h1>"}
]

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
    widget.pageId = pageId
    widget._id = new Date().getTime() + ""
    widgets.push(widget)
    res.sendStatus(200)
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId']
    var result = widgets
        .map(function (widget, index) {
            widget.index = index
            return widget
        })
        .filter(function (widget) {
            return widget.pageId === pageId
        })

    result != null ? res.json(result) : res.sendStatus(404)
}

function updateWidgetsOrder(req, res) {
    var pageId = req.params['pageId']
    var from = req.query.initial
    var to = req.query.final

    w = widgets.filter(function (widget) {
        return widget.pageId === pageId
    })

    // get element in all-widgets array
    var element = widgets[w[from].index]

    // insert element in all-widgets array
    widgets.splice(w[from].index, 1)
    widgets.splice(w[to].index, 0, element)

    w = widgets
        .map(function (widget, index) {
            widget.index = index
            return widget
        })
        .filter(function (widget) {
            return widget.pageId === pageId
        })
    res.json(w)
}

function findWidgetByWidgetId(req, res) {
    var widgetId = req.params['widgetId']
    var widget = widgets.find(function (w) {
        return w._id === widgetId
    })
    widget ? res.json(widget) : res.sendStatus(404)
}

function updateWidget(req, res) {
    var updatedWidget = req.body
    for (var i in widgets) {
        if (widgets[i]._id === updatedWidget._id) {
            widgets[i] = updatedWidget
            res.sendStatus(200)
            return
        }
    }
    res.sendStatus(404)
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId']
    var widgetToDelete = widgets.find(function (widget) {
        return widget._id === widgetId
    })
    if (widgetToDelete) {
        var index = widgets.indexOf(widgetToDelete)
        widgets.splice(index, 1)
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
}

function uploadImage(req, res) {
    var userId = req.body.userId
    var websiteId = req.body.websiteId
    var pageId = req.body.pageId
    var widgetId = req.body.widgetId

    var widget = widgets.find(function (w) {
        return w._id === widgetId
    })

    var imageFile = req.file

    widget.url = '/assignment/uploads/images/' + imageFile.filename

    var callbackUrl = '/assignment/#!/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget'
    res.redirect(callbackUrl)  // 上面两个 url 开始处别漏了 /
}
