/**
 * Created by Nicolas on 22/07/2014.
 */
function Sales($scope, $http)
{
    $http.get('http://localhost:9000/sales').success(function(data, status){
       $scope.sales = data;
    });
}