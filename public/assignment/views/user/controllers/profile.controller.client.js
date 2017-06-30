/**
 * Created by Jeremy on 6/8/17.
 */

(function () {
    angular
        .module("webAppMaker")  // reading the module declared in app.js
        .controller("profileController", profileController);

    function profileController($routeParams, userService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.updateUser = updateUser;

        init();

        function init() {
            userService.findUserById(model.userId)  // findUserById() returns a promise
                       .then(function (user) {
                           model.user = user;
                       }, function (error) {
                           model.error = "User not found.";
                       });

            model.deleteUser = userService.deleteUser;
        }

        function updateUser(userId, user) {
            if (user.username == null || user.email == null || user.firstName == null || user.lastName == null) {
                model.error = "No empty fields allowed.";
                delete model.message;
                return;
            }
            userService
                .updateUser(userId, user)
                .then(function () {
                    model.message = 'User successfully updated.';
                });
        }
    }
})();
