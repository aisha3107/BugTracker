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
                console.log("sooooop");
                console.log(response.data[0].Nodes);
                $scope.dataTasks = response.data[0].Nodes;
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


    $scope.count = 0;
    $scope.addNew = function () {
        alert("Add new called!");
        $scope.count++;

        //$scope.dataTasks[0].Nodes.push({ "Title": "Aisha", "StatusId": 1, "TaskTypeId": 1 });//добавляется на второй уровень

        $scope.dataTasks[0].Nodes.push({
            "Title": "First record",
            //"AssignedUserId": "3c91cc20-87ef-4935-ae4e-9d976cdc6c48",
            //"AssignedUserName": "yerlanyr@gmail.com",
            //"AuthorUserName": "yerlanyr@gmail.com",
            //"CreatedOn": "2016-12-21T11:44:11.627",
            //"Description": "",
            //"EndedOn": "2016-12-23T11:44:11.627",
            //"EstimatedEndsOn": "2016-12-23T11:44:11.627",
            //"Id": 5,
            //"ProjectId": 3,
            //"ProjectName":"Личный кабинет - Производственные показатели",
            //"StatusId": 1,
            //"TaskTypeId": 1,
            //"StartedOn": "2016-12-21T11:44:11.627",
            "TaskTypeName": "Feature",
            "StatusName": "В работе"
        });

        //$scope.companies.push({ 'title': $scope.title, 'StatusId': 2, 'TaskTypeId': 2 });
        //$scope.title = '';
        //$scope.satusName = '';
        //$scope.taskType = '';
    };

    $scope.editUser = function () {
        $scope.greeting = 'Hello, World!';
        $scope.count++;
        $scope.doGreeting = function (greeting) {
            $window.alert(greeting);
        };
    };



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
    $scope.addRow = function () {
        $scope.companies.push({ 'name': $scope.name, 'employees': $scope.employees, 'headoffice': $scope.headoffice });
        $scope.name = '';
        $scope.employees = '';
        $scope.headoffice = '';
    };

    //$scope.Add = function () {
    //    // Do nothing if no state is entered (blank)
    //    if (!$scope.newState)
    //        return;
    //    // Add to main records
    //    $scope.records.push({
    //        state: $scope.newState,
    //        price: $scope.newPrice,
    //        tax: $scope.newTax,
    //        include: false
    //    });
    //    // See $Scope.Reset...
    //    $scope.Reset();
    //}



    //console.log($scope.myColl);

}]);






