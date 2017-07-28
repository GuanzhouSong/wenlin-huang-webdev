(function () {
    angular
        .module('webAppMaker')
        .controller('adminUsersController', adminUsersController)

    function adminUsersController(userService) {
        var model = this
        init()

        function init() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users
                })
        }
    }

})()
