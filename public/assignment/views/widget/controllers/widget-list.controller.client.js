/**
 * Created by Jeremy on 6/18/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('widgetListController', widgetListController)

    function widgetListController($routeParams, $sce, widgetService, currentUser) {
        var model = this

        model.userId = currentUser._id
        model.websiteId = $routeParams["websiteId"]
        model.pageId = $routeParams["pageId"]
        model.widgetId = $routeParams["widgetId"]

        model.findWidgetByWidgetId = findWidgetByWidgetId
        model.findAllWidgetsForPage = findAllWidgetsForPage
        model.trust = trust
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl

        init()

        function init() {
            findAllWidgetsForPage(model.pageId)
        }

        function findAllWidgetsForPage(pageId) {
            widgetService
                .findAllWidgetsForPage(pageId)
                .then(function (widgets) {
                    model.widgets = widgets
                })

        }

        function findWidgetByWidgetId(widgetId) {
            widgetService
                .findWidgetByWidgetId(widgetId)
                .then(function (widgets) {
                    model.widgets = widgets
                })
        }

        function trust(html) {
            return $sce.trustAsHtml(html)
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https:///www.youtube.com/embed/"
            var linkUrlParts = linkUrl.split('/')
            embedUrl += linkUrlParts[linkUrlParts.length-1]
            return $sce.trustAsResourceUrl(embedUrl)
        }
    }
})()
