/**
 * Created by Jeremy on 6/19/17.
 */

(function () {
    angular
        .module('webAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams, $location, widgetService) {
        var model = this;

        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];
        model.wgtId = $routeParams["wgtId"];
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        init();

        function init() {
            var widget = widgetService.findWidgetByWidgetId(model.wgtId);
            model.widget = widgetService.getWidgetCopy(widget);
        }

        function updateWidget(widgetId, updatedWidget) {
            widgetService.updateWidget(widgetId, updatedWidget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId
                        + '/page/' + model.pageId + '/widget/');
        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId
                        + '/page/' + model.pageId + '/widget/');
        }
    }
})();
