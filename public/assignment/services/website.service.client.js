/**
 * Created by Jeremy on 6/15/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .service("websiteService", websiteService)

    function websiteService($http) {
        this.createWebsite = createWebsite
        this.findAllWebsitesByUser = findAllWebsitesByUser
        this.findWebsiteByWebsiteId = findWebsiteByWebsiteId
        this.updateWebsite = updateWebsite
        this.deleteWebsite = deleteWebsite

        function createWebsite(website, userId) {
            var url = '/api/assignment/user/' + userId + '/website/'
            return $http.post(url, website).then(function (response) {
                return response.data
            })
        }

        function findAllWebsitesByUser(userId) {
            var url = '/api/assignment/user/' + userId + '/website'
            return $http.get(url).then(function (response) {
                return response.data
            })
        }

        function findWebsiteByWebsiteId(websiteId) {
            var url = '/api/assignment/website/' + websiteId
            return $http.get(url).then(function (response) {
                return response.data
            })
        }

        function updateWebsite(updatedWebsite) {
            var url = '/api/assignment/website/' + updatedWebsite._id
            return $http.put(url, updatedWebsite).then(function (response) {
                return response.data
            })
        }

        function deleteWebsite(userId, websiteId) {
            var url ='/api/assignment/user/' + userId + '/website/' + websiteId
            return $http.delete(url).then(function (response) {
                return response.data
            })
        }
    }
})()
