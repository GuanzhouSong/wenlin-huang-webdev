var mongoose = require('mongoose')

var widgetSchema = require('./widget.schema.server')

var pageModel = require('../page/page.model.server')
var widgetModel = mongoose.model('widgetModel', widgetSchema)

widgetModel.createWidget = createWidget
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage
widgetModel.findWidgetById = findWidgetById
widgetModel.updateWidget = updateWidget
widgetModel.deleteWidget = deleteWidget

widgetModel.updateWidgetsOrder = updateWidgetsOrder

module.exports = widgetModel

function createWidget(pageId, widget) {
    widget._page = pageId
    return widgetModel
        .create(widget)
        .then(function (widget) {
            return pageModel.addWidget(pageId, widget._id)
        })
}

function findAllWidgetsForPage(pageId) {
    return pageModel.findAllWidgetsForPage(pageId)
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId)
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({ _id: widgetId }, { $set: widget })
}

function deleteWidget(widgetId) {
    var pageId
    return widgetModel
        .findById(widgetId)
        .then(function (widget) {
            pageId = widget._page
            return widgetModel.remove({ _id: widgetId })
        })
        .then(function () {
            return pageModel.deleteWidget(pageId, widgetId)
        })
}

function updateWidgetsOrder(pageId, from, to) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var _widgets = page.widgets
            var widgetId = _widgets.splice(from, 1)[0]
            _widgets.splice(to, 0, widgetId)
            return page.save()
        })
}
