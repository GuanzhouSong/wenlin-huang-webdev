/**
 * Created by Jeremy on 6/11/17.
 */

(function () {
    angular
        .module("webAppMaker")
        .factory("flickrService", function ($http) {
            var api = {}
            var key = "82131e404516ba1020e7a165d74d1edb"
            var urlBase = "https://api.flickr.com/services/rest/?" +
                          "method=flickr.photos.search&" +
                          "format=json&api_key=API_KEY&text=TEXT"

            api.searchPhotos = searchPhotos

            return api

            function searchPhotos(searchText) {
                var url = urlBase.replace("API_KEY", key).replace("TEXT", searchText)
                return $http.get(url).then(function (response) {
                    return response.data
                })
            }
        })
})()
