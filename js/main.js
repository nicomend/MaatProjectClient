function Main($scope, $http) {
    $scope.config = {
        "tooltips": false,
        "labels": true,
        "legend": {
            "display": true,
            position: "right"
        },
        "innerRadius": 0, // applicable on pieCharts, can be a percentage like '50%'
        "lineLegend": 'traditional' // can be also 'traditional'
    }

    $http.get("http://localhost:9000/sales/5").success(function(data, status){
       $scope.sales = data;
    });

    $scope.chartType = "pie";

    $http.get('http://localhost:9000/workers').success(function(data, status){
        $scope.workersCount = data.length;
       var salesByWorkers = [];
        var moneyByWorkers = [];
        angular.forEach(data, function (worker, key) {
            salesByWorkers.push({"x" : worker.name, "y" : [worker.salesCount]});
            moneyByWorkers.push({"x" : worker.name, "y" : [worker.salesAmount]});
        });

        $scope.salesByWorkersChart = {
            "series": [
                "Sales"
            ],
            "data": salesByWorkers
        }

        $scope.moneyByWorkersChart = {
            "series": [
                "Money"
            ],
            "data": moneyByWorkers
        }
    });
}