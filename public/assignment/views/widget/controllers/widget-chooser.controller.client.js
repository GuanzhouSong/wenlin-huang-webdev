/**
 * Created by Jeremy on 6/18/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('widgetChooserController', widgetChooserController)

    function widgetChooserController($routeParams) {
        var model = this

        model.userId = $routeParams["userId"]
        model.websiteId = $routeParams["websiteId"]
        model.pageId = $routeParams["pageId"]
        model.widgetTypes = ['Heading', 'Image', 'HTML', 'YouTube']
    }
})()
