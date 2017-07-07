/**
 * Created by Jeremy on 6/11/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .factory("widgetService", function ($http) {
            var api = {}

            api.createWidget = createWidget
            api.findAllWidgetsForPage = findAllWidgetsForPage
            api.findWidgetByWidgetId = findWidgetByWidgetId
            api.updateWidget = updateWidget
            api.reorderWidgets = reorderWidgets
            api.deleteWidget = deleteWidget

            return api

            function createWidget(pageId, widget) {
                var url = '/api/assignment/page/' + pageId + '/widget'
                return $http.post(url, widget).then(function (response) {
                    return response.data
                })
            }

            function findAllWidgetsForPage(pageId) {
                var url = '/api/assignment/page/' + pageId + '/widget'
                return $http.get(url).then(function (response) {
                    return response.data
                })
            }

            function updateWidget(updatedWidget) {
                var url = '/api/assignment/widget/' + updatedWidget._id
                return $http.put(url, updatedWidget).then(function (response) {
                    return response.data
                })
            }

            function reorderWidgets(pageId, from, to) {
                var url = '/api/assignment/page/' + pageId + '/widget?initial=' + from + '&final=' + to
                return $http.put(url).then(function (response) {
                    return response.data
                })
            }

            function findWidgetByWidgetId(widgetId) {
                var url = '/api/assignment/widget/' + widgetId
                return $http.get(url).then(function (response) {
                    return response.data
                })
            }

            function deleteWidget(widgetId) {
                var url = '/api/assignment/widget/' + widgetId
                return $http.delete(url).then(function (response) {
                    return response.data
                })
            }
        })
})()
