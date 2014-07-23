function Cart($scope, $http)
{
    $scope.checkout = function(){
        $http.post('http://localhost:9000/sale/create', $scope.cart.products).success(function(data, status){
           $scope.sale = data;

            $scope.cart.products.splice(0, $scope.cart.products.length);
            $scope.cart.currentPrice = 0;
            $scope.cart.checkoutCompleted = true;
        });
    };
}