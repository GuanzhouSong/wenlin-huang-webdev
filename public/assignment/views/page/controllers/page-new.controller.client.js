/**
 * Created by Jeremy on 6/15/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('pageNewController', pageNewController)

    function pageNewController($routeParams, $location, pageService) {
        var model = this

        model.userId = $routeParams["userId"]
        model.websiteId = $routeParams["websiteId"]

        model.createPage = createPage

        function createPage(websiteId, page) {
            pageService.createPage(websiteId, page)
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page')
        }
    }
})()
