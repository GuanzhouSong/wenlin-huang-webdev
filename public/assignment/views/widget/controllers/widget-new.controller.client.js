/**
 * Created by Jeremy on 6/19/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('widgetNewController', widgetNewController)

    function widgetNewController($routeParams, $location, widgetService, currentUser) {
        var model = this

        model.userId = currentUser._id
        model.websiteId = $routeParams["websiteId"]
        model.pageId = $routeParams["pageId"]
        model.createWidget = createWidget

        init()

        function init() {
            model.widget = {
                widgetType: $routeParams["widgetType"].toUpperCase()
            }
        }

        function createWidget(pageId, widget) {
            widgetService
                .createWidget(pageId, widget)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget/')
                })
        }
    }
})()
