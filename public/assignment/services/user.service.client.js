/**
 * Created by Jeremy on 6/11/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .factory("userService", function () {
            var api = {};
            var users = [
                {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
                {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
                {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
            ];

            api.findUserById = findUserById;
            api.findUserByUserName = findUserByUserName;
            api.findUserByCredentials = findUserByCredentials;
            api.createUser = createUser;

            return api;

            function findUserById(userId) {
                for (var u in users) {
                    if (users[u]._id === userId)
                        return users[u];
                }
                return null;
            }

            function findUserByUserName(username) {
                var userFound = users.find(function (user) {
                    return user.username === username;
                })
                return typeof userFound === 'undefined' ? null : userFound;
            }

            function findUserByCredentials(username, password) {
                for (var u in users) {
                    var user = users[u];
                    if (user.username === username && user.password === password) {
                        return user;
                    }
                }
                return null;
            }

            function createUser(user) {
                user._id = new Date().getTime() + "";
                user.dateCreated = new Date();
                users.push(user);
                return user;
            }
        });
})();
