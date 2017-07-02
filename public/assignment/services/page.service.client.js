/**
 * Created by Jeremy on 6/15/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .factory("pageService", pageService)

    function pageService($http) {
        var api = {}

        api.createPage = createPage
        api.findPagesByWebsiteId = findPagesByWebsiteId
        api.findPageByPageId = findPageByPageId
        api.updatePage = updatePage
        api.deletePage = deletePage

        return api

        function createPage(websiteId, page) {
            var url = '/api/assignment/website/' + websiteId + '/page'
            return $http.post(url, page).then(function (response) {
                return response.data
            })
        }

        function findPagesByWebsiteId(websiteId) {
            var url = '/api/assignment/website/' + websiteId + '/page'
            return $http.get(url).then(function (response) {
                return response.data
            })
        }

        function findPageByPageId(pageId) {
            var url = '/api/assignment/page/' + pageId
            return $http.get(url).then(function (response) {
                return response.data
            })
        }
        function updatePage(updatedPage) {
            var url = '/api/assignment/page/' + updatedPage._id
            return $http.put(url, updatedPage).then(function (response) {
                return response.data
            })
        }

        function deletePage(pageId) {
            var url = '/api/assignment/page/' + pageId
            return $http.delete(url).then(function (response) {
                return response.data
            })
        }
    }
})()
