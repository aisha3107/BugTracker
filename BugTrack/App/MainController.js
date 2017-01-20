var ctrl = (function () {

    function ctrl() {
    }

    return ctrl;
})();

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    var self = this;
    this.statusId = null;
    this.taskTypeId = null;
    var selectedNode = null;

    this.statuses = [
        { id: 1, text: 'В работе' },
        { id: 2, text: 'На тестировании у аналитика' },
        { id: 3, text: 'Протестировано' },
        { id: 4, text: 'Принято заказчиком' }
    ];

    this.types = [
        { id: 1, text: 'Feature' },
        { id: 2, text: 'Bug' }
    ];

    $http({
        method: 'GET',
        url: '/api/Projects/?IsIncludeNodes=true'
    }).then(function successCallback(response) {
        console.log(response.data);
        $scope.data = response.data;


        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an erroroccurs
        // or server returns response with an error status.
    });


    $scope.$watch('abc.currentNode', function (newObj, oldObj) {
        if ($scope.abc && angular.isObject($scope.abc.currentNode)) {
            console.log('Node Selected!!');
            console.log($scope.abc.currentNode);
            $scope.selectedNode = $scope.abc.currentNode;
            selectedNode = $scope.selectedNode;
            //selectedNode = $scope.selectedNode[0].Nodes[0].Id;
            //selectedNodeInt = parseInt(selectedNode);
            //selectedNode = Integer.valueOf((String) $scope.selectedNode);
            //selectedNodeInt = Integer.valueOf((String) selectedNode);
            $scope.loading = true;
            $http({
                method: 'GET',
                url: '/api/ProjectTasks/GetTasksHierarchyByProjectId?id=' + $scope.abc.currentNode.Id
            }).then(function (response) {
                console.log("sooooop");
                console.log(response.data[0].Nodes);
                $scope.dataTasks = response.data[0].Nodes;
                selectedNode = $scope.dataTasks[0].ProjectId;
                //selectedTask = $scope.dataTasks[0].Nodes; //not right
                console.log("dfg: " + selectedTask);
                //selectedNode = parseInt($scope.dataTasks);
                //selectedNode = $scope.dataTasks[1].Nodes[0].Id;
                console.log("Selected node in the GET request: " + selectedNode);
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            }).finally(function () {
                $scope.loading = false;
            });
        }
    }, false);

    //$scope.$watch('def.currentNode', function (newObj, oldObj) {
    //    if ($scope.def && angular.isObject($scope.abc.currentNode)) {
    //        console.log('Task Selected!!');
    //        console.log($scope.def.currentNode);
    //        $scope.selectedTask = $scope.def.currentNode;
    //        selectedTask= $scope.selectedTask;
    //        $scope.loading = true;
    //        $http({
    //            method: 'GET',
    //            url: '/api/ProjectTasks/GetTasksHierarchyByProjectId?id=' + $scope.def.currentNode.Id
    //        }).then(function (response) {
    //            console.log("sooooop");
    //            console.log(response.data2[0].Nodes);
    //            $scope.dataTasks = response.data2[0].Nodes;
    //            selectedTask = $scope.dataTasks[0].ProjectId;
    //            console.log("Selected task in the GET request: " + selectedTask);
    //        }, function errorCallback(response) {
    //       }).finally(function () {
    //            $scope.loading = false;
    //        });
    //    }
    //}, false);



    $scope.count = 0;
    $scope.addNew = function () {
        alert("Add new called!");
        $scope.count++;
        
        console.log("Selected node in creation: "+ selectedNode);
        var data = {
            Title: $scope.Title,
            StatusId: self.statusId,
            TaskTypeId: self.taskTypeId,
            StartedOn: "2017-01-18T16:28:00+06:00",
            ProjectId: selectedNode
        };

        //$scope.dataTasks[0].Nodes.push();
        //$scope.Title = '';
        //$scope.StatusName = '';
        //$scope.TaskTypeName = '';

        $http.post('/api/ProjectTasks', data)
            .then(function (response) {
                console.log(response)
            }, function (response) {
                console.log(response)
            });
    };

    

    $scope.editUser = function (Id) {
        $scope.greeting = 'Hello, World!';
        $scope.count++;        
    };

    $scope.remove = function (Id) {

    };

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


    $scope.companies = [
                    {
                        'name': 'Infosys Technologies',
                        'employees': 125000,
                        'headoffice': 'Bangalore'
                    },
                    {
                    	'name': 'Cognizant Technologies',
                    	'employees': 100000,
                    	'headoffice': 'Bangalore'
                    },
	                {
	                    'name': 'Wipro',
	                    'employees': 115000,
	                    'headoffice': 'Bangalore'
	                },
		            {
		                'name': 'Tata Consultancy Services (TCS)',
		                'employees': 150000,
		                'headoffice': 'Bangalore'
		            },
			        {
			            'name': 'HCL Technologies',
			            'employees': 90000,
			            'headoffice': 'Noida'
			        },
    ];



    //console.log($scope.myColl);

}]);






