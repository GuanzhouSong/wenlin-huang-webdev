/**
 * Created by Jeremy on 6/14/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('websiteEditController', websiteEditController)

    function websiteEditController($routeParams, $location, websiteService) {
        var model = this

        model.userId = $routeParams["userId"]
        model.websiteId = $routeParams["websiteId"]
        model.findWebsiteByWebsiteId = findWebsiteByWebsiteId
        model.updateWebsite = updateWebsite
        model.deleteWebsite = deleteWebsite

        init()

        function init() {
            findAllWebsitesByUser(model.userId)
            findWebsiteByWebsiteId(model.websiteId)
        }

        function findAllWebsitesByUser(userId) {
            websiteService
                .findAllWebsitesByUser(userId)
                .then(function (websites) {
                    model.websites = websites
                })
        }

        function findWebsiteByWebsiteId(websiteId) {
            websiteService
                .findWebsiteByWebsiteId(websiteId)
                .then(function (website) {
                    model.website = website
                })
        }

        function updateWebsite(updatedWebsite) {
            websiteService
                .updateWebsite(updatedWebsite)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website')
                })
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId)
            $location.url('/user/' + model.userId + '/website')
        }
    }
})()
