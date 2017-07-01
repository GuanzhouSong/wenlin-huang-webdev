/**
 * Created by Jeremy on 6/11/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .factory("userService", function ($location, $http) {
            var api = {}

            api.createUser = createUser
            api.findUserById = findUserById
            api.findUserByUserName = findUserByUserName
            api.findUserByCredentials = findUserByCredentials
            api.updateUser = updateUser
            api.deleteUser = deleteUser

            return api

            function createUser(user) {
                var url = '/api/assignment/user'
                return $http.post(url, user)
                    .then(function (response) {
                        return response.data
                    })
            }

            function findUserById(userId) {
                var url = '/api/assignment/user/' + userId
                return $http.get(url).then(function (response) {  // returns a promise object to controller
                    return response.data  // the user object (success) or error
                })
            }

            function findUserByUserName(username) {
                var url = '/api/assignment/user?username=' + username
                return $http.get(url).then(function (response) {
                    return response.data
                })
            }

            function findUserByCredentials(username, password) {
                var url = '/api/assignment/user?username=' + username +'&password=' + password
                return $http.get(url).then(function (response) {
                    return response.data
                })
            }

            function updateUser(userId, updatedUser) {
                var url = '/api/assignment/user/' + userId
                return $http.put(url, updatedUser)
                    .then(function (response) {
                        return response.data
                    })
            }

            function deleteUser(userId) {
                var url = '/api/assignment/user/' + userId
                return $http.delete(url)
                    .then(function (response) {
                        return response.data
                    })
            }
        })
})()
