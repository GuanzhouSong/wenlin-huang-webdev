/**
 * Created by Jeremy on 6/11/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .factory("userService", function ($location, $http) {
            var api = {}

            api.registerUser = registerUser
            api.findUserById = findUserById
            api.findUserByUserName = findUserByUserName
            api.login = login
            api.logout = logout
            api.updateUser = updateUser
            api.deleteUser = deleteUser
            api.checkLoggedIn = checkLoggedIn

            return api

            function registerUser(user) {
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
                return $http.get(url)
                    .then(function (response) {
                        if (response.data.error) {  // 若返回的数据中包含在 server 添加的 error 信息
                            throw response.data     // 则作为一个 error throw 给 register controller 让他 catch
                        }                           // 然后作为 model.error render 在页面上
                        return response.data
                    })
            }

            function login(username, password) {
                var url = '/api/assignment/login'
                var credentials = {
                    username: username,
                    password: password
                }
                return $http.post(url, credentials).then(function (response) {
                    return response.data
                })
            }

            function logout() {
                var url = '/api/assignment/logout'
                return $http.post(url)
                    .then(function (response) {
                        return response.data
                    })
            }

            function updateUser(userId, updatedUser) {
                var url = '/api/assignment/user/' + userId
                return $http.put(url, updatedUser)
                    .then(function (response) {
                        return response.data
                    })
                    .catch(function (response) {
                        throw response.data
                    })
            }

            function deleteUser(userId) {
                var url = '/api/assignment/user/' + userId
                return $http.delete(url)
                    .then(function (response) {
                        return response.data
                    })
            }

            function checkLoggedIn() {
                var url = '/api/assignment/checkLoggedIn'
                return $http.get(url)
                    .then(function (response) {  // will response back either
                        return response.data     // - currentUser
                    })                           // - '0'
            }
        })
})()
