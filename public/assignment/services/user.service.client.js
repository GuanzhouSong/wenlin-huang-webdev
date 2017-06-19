/**
 * Created by Jeremy on 6/11/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .factory("userService", function ($location) {
            var api = {};
            var users = [
                {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
                {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
                {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
            ];

            api.createUser = createUser;
            api.findUserById = findUserById;
            api.findUserByUserName = findUserByUserName;
            api.findUserByCredentials = findUserByCredentials;
            api.updateUser = updateUser;
            api.deleteUser = deleteUser;
            api.getUserCopy = getUserCopy;

            return api;

            function createUser(user) {
                user._id = new Date().getTime() + "";
                user.dateCreated = new Date();
                users.push(user);
                return user;
            }

            function findUserByUserName(username) {
                var userFound = users.find(function (user) {
                    return user.username === username;
                });
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

            function updateUser(userId, updatedUser) {
                var user = findUserById(userId);
                var index = users.indexOf(user);
                users[index] = updatedUser;
            }

            function findUserById(userId) {
                for (var u in users) {
                    if (users[u]._id === userId)
                        return users[u];
                }
                return null;
            }

            function deleteUser(userId) {
                var userToDelete = findUserById(userId);
                var index = users.indexOf(userToDelete);
                users.splice(index, 1);
                $location.url('/login');
            }

            // returns a cloned user object
            function getUserCopy(userId) {
                var user = findUserById(userId);
                return angular.copy(user);
            }

        });
})();
