function Products($scope, $http) {

    $scope.categories = [];
    $scope.products = [];

    $http.get('http://localhost:9000/categories').success(function (data, status) {
        $scope.categories = data;
    });

    $http.get('http://localhost:9000/products').success(function (data, status) {
        $scope.products = data;
    });

    $scope.update = function (product) {
        $http.post('http://localhost:9000/admin/product/update', product);
    };

    $scope.create = function () {
        $http.post('http://localhost:9000/admin/product/create', $scope.newProduct).success(function (data, status) {
            $scope.products.push(data);
        });
    };

    $scope.delete = function (product) {
        $http.get('http://localhost:9000/admin/product/delete/' + product.id).success(function (data, status) {
            $scope.products.splice(products.indexOf(product), 1);
        });
    };

    $scope.clear = function () {
        $http.get('http://localhost:9000/admin/product/clear').success(function (data, status) {
            $scope.products.length = 0;
        });
    };

    $scope.clearFields = function () {
        $scope.newProduct = {};
        $scope.searchProduct = {};
    };

    $scope.clearFields();
}
