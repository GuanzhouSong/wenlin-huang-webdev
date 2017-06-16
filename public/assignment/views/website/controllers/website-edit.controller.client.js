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
        model.deleteWebsite = deleteWebsite;

        model.website = websiteService.findWebsiteByWebsiteId(model.websiteId)

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/' + model.userId + '/website');
        }
    }
})();
