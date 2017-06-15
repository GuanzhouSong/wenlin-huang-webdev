/**
 * Created by Jeremy on 6/8/17.
 */

(function () {
    angular
        .module("webAppMaker")  // reading the module declared in app.js
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var model = this;

        model.validateLogin = validateLogin;

        function validateLogin(username, password) {
            var foundUser = userService.findUserByCredentials(username, password);
            if (foundUser !== null) {
                $location.url("/user/" + foundUser._id);
            } else {
                model.message = "User information does not exist.";
            }
        }
    }
})();
