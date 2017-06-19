/**
 * Created by Jeremy on 6/14/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, pageService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
        }
        init();

    }
})();
