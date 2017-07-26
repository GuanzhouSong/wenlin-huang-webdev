/**
 * Created by Jeremy on 6/14/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('pageEditController', pageEditController)

    function pageEditController($routeParams, $location, pageService, currentUser) {
        var model = this

        model.userId = currentUser._id
        model.websiteId = $routeParams["websiteId"]
        model.pageId = $routeParams["pageId"]
        model.findPageByPageId = findPageByPageId
        model.updatePage = updatePage
        model.deletePage = deletePage

        init()

        function init() {
            findPageByPageId(model.pageId)
        }

        function findPageByPageId(pageId) {
            pageService
                .findPageByPageId(pageId)
                .then(function (page) {
                    model.page = page
                })
        }

        function updatePage(updatedPage) {
            pageService
                .updatePage(updatedPage)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page/')
                })
        }

        function deletePage(pageId) {
            pageService
                .deletePage(pageId)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page/')
                })
        }
    }
})()
