/**
 * Created by Jeremy on 6/14/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('pageEditController', pageEditController)

    function pageEditController($routeParams, $location, pageService) {
        var model = this

        model.userId = $routeParams["userId"]
        model.websiteId = $routeParams["websiteId"]
        model.pageId = $routeParams["pageId"]
        model.updatePage = updatePage
        model.deletePage = deletePage

        init()

        function init() {
            model.pageCopy = pageService.getPageCopy(model.pageId)
        }

        function updatePage(pageId, updatedPage) {
            pageService.updatePage(pageId, updatedPage)
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/')
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId)
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/')
        }
    }
})()
