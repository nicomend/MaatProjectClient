function Cart($scope, $http) {
    $scope.checkout = function () {
        var sale = {"worker": $scope.worker, "products": $scope.cart.products};
        $http.post('http://localhost:9000/sale/create', sale).success(function (data, status) {
            $scope.sale = data;
            $scope.cart.products.splice(0, $scope.cart.products.length);
            $scope.cart.currentPrice = 0;
            $scope.cart.checkoutCompleted = true;
            sessionStorage.setItem("cart", JSON.stringify($scope.cart));
        });
    };
}