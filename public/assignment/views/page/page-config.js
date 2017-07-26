/**
 * Created by Jeremy on 6/19/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when('/website/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

        function checkLoggedIn(userService) {  // 注意在这里要 inject 'userService'
            return userService.checkLoggedIn()
        }

    }
})()
