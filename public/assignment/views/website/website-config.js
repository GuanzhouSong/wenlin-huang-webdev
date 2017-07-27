/**
 * Created by Jeremy on 6/19/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when('/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

        function checkLoggedIn(userService, $q, $location) {  // 注意在这里要 inject 'userService'
            var deferred = $q.defer()

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
    }
})()
