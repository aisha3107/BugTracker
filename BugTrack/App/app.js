var app = angular.module("myApp", ['angularTreeview']);
app.component('children', {

    controller: function ($scope) {

    },
    template: '<div style="border-left:1px solid; margin-left:15px">' +
                '<p>{{$ctrl.item.Name}}</p>' +
                '<children ng-repeat="elem in $ctrl.item.Nodes" item="elem"></children>' +
                '</div>',
    bindings: {
        item: '<'
    }
});




//нужно для того чтобы динамику таблицы добавить(сортировка, поиск)
// from https://lorenzofox3.github.io/smart-table-website/
//
//app.directive('csSelect', function () {
//    return {
//        require: '^stTable',
//        template: '<input type="checkbox"/>',
//        scope: {
//            row: '=csSelect'
//        },
//        link: function (scope, element, attr, ctrl) {

//            element.bind('change', function (evt) {
//                scope.$apply(function () {
//                    ctrl.select(scope.row, 'multiple');
//                });
//            });

//            scope.$watch('row.isSelected', function (newValue, oldValue) {
//                if (newValue === true) {
//                    element.parent().addClass('st-selected');
//                } else {
//                    element.parent().removeClass('st-selected');
//                }
//            });
//        }
//    }
//});


//angular.bootstrap(document, ['myApp']);



//сделано:
//чтобы разворачивались компоненты
//вывести таблицу задач
//залить на Git
//компоновка

//сделать:
//чтобы нажимались проекты и отображалась таблица задач соответсвующая
//функциональная таблица