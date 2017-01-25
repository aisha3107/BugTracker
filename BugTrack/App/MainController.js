var ctrl = (function () {

    function ctrl() {
    }

    return ctrl;
})();

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    var self = this;
    this.statusId = null;
    this.taskTypeId = null;
    this.selectedNode = null;
    this.data2 = null;
    this.ParentTaskId = null;
    this.CorrespondingTasks = null;



    this.statuses = [
        { id: 1, text: 'В работе' },
        { id: 2, text: 'На тестировании у аналитика' },
        { id: 3, text: 'Протестировано' },
        { id: 4, text: 'Принято заказчиком' },
        { id: 5, text: 'Запланировано'}
    ];

    this.types = [
        { id: 1, text: 'Feature' },
        { id: 2, text: 'Bug' }
    ];



    $http({
        method: 'GET',
        url: '/api/Projects/?IsIncludeNodes=true'
    }).then(function successCallback(response) {
        //console.log("Projects: " + response);
        $scope.data = response.data;

        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an erroroccurs
        // or server returns response with an error status.
    });

    

    this.processData = function (data) {
        for (var i = 0; i < data.length; i++) {
            data[i].subTasks = [];
            if (data[i].ParentTaskId != null) {
                var index = -1;
                for (var j = 0; j < data.length; j++) {
                    if (data[j].Id == data[i].ParentTaskId) index = j;
                }
                if (index != -1) {
                    data[index].subTasks.push(data[i]);
                }
            }
        }
        var tmp = [];
        var tmp2 = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i].ParentTaskId == null) {
                console.log('data[i].ProjectId', data[i].ProjectId);
                console.log('self.selectedNode', self.selectedNode);
                if (data[i].ProjectId == self.selectedNode) {
                    for (var j = 0; j < data.length; j++) {
                        tmp.push(data[j]);
                    }
                }
            }
        }
        console.log('test', tmp);
        return tmp;
    }

    $http.get('/api/ProjectTasks')
            .then(function (response) {
                //console.log("data2: " + response);
                self.data2 = self.processData(response.data);

                //calling for all tasks in a list
                self.ParentTasks = [];

                for (var i = 0; i < response.data.length; i++) {
                    self.ParentTasks.push({
                        id: response.data[i].Id,
                        title: response.data[i].Title
                    });
                }
                //console.log(self.ParentTasks);

                //console.log("hi: " , self.data2);
                //console.log("rod: ", self.ParentTasks);

                //$digest();
            }, function (response) {
                //console.log(response)
            });




    $scope.$watch('abc.currentNode', function (newObj, oldObj) {
        if ($scope.abc && angular.isObject($scope.abc.currentNode)) {
            console.log('Node Selected!!');
            console.log($scope.abc.currentNode);
            $scope.selectedNode = $scope.abc.currentNode;
            self.selectedNode = $scope.selectedNode.Id;
            console.log('sel', self.selectedNode);
            $scope.loading = true;
            $http({
                method: 'GET',
            //    url: '/api/ProjectTasks/GetTasksHierarchyByProjectId?id=' + $scope.abc.currentNode.Id
            //}).then(function (response) {
            //    console.log("sooooop");
            //    console.log(response.data[0].Nodes);
            //    $scope.dataTasks = response.data[0].Nodes;
            //    console.log($scope.dataTasks)
            //    selectedNode = $scope.dataTasks[0].ProjectId;
                //    console.log("Selected node in the GET request: " + selectedNode);
                url: '/api/ProjectTasks/GetProjectTasksByProjectId?projectId=' + $scope.abc.currentNode.Id
            }).then(function (response) {
                //console.log("sooooop");
                //console.log(response.data);
                $scope.dataTasks = response.data;
                //console.log($scope.dataTasks)

                //self.selectedNode = $scope.dataTasks.ProjectId;

                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            }).finally(function () {
                $scope.loading = false;
            });

            //$http.get('/api/ProjectTasks/GetTasksHierarchyByProjectId?id=' + $scope.abc.currentNode.Id)
            //.then(function (response) {
            //    console.log("data2: " + response);
            //    self.data2 = self.processData(response.data);
            //    //self.CorrespondingTasks = self.processData(response.data[0].subTasks);


            //    //calling for all tasks
            //    self.ParentTasks = [];
            //    for (var i = 0; i < response.data.length; i++) {
            //        self.ParentTasks.push({
            //            id: response.data[i].Id,
            //            title: response.data[i].Title
            //        });
            //    }
            //    //console.log(self.ParentTasks);

            //    //$digest();
            //}, function (response) {
            //    console.log(response)
            //});
        }
    }, false);

 


    $scope.count = 0;
    $scope.addNew = function () {
        alert("Add new called!");
        $scope.count++;
        
        console.log("Selected node in creation: "+ selectedNode);
        var data = {
            Title: $scope.Title,
            StatusId: self.statusId,
            TaskTypeId: self.taskTypeId,
            StartedOn: $scope.StartedOn,
            ProjectId: selectedNode,
            ParentTaskId: self.ParentTaskId
            //AssignedUserId: $scope.AssignedUserId
        };

        //"2017-01-18T16:28:00+06:00",

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


    //console.log($scope.myColl);

}]);






