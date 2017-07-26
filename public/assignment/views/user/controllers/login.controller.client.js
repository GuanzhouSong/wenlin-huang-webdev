/**
 * Created by Jeremy on 6/8/17.
 */

(function () {
    angular
        .module("webAppMaker")  // reading the module declared in app.js
        .controller("loginController", loginController)

    function loginController($location, userService) {
        var model = this

        model.validateLogin = validateLogin

        function validateLogin(username, password) {
            userService.login(username, password)
                .then(function (user) {
                    $location.url("/profile")
                }, function (error) {
                    model.message = "User information does not exist."
                })
        }
    }
})()
