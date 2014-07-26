function Workers($scope, $http) {
    $scope.newWorker = {};
    $scope.isValidID = true;

    $http.get('http://localhost:9000/workers').success(function (data, status) {
        $scope.workers = data;
    });

    $scope.create = function () {
        $http.post('http://localhost:9000/admin/worker/create', $scope.newWorker).success(function (data, status) {
            $scope.workers.push(data);
        });
    }

    $scope.idChanged = function () {
        $scope.isValidID = true;
        $scope.workers.forEach(function (worker) {
            if ($scope.newWorker.id === worker.id) {
                $scope.isValidID = false;
            }
        });
    }

    $scope.clear = function ()
    {
        $http.get('http://localhost:9000/admin/worker/clear').success(function(data, status){
           $scope.workers.length = 0;
        });
    }
	
	$scope.clearFields = function()
	{
		$scope.newWorker = {};
		$scope.searchWorker = {};
	}
}