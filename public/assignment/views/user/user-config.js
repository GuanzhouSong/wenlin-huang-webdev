/**
 * Created by Jeremy on 6/19/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
    }

    function checkLoggedIn(userService, $q, $location) {  // 注意在这里要 inject 'userService'
        var deferred = $q.defer()                         // TODO: How to avoid duplicate implementations of checkLoggedIn function in four config files? $rootScope?

        userService
            .checkLoggedIn()
            .then(function (user) {
                if (user == '0') {
                    deferred.reject()
                    $location.url('/login')
                } else {
                    deferred.resolve(user)
                }
            })

        return deferred.promise
    }
})()
