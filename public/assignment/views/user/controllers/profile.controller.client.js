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

        init();

        function init() {
            model.user = userService.findUserById(model.userId);
            model.userCopy = userService.getUserCopy(model.userId);
            model.updateUser = userService.updateUser;
            model.deleteUser = userService.deleteUser;
        }
    }
})();
