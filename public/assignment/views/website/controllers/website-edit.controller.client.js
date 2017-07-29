/**
 * Created by Jeremy on 6/14/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('websiteEditController', websiteEditController)

    function websiteEditController($routeParams, $location, websiteService, currentUser) {
        var model = this

        model.userId = currentUser._id
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
            if (!updatedWebsite || !updatedWebsite.name || updatedWebsite.name === '') {
                model.error = 'Website name is required.'
                return
            }

            websiteService
                .updateWebsite(updatedWebsite)
                .then(function () {
                    $location.url('/website')
                })
        }

        function deleteWebsite(userId, websiteId) {
            websiteService
                .deleteWebsite(userId, websiteId)
                .then(function () {
                    $location.url('/website')
                })
        }
    }
})()
