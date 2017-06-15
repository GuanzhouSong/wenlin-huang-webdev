/**
 * Created by Jeremy on 6/8/17.
 */

(function () {
    angular
        .module("webAppMaker")  // reading the module declared in app.js
        .controller("registerController", registerController);

    function registerController($location, userService) {
        var model = this;
        model.registerUser = registerUser;

        function registerUser(username, password, passwordConfirm) {

            if (username == null || username === '') {
                model.error = 'Username is required.';
                return;
            }
            if (password == null || password === '' || password !== passwordConfirm) {
                model.error = password !== passwordConfirm ? 'Passwords do not match.'
                                                           : 'Password is required.';
                return;
            }

            var user = userService.findUserByUserName(username);

            if (user !== null) {
                model.error = 'Sorry, the username is already taken.'
            } else {
                var newUser = {
                    username: username,
                    password: password
                };
                newUser = userService.createUser(newUser);
                $location.url('/user/' + newUser._id);
            }
        }
    }

})();
