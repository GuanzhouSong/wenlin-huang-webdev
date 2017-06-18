/**
 * Created by Jeremy on 6/8/17.
 */

(function () {
    angular
        .module("webAppMaker")  // reading the module declared in app.js
        .controller("profileController", profileController);

    function profileController($routeParams, userService) {
        var model = this;
        var userId = $routeParams['userId'];

        init();

        function init() {
            model.user = userService.findUserById(userId);
            model.clonedUser = userService.getClonedUser(userId);
            model.updateUser = userService.updateUser;
            model.deleteUser = userService.deleteUser;
        }
    }
})();
