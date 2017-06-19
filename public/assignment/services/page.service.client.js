/**
 * Created by Jeremy on 6/15/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .factory("pageService", pageService);

    function pageService() {
        var api = {};
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        api.createPage = createPage;
        api.findPagesByWebsiteId = findPagesByWebsiteId;
        api.findPageByPageId = findPageByPageId;
        api.updatePage = updatePage;
        api.deletePage = deletePage;
        api.getPageCopy = getPageCopy;

        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = new Date() + "";
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId) {
            return pages.filter(function(page) {
                return websiteId === page.websiteId;
            });
        }

        function findPageByPageId(pageId) {
            return pages.find(function(page) {
                return pageId === page._id;
            });
        }

        function updatePage(pageId, updatedPage) {
            var website = findPageByPageId(pageId);
            var index = pages.indexOf(website);
            pages[index] = updatedPage;
        }

        function deletePage(pageId) {
            var pageToDelete = findPageByPageId(pageId);
            var index = pages.indexOf(pageToDelete);
            pages.splice(index, 1);
        }

        function getPageCopy(pageId) {
            var page = findPageByPageId(pageId);
            return angular.copy(page);
        }
    }
})();
