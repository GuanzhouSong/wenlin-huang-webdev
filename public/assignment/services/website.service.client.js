/**
 * Created by Jeremy on 6/15/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .service("websiteService", websiteService);

    function websiteService($http) {
        this.createWebsite = createWebsite;
        this.findAllWebsitesByUser = findAllWebsitesByUser;
        this.findWebsiteByWebsiteId = findWebsiteByWebsiteId;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function createWebsite(website, userId) {
            website.developerId = userId;
            website._id = new Date().getTime() + "";
            websites.push(website);
        }

        function findAllWebsitesByUser(userId) {
            var url = '/api/assignment/user/' + userId + '/website';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteByWebsiteId(websiteId) {
            return websites.find(function (website) {
                return website._id === websiteId;
            });
        }

        function deleteWebsite(websiteId) {
            var websiteToDelete = findWebsiteByWebsiteId(websiteId);
            var index = websites.indexOf(websiteToDelete);
            websites.splice(index, 1);
        }

        function updateWebsite(userId, updatedWebsite) {
            var website = findWebsiteByWebsiteId(userId);
            var index = websites.indexOf(website);
            websites[index] = updatedWebsite;
        }
    }
})();
