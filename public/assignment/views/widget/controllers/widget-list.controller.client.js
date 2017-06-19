/**
 * Created by Jeremy on 6/18/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($routeParams, $sce) {
        var model = this;
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<h1>Lorem ipsum</h1>"}
        ];

        model.userId = $routeParams["userId"];
        model.widgets = widgets;
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https:///www.youtube.com/embed/"
            var linkUrlParts = linkUrl.split('/')
            embedUrl += linkUrlParts[linkUrlParts.length-1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        // function init() {
        //     model.widgets = widgetService.findAllWebsitesByUser(model.userId);
        // }
        // init();

    }
})();
