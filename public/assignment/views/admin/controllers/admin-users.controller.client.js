(function () {
    angular
        .module('webAppMaker')
        .controller('adminUsersController', adminUsersController)

    function adminUsersController(userService, $location) {
        var model = this
        model.logout = logout
        init()

        function init() {
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
    }

})()
