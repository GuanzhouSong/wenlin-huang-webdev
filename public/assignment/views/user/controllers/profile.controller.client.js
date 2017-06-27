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
            userService.findUserById(model.userId)  // findUserById() returns a promise
                       .then(function (user) {
                           model.userCopy = user;
                       }, function (error) {
                           model.error = "User not found.";
                       });

            // model.userCopy = userService.getUserCopy(model.user);  // TODO: 这里需要改掉, 不要用 copy 了,
            model.updateUser = userService.updateUser;               // TODO: 因为是异步请求, 所以走到这里,服务端还没返回数据,
            model.deleteUser = userService.deleteUser;               // 即使把传给 getUserCopy(model.user) 因为 model.user 还没有东西
        }                                                           // 所以 copy 出来的东西也不会正确
    }
})();
