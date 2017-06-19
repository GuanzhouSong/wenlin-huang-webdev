/**
 * Created by Jeremy on 6/11/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .factory("widgetService", function ($location) {
            var api = {};
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
            ];

            api.createWidget = createWidget;
            api.findWidgetsByPageId = findWidgetsByPageId;
            api.findWidgetByWidgetId = findWidgetByWidgetId;
            api.updateWidget = updateWidget;
            api.deleteWidget = deleteWidget;
            api.getWidgetCopy = getWidgetCopy;

            return api;

            function createWidget(pageId, widget) {
                widget._id = new Date().getTime() + "";
                widget.pageId = pageId;
                widgets.push(widget);
                return widget;
            }

            function findWidgetsByPageId(pageId) {
                return widgets.filter(function (widget) {
                    return widget.pageId === pageId;
                });
            }

            function updateWidget(widgetId, updatedWidget) {
                var widget = findWidgetByWidgetId(widgetId);
                var index = widgets.indexOf(widget);
                widgets[index] = updatedWidget;
            }

            function findWidgetByWidgetId(widgetId) {
                return widgets.find(function (widget) {
                    return widget._id === widgetId;
                });
            }

            function deleteWidget(widgetId) {
                var widgetToDelete = findWidgetByWidgetId(widgetId);
                var index = widgets.indexOf(widgetToDelete);
                widgets.splice(index, 1);
                $location.url('/login');
            }

            // returns a cloned widget object
            function getWidgetCopy(widget) {
                return angular.copy(widget);
            }

        });
})();
