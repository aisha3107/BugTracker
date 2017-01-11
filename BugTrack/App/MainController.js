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
        }
    }, false);



    $http({
        method: 'GET',
        url: '/api/ProjectTasks'
    }).then(function(response) {
        console.log(response.data);
        $scope.dataTasks = response.data;


        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });




    //console.log($scope.myColl);

}]);



