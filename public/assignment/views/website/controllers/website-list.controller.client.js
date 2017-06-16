/**
 * Created by Jeremy on 6/14/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.websites = websiteService.findAllWebsitesForUser(model.userId);

    }
})();
