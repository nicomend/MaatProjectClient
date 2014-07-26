var app = angular.module("admin", [ "ngRoute", "ngAnimate", "xeditable", "ui.bootstrap", "angularCharts" ]);

app.config([ '$routeProvider', function ($routeProvider) {
    $routeProvider.when('/categories', {
        templateUrl: 'html/adminViews/categories.html',
        controller: 'Categories'
    }).when('/products', {
        templateUrl: 'html/adminViews/products.html',
        controller: 'Products'
    }).when('/workers', {
        templateUrl: 'html/adminViews/workers.html',
        controller: 'Workers'
    }).when('/sales', {
        templateUrl: 'html/adminViews/sales.html',
        controller: 'Sales'
    }).when('/main', {
        templateUrl: 'html/adminViews/main.html',
        controller: 'Main'
    }).otherwise({redirectTo: '/main'})
} ], ['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);


app.run(function (editableOptions, editableThemes) {
    editableOptions.theme = 'bs3';
    editableThemes.bs3.buttonsClass = 'btn-sm';
});

function Admin($scope, $location, $http) {
    $scope.toolbar = "html/toolbar/adminToolbar.html";
    $http.get("lang.json").success(function (data, status) {
        $scope.lang = data;

        // init menu items
        $scope.tabs = [
            {
                'label': $scope.lang.main,
                'url': '/main'
            },
            {
                'label': $scope.lang.manageCategories,
                'url': '/categories'
            },
            {
                'label': $scope.lang.manageProducts,
                'url': '/products'
            },
            {
                'label': $scope.lang.manageWorkers,
                url: '/workers'
            },
            {
                'label': $scope.lang.sales,
                url: '/sales'
            }
        ];
    });

    $scope.isActive = function (tab) {
        return tab.url === $location.path();
    }
}
