function Cart($scope, $http)
{
    $scope.checkout = function(){
        $http.post('http://localhost:9000/sale/create', $scope.cart).success(function(data, status){
           $scope.sale = data;
        });
    }
}