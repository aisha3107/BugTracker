//var ctrl = (function () {

//    function ctrl() {
//    }

//    return ctrl;
//})();

(function () {

    var app = angular.module("hViewer", []);
    //.component('china', {
    //controller: ctrl,
    //template: '<div style="border-left:1px solid red; margin-left:15px"><p>{{$ctrl.item.title}}</p><china ng-repeat="elem in $ctrl.item.coll" item="elem"></china></div>',
    //bindings: {
    //    item: '<'
    //}
    //})


    var MainController = function($scope, $http){
        
        var onProjectComplete = function(response){
            $scope.data = response.data;
        };

        var onError = function(reason){
            $scope.error = "Could not fetch information";
        };

        $http.get("https://localhost:1449/api/Projects").then(onProjectComplete, onError);
    };
        
        
        
    //    $scope.myColl = [
    //        {
    //            title: 'ttl1', coll: [
    //               {
    //                   title: 'ttl1_1', coll: [
    //                      {
    //                          title: 'ttl1_1_1', coll: [

    //                          ]
    //                      },
    //                      {
    //                          title: 'ttl1_1_2', coll: [

    //                          ]
    //                      },
    //                      {
    //                          title: 'ttl1_1_3', coll: [

    //                          ]
    //                      },
    //                   ]
    //               },
    //               {
    //                   title: 'ttl1_2', coll: [

    //                   ]
    //               }
    //            ]
    //        },
    //        {
    //            title: 'ttl2', coll: [
    //               {
    //                   title: 'ttl2_1', coll: [

    //                   ]
    //               },
    //               {
    //                   title: 'ttl2_2', coll: [

    //                   ]
    //               }
    //            ]
    //        },
    //        {
    //            title: 'ttl3', coll: [
    //               {
    //                   title: 'ttl3_1', coll: [

    //                   ]
    //               },
    //               {
    //                   title: 'ttl3_2', coll: [

    //                   ]
    //               }
    //            ]
    //        }
    //    ];

    //    console.log($scope.myColl);

    //};

    app.controller("MainController", MainController);

    //angular.bootstrap(document, ['hViewer']);

    }());