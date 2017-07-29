/**
 * Created by Jeremy on 6/14/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('websiteNewController', websiteNewController)

    function websiteNewController($location, websiteService, currentUser) {
        var model = this

        model.userId = currentUser._id
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
            if (!website || !website.name || website.name === '') {
                model.error = 'Website name is required.'
                return
            }
            websiteService
                .createWebsite(website, userId)
                .then(function () {
                    $location.url('/website')
                }, function () {
                    alert('Something went wrong')
                })
        }
    }
})()
