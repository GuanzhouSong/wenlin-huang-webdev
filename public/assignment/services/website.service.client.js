/**
 * Created by Jeremy on 6/15/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .service("websiteService", websiteService);

    function websiteService() {
        this.createWebsite = createWebsite;
        this.findAllWebsitesByUser = findAllWebsitesByUser;
        this.findWebsiteByWebsiteId = findWebsiteByWebsiteId;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;
        this.getWebsiteCopy = getWebsiteCopy;

        var websites = [  // private variable inside the service
            { "_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go", "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem" }
        ];

        function createWebsite(website, userId) {
            website.developerId = userId;
            website._id = new Date().getTime() + "";
            websites.push(website);
        }

        function findAllWebsitesByUser(userId) {
            var res = [];
            for (var w in websites)
                if (websites[w].developerId === userId)
                    res.push(websites[w]);
            return res;
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

        function getWebsiteCopy(userId) {
            var website = findWebsiteByWebsiteId(userId);
            return angular.copy(website);
        }
    }
})();
