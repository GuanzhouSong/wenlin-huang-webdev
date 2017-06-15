/**
 * Created by Jeremy on 6/14/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams) {
        var model = this;
        var websites = [
            { "_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go", "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem" }
        ];

        var userId = $routeParams["userId"];
        model.websites = findAllWebsitesForUser(userId);

        function findAllWebsitesForUser(userId) {
            var res = [];
            for (var w in websites)
                if (websites[w].developerId === userId)
                    res.push(websites[w]);
            return res;
        }
    }
})();
