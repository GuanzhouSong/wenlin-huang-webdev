(function () {
    angular
        .module('webAppMaker')
        .controller('adminIndexController', adminIndexController)

    function adminIndexController(userService, $location) {
        var model = this
        model.logout = logout

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/')
                })
        }
    }

})()
