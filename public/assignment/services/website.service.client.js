/**
 * Created by Jeremy on 6/15/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .service("websiteService", websiteService);

    function websiteService() {
        this.findAllWebsitesForUser = findAllWebsitesForUser;
        this.findWebsiteByWebsiteId = findWebsiteByWebsiteId;
        this.deleteWebsite = deleteWebsite;

        var websites = [  // private variable inside the service
            { "_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go", "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem" }
        ];

        function findAllWebsitesForUser(userId) {
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
    }
})();
