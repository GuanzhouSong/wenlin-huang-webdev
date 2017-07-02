/**
 * Created by Jeremy on 6/14/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('websiteListController', websiteListController)

    function websiteListController($routeParams, websiteService) {
        var model = this

        model.userId = $routeParams["userId"]

        init()

        function init() {
            findAllWebsitesByUser(model.userId)
        }

        function findAllWebsitesByUser(userId) {
            websiteService
                .findAllWebsitesByUser(userId)
                .then(function (websites) {
                    model.websites = websites
                })
        }

    }
})()
