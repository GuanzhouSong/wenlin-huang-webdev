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

            userService.findUserByUserName(username)
                .then(function () {
                    model.error = 'Sorry, the username is already taken.'  // 若成功返回对应 user 说明 username 重复
                }, function () {                                           // 否则创建新用户
                    var newUser = {
                        username: username,
                        password: password
                    };
                    return userService.createUser(newUser);  // returns a promise
                })
                .then(function (user) {
                    $location.url('/user/' + user._id);
                });
        }
    }
})();
