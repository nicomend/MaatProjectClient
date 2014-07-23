/**
 * Created by Idan on 18/07/14.
 */
var app = angular.module("store", [ "ngRoute", "ngAnimate", "ui.bootstrap" ]);

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

function Store($scope, $location) {
    $scope.toolbar = "html/toolbar/workerToolbar.html";

    $scope.user = false;
    $scope.cart = {products: [], currentPrice: 0, checkoutCompleted: false};

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
        if($scope.cart.products.length === 0)
        {
            $scope.cart.checkoutCompleted = false;
        }
        $scope.cart.products.push(product);

        $scope.cart.currentPrice += product.price;
    };

    $scope.removeFromCart = function(product){
        var index = $scope.cart.products.indexOf(product);
        $scope.cart.products.splice(index, 1);

        $scope.cart.currentPrice -= product.price;
    };

    $scope.isActive = function (tab) {
        return tab.url === $location.path();
    };

    $scope.newCart = function()
    {
        $scope.cart.checkoutCompleted = false
    }
}
