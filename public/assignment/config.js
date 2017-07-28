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
                templateUrl: 'views/admin/admin.view.client.html'
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
})()
