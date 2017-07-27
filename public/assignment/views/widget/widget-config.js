/**
 * Created by Jeremy on 6/19/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when('/website/:websiteId/page/:pageId/widget/chooser', {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: 'widgetChooserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetType/new', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId/widget/:widgetId', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/widget/:widgetId/search', {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'imageSearchController',
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
