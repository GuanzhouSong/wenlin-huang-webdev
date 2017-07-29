(function () {
    angular
        .module('webAppMaker')
        .controller('adminUsersController', adminUsersController)

    function adminUsersController(userService, $location) {
        var model = this
        model.logout = logout
        model.deleteUser = deleteUser
        model.selectUser = selectUser
        model.upsertUser = upsertUser
        model.findAllUsers = findAllUsers
        init()

        function init() {
            model.user = {}
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users
                })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/')
                })
        }

        function deleteUser(userId) {
            userService
                .deleteUser(userId)
                .then(function () {  // removing that user from view model
                    var deletedUser = model.users.find(function (user) {
                        return userId === user._id
                    })
                    var index = model.users.indexOf(deletedUser)
                    model.users.splice(index, 1)
                })
        }

        function selectUser(userId) {
            var selectedUser = model.users.find(function (user) {
                return user._id === userId
            })
            model.user = angular.copy(selectedUser)
        }

        function upsertUser(user) {
            var rolesArr = []
            if (user.roles) {
                user.roles.split(',')
                    .map(function (t) {
                        rolesArr.push(t.trim().toUpperCase())
                    })
                user.roles = rolesArr
            } else {
                user.roles = ['USER']
            }
            return userService
                .upsertUser(user)
                .then(function (user) {
                    findAllUsers()   // re-fetch updated users list from server
                })
                .then(function () {
                    model.user = {}
                })
                .catch(function (obj) {         // unwrapping error messages, could be
                    var data = obj.data || obj  // - duplicate username
                    var messages = ""           // - invalid user role(s)
                    for (var i in data) {       // - empty username/password
                        var message = data[i].message || data[i]
                        if (!message || typeof message !== 'string')  continue
                        messages += message + '\n'
                    }
                    alert(messages)
                    model.user = {}
                })
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users
                })
        }
    }

})()
