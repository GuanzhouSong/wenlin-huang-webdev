/**
 * Created by Jeremy on 6/9/17.
 */
(function () {
    angular
        .module("webAppMaker", ["ngRoute"])  // only declare the module in app.js
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/profile/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
    }
})();
