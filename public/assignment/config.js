/**
 * Created by Jeremy on 6/14/17.
 */
(function () {
    angular
        .module("webAppMaker")
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/users', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
    }

    function checkLoggedIn(userService, $q) {
        var deferred = $q.defer()

        userService
            .checkLoggedIn()
            .then(function (user) {
                if (user == '0') {
                    deferred.resolve(null)
                } else {
                    deferred.resolve(user)
                }
            })

        return deferred.promise
    }

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer()

        userService
            .checkAdmin()
            .then(function (user) {
                if (user == '0') {
                    deferred.reject()
                    $location.url('/')
                } else {
                    deferred.resolve()
                }
            })

        return deferred.promise
    }
})()
