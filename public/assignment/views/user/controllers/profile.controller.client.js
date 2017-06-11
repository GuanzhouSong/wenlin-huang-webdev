/**
 * Created by Jeremy on 6/8/17.
 */

(function () {
    angular
        .module("webAppMaker")  // reading the module declared in app.js
        .controller("profileController", profileController);

    function profileController($routeParams) {
        var model = this;
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
        ];

        var userId = $routeParams['userId'];
        model.user = findUserById(userId);

        function findUserById(userId) {
            for (var u in users) {
                if (users[u]._id === userId)
                    return users[u];
            }
            return null;
        }
    }
})();
