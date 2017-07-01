/**
 * Created by Jeremy on 6/14/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('websiteNewController', websiteNewController)

    function websiteNewController($routeParams, $location, websiteService) {
        var model = this

        model.userId = $routeParams["userId"]
        model.createWebsite = createWebsite

        init()

        function init() {
            websiteService
                .findAllWebsitesByUser(model.userId)
                .then(function (websites) {
                    model.websites = websites
                })
        }

        function createWebsite(website, userId) {
            websiteService.createWebsite(website, userId)
            $location.url('/user/' + model.userId + '/website')
        }
    }
})()
