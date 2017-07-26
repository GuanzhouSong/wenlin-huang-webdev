/**
 * Created by Jeremy on 6/18/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('widgetChooserController', widgetChooserController)

    function widgetChooserController($routeParams, currentUser) {
        var model = this

        model.userId = currentUser._id
        model.websiteId = $routeParams["websiteId"]
        model.pageId = $routeParams["pageId"]
        model.widgetTypes = ['Heading', 'Input', 'Image', 'HTML', 'YouTube']
    }
})()
