/**
 * Created by Jeremy on 6/14/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('pageListController', pageListController)

    function pageListController($routeParams, pageService) {
        var model = this

        model.userId = $routeParams["userId"]
        model.websiteId = $routeParams["websiteId"]

        init()

        function init() {
            findPagesByWebsiteId(model.websiteId)
        }

        function findPagesByWebsiteId(websiteId) {
            pageService
                .findPagesByWebsiteId(websiteId)
                .then(function (pages) {
                    model.pages = pages
                })
        }

    }
})()
