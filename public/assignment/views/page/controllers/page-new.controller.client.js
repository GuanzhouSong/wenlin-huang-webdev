/**
 * Created by Jeremy on 6/15/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('pageNewController', pageNewController)

    function pageNewController($routeParams, $location, pageService, currentUser) {
        var model = this

        model.userId = currentUser._id
        model.websiteId = $routeParams["websiteId"]

        model.createPage = createPage

        function createPage(websiteId, page) {
            pageService
                .createPage(websiteId, page)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page')
                }, function () {
                    alert('Something went wrong')
                })
        }
    }
})()
