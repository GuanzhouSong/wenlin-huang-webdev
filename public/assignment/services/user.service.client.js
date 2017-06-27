/**
 * Created by Jeremy on 6/11/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .factory("userService", function ($location, $http) {
            var api = {};

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
                var url = '/api/assignment/user/' + userId;
                return $http.get(url).then(function (response) {  // returns a promise object to controller
                    return response.data;  // the user object (success) or error
                })
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
