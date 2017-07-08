/**
 * Created by Jeremy on 6/18/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('imageSearchController', imageSearchController)

    function imageSearchController($routeParams, flickrService, widgetService) {
        var model = this

        model.widgetId = $routeParams["widgetId"]
        model.searchPhotos = searchPhotos
        model.selectPhoto = selectPhoto

        init()

        function init() {
            widgetService
                .findWidgetByWidgetId(model.widgetId)
                .then(function (widget) {
                    model.widget = widget
                })
        }

        function searchPhotos(searchText) {
            flickrService
                .searchPhotos(searchText)
                .then(function (data) {
                    data = data.replace("jsonFlickrApi(","")  // grab the data as the function
                    data = data.substring(0,data.length - 1)  // argument
                    data = JSON.parse(data)
                    model.photos = data.photos
                })
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg"
            model.widget.url = url

            widgetService
                .updateWidget(model.widget)
                .then(function () {
                    model.message = 'Image updated.'
                })
        }
    }
})()
