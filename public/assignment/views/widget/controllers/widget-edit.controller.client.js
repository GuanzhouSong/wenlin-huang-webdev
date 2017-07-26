/**
 * Created by Jeremy on 6/19/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('widgetEditController', widgetEditController)

    function widgetEditController($routeParams, $location, widgetService, currentUser) {
        var model = this

        model.userId = currentUser._id
        model.websiteId = $routeParams["websiteId"]
        model.pageId = $routeParams["pageId"]
        model.widgetId = $routeParams["widgetId"]
        model.updateWidget = updateWidget
        model.deleteWidget = deleteWidget

        init()

        function init() {
            widgetService
                .findWidgetByWidgetId(model.widgetId)
                .then(function (widget) {
                    model.widget = widget
                })
        }

        function updateWidget(updatedWidget) {
            widgetService
                .updateWidget(updatedWidget)
                .then(function () {
                    $location.url('/website/' + model.websiteId
                                + '/page/' + model.pageId + '/widget/')
                })
        }

        function deleteWidget(widgetId) {
            widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url('/website/' + model.websiteId
                        + '/page/' + model.pageId + '/widget/')
                })
        }
    }
})()
