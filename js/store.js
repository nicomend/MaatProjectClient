/**
 * Created by Idan on 18/07/14.
 */
var app = angular.module("store", [ "ngRoute", "ngAnimate", "ui.bootstrap", "LocalStorageModule" ]);

app.config([ '$routeProvider', function ($routeProvider) {
    $routeProvider.when('/categories', {
        templateUrl: 'html/workerViews/categories.html',
        controller: 'Categories'
    }).when('/products', {
        templateUrl: 'html/workerViews/products.html',
        controller: 'Products'
    }).when('/cart', {
        templateUrl: 'html/workerViews/cart.html',
        controller: 'Cart'
    }).otherwise({redirectTo: '/categories'});
} ], ['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

function Store($scope, $location, $http) {
    var sessionKey = "worker";
    $scope.toolbar = "html/toolbar/workerToolbar.html";

    $scope.refreshUser = function () {
        $scope.worker = JSON.parse(sessionStorage.getItem(sessionKey));
        $scope.isUserConnected = $scope.worker != null;
    }

    $scope.refreshUser();

    $http.get("http://localhost:9000/workers").success(function (data) {
        $scope.hasUsers = data.length > 0;
    }).error(function () {
        $scope.hasUsers = false;
    });

    if (sessionStorage.getItem("cart") != null) {
        $scope.cart = JSON.parse(sessionStorage.getItem("cart"));
    }
    else {
        $scope.cart = {products: [], currentPrice: 0, checkoutCompleted: false};
    }

    $http.get('lang.json').success(function (data) {
        $scope.lang = data;

        // init menu items
        $scope.tabs = [
            {
                'label': $scope.lang.categories,
                'url': '/categories'
            },
            {
                'label': $scope.lang.products,
                'url': '/products'
            },
            {
                'label': $scope.lang.cart,
                'url': '/cart'
            }
        ];
    });

    $scope.addToCart = function (product) {
        if ($scope.cart.products.length === 0) {
            $scope.cart.checkoutCompleted = false;
        }
        $scope.cart.products.push(angular.copy(product));
        $scope.cart.currentPrice += product.price;
        sessionStorage.setItem("cart", JSON.stringify($scope.cart));
    };

    $scope.removeFromCart = function (product) {
        var index = $scope.cart.products.indexOf(product);
        $scope.cart.products.splice(index, 1);
        $scope.cart.currentPrice -= product.price;
        sessionStorage.setItem("cart", JSON.stringify($scope.cart));
    };

    $scope.isActive = function (tab) {
        return tab.url === $location.path();
    };

    $scope.newCart = function () {
        $scope.cart.checkoutCompleted = false;
        sessionStorage.setItem("cart", JSON.stringify($scope.cart));
    };

    $scope.login = function () {
        $http.post("http://localhost:9000/login", $scope.idNumber).success(function (data) {
            sessionStorage.setItem(sessionKey, JSON.stringify(data));
            $scope.refreshUser();
        }).error(function () {
            $scope.loginerror = $scope.lang.connectionError;
        });

    };

    $scope.logout = function () {
        sessionStorage.removeItem(sessionKey);
        $scope.refreshUser();
    };

    $scope.createFirstUser = function () {
        $scope.worker.isAdmin = true;
        $http.post("http://localhost:9000/admin/worker/create", $scope.worker).success(function (data) {
            $scope.hasUsers = true;
        });
    };
}
