(function () {
    angular
        .module('webAppMaker')
        .controller('homeController', homeController)

    function homeController(currentUser, userService) {
        var model = this
        model.user = currentUser
        model.logout = logout

        function logout() {
            userService.logout()
            delete model.user
        }
    }

})()
