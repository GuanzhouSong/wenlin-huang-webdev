/**
 * Created by Jeremy on 6/14/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, $location, websiteService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        init();

        function init() {
            model.websiteCopy = websiteService.getWebsiteCopy(model.websiteId);
            model.websites = websiteService.findAllWebsitesByUser(model.userId);
        }

        function updateWebsite(websiteId, updatedWebsite) {
            websiteService.updateWebsite(websiteId, updatedWebsite);
            $location.url('/user/' + model.userId + '/website');
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/' + model.userId + '/website');
        }
    }
})();
