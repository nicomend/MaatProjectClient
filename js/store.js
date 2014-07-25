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
    var sessionKey = "user";
    $scope.toolbar = "html/toolbar/workerToolbar.html";
    $scope.login = "html/workerViews/login.html";

    localStorage.clear();
    $scope.refreshUser = function()
    {
        $scope.user = sessionStorage.getItem(sessionKey);
        $scope.isUserConnected = $scope.user != null;
    }

    $scope.refreshUser();
    if (sessionStorage.getItem("cart") == null) {
        $scope.cart = {products: [], currentPrice: 0, checkoutCompleted: false};
    }
    else
    {
        $scope.cart = JSON.parse(sessionStorage.getItem("cart"));
    }

    // init menu items
    $scope.tabs = [
        {
            'label': 'קטגוריות',
            'url': '/categories'
        },
        {
            'label': 'מוצרים',
            'url': '/products'
        },
        {
            'label': 'עגלת קניות',
            'url': '/cart'
        }
    ];

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

    $scope.login = function(){
        sessionStorage.setItem(sessionKey, "nico");
        $scope.refreshUser();
    };

    $scope.logout = function(){
        sessionStorage.removeItem(sessionKey);
        $scope.refreshUser();
    };
}
