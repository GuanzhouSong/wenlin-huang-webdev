(function () {
    angular
        .module("webAppMaker")
        .directive('wdSortable', function (widgetService) {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    var from, to
                    $(element).sortable({
                        cursor: 'pointer',
                        opacity: 0.6,
                        tolerance: 'pointer',
                        containment: 'parent',
                        start: function (evt, ui) {
                            from = ui.item.index()
                        },
                        update: function (evt, ui) {
                            to = ui.item.index()
                            var pageUrl = window.location.href
                            var pageId = /page\/([0-9]+?)\//.exec(pageUrl)[1]
                            widgetService.reorderWidgets(pageId, from, to)
                        }
                    })
                }
            }
        })
})()
