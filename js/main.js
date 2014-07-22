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

    $scope.data = {
        "series": [
            "Sales"
        ],
        "data": [
            {
                "x": "עובד א'",
                "y": [
                    53
                ]
            },
            {
                "x": "עובד ב'",
                "y": [
                    150
                ]
            },
            {
                "x": "עובד d'",
                "y": [
                    150
                ]
            },
            {
                "x": "עובד ds'",
                "y": [
                    150
                ]
            }
        ]
    }
}