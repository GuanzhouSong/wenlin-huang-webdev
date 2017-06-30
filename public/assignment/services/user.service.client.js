/**
 * Created by Jeremy on 6/11/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .factory("userService", function ($location, $http) {
            var api = {};
            var users = [];

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

            function findUserById(userId) {
                var url = '/api/assignment/user/' + userId;
                return $http.get(url).then(function (response) {  // returns a promise object to controller
                    return response.data;  // the user object (success) or error
                });
            }

            function findUserByUserName(username) {
                var url = '/api/assignment/user?username=' + username;
                return $http.get(url).then(function (response) {
                    return response.data;
                });
            }

            function findUserByCredentials(username, password) {
                var url = '/api/assignment/user?username=' + username +'&password=' + password;
                return $http.get(url).then(function (response) {
                    return response.data;
                });
            }

            function updateUser(userId, updatedUser) {
                var user = findUserById(userId);
                var index = users.indexOf(user);
                users[index] = updatedUser;
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
