var ctrl = (function () {

    function ctrl() {
    }

    return ctrl;
})();

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {

    $http({
        method: 'GET',
        url: '/api/Projects/?IsIncludeNodes=true'
    }).then(function successCallback(response) {
        console.log(response.data);
        $scope.data = response.data;


        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

    $scope.title = "something";
    $scope.myColl = [
        {
            title: 'ttl1', coll: [
               {
                   title: 'ttl1_1', coll: [
                      {
                          title: 'ttl1_1_1', coll: [

                          ]
                      },
                      {
                          title: 'ttl1_1_2', coll: [

                          ]
                      },
                      {
                          title: 'ttl1_1_3', coll: [

                          ]
                      },
                   ]
               },
               {
                   title: 'ttl1_2', coll: [

                   ]
               }
            ]
        },
        {
            title: 'ttl2', coll: [
               {
                   title: 'ttl2_1', coll: [

                   ]
               },
               {
                   title: 'ttl2_2', coll: [

                   ]
               }
            ]
        },
        {
            title: 'ttl3', coll: [
               {
                   title: 'ttl3_1', coll: [

                   ]
               },
               {
                   title: 'ttl3_2', coll: [

                   ]
               }
            ]
        }
    ];

    $scope.treedata =
    [
        {
            "label": "User", "id": "role1", "children": [
              { "label": "subUser1", "id": "role11", "children": [] },
              {
                  "label": "subUser2", "id": "role12", "children": [
                    {
                        "label": "subUser2-1", "id": "role121", "children": [
                          { "label": "subUser2-1-1", "id": "role1211", "children": [] },
                          { "label": "subUser2-1-2", "id": "role1212", "children": [] }
                        ]
                    }
                  ]
              }
            ]
        },
        { "label": "Admin", "id": "role2", "children": [] },
        { "label": "Guest", "id": "role3", "children": [] }
    ];

    $scope.$watch('abc.currentNode', function (newObj, oldObj) {
        if ($scope.abc && angular.isObject($scope.abc.currentNode)) {
            console.log('Node Selected!!');
            console.log($scope.abc.currentNode);
            $scope.selectedNode = $scope.abc.currentNode;
            $scope.loading = true;
            $http({
                method: 'GET',
                url: '/api/ProjectTasks/GetTasksHierarchyByProjectId?id=' + $scope.abc.currentNode.Id
            }).then(function (response) {
                console.log(response.data);
                $scope.dataTasks = response.data[0].Nodes;
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            }).finally(function(){
                $scope.loading = false;
            });
        }
    }, false);



    


    //console.log($scope.myColl);

}]);


//(function (f) {
//    f.module("angularTreeview", []).directive("treeModel", function ($compile) {
//        return {
//            restrict: "A", link: function (b, h, c) {
//                var a = c.treeId, g = c.treeModel, e = c.nodeLabel || "label", d = c.nodeChildren || "children", e = '<ul><li data-ng-repeat="node in ' + g + '"><i class="collapsed" data-ng-show="node.' + d + '.length && node.collapsed" data-ng-click="' + a + '.selectNodeHead(node)"></i><i class="expanded" data-ng-show="node.' + d + '.length && !node.collapsed" data-ng-click="' + a + '.selectNodeHead(node)"></i><i class="normal" data-ng-hide="node.' +
//                d + '.length"></i> <span data-ng-class="node.selected" data-ng-click="' + a + '.selectNodeLabel(node)">{{node.' + e + '}}</span><div data-ng-hide="node.collapsed" data-tree-id="' + a + '" data-tree-model="node.' + d + '" data-node-id=' + (c.nodeId || "id") + " data-node-label=" + e + " data-node-children=" + d + "></div></li></ul>"; a && g && (c.angularTreeview && (b[a] = b[a] || {}, b[a].selectNodeHead = b[a].selectNodeHead || function (a) { a.collapsed = !a.collapsed }, b[a].selectNodeLabel = b[a].selectNodeLabel || function (c) {
//                    b[a].currentNode && b[a].currentNode.selected &&
//                    (b[a].currentNode.selected = void 0); c.selected = "selected"; b[a].currentNode = c
//                }), h.html('').append($compile(e)(b)))
//            }
//        }
//    })
//})(angular);


