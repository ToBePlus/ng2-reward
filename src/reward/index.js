/*
 *
 *          ┌─┐       ┌─┐
 *       ┌──┘ ┴───────┘ ┴──┐
 *       │                 │
 *       │       ───       │
 *       │  ─┬┘       └┬─  │
 *       │                 │
 *       │       ─┴─       │
 *       │                 │
 *       └───┐         ┌───┘
 *           │         │
 *           │         │
 *           │         │
 *           │         └──────────────┐
 *           │                        │
 *           │                        ├─┐
 *           │                        ┌─┘
 *           │                        │
 *           └─┐  ┐  ┌───────┬──┐  ┌──┘
 *             │ ─┤ ─┤       │ ─┤ ─┤
 *             └──┴──┘       └──┴──┘
 *                 神兽保佑
 *                 代码无BUG!
 */
moment.locale('zh-cn');
angular.module('app', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngResource', 'ngAria', 'ngMessages']).config(
        ['$routeProvider',
            '$locationProvider', '$provide',
            '$httpProvider', '$sceProvider',
            function($routeProvider, $locationProvider, $provide, $httpProvider, $sceProvider) {
                $sceProvider.enabled(false);
                $routeProvider
                    .when('/404', {
                        templateUrl: baseUrl + '/template/404.html',
                        controller: ['$scope', function($scope) {
                            $scope.home = window.location.href = window.location.origin + baseUrl;
                        }],
                    })
                    /*.when('/tqyx/store/:id/top', {
                        templateUrl: baseUrl + '/taoqiyx/controllers/top/template.html',
                        controller: 'TopController as vm',
                        resolve: ['$rootScope','$location', function($rootScope,$location) {
                            $rootScope.location = $location.search();
                              noData = $rootScope.location.noData;
                              first = $rootScope.location.first;
                        }],
                    })
                    .when('/tqyx/store/:id/data', {
                        templateUrl: baseUrl + '/taoqiyx/controllers/data/template.html',
                        controller: 'DataController as vm',
                        resolve: ['$rootScope','$location', function($rootScope,$location) {
                            $rootScope.location = $location.search();
                        }],
                    })*/
                    //奖励列表
                    .when('/reward/home', {
                        templateUrl: baseUrl + '/reward/controllers/home/template.html'
                    })
                    //创建奖励
                    .when('/reward/create', {
                        templateUrl: baseUrl + '/reward/controllers/create/template.html'
                    })
                    //展示型
                    .when('/reward/show/add', {
                        templateUrl: baseUrl + '/reward/controllers/show/add/template.html'
                    })
                    .when('/reward/show/edit', {
                        templateUrl: baseUrl + '/reward/controllers/show/edit/template.html'
                    })
                    .when('/reward/show/detail', {
                        templateUrl: baseUrl + '/reward/controllers/show/detail/template.html'
                    })
                    //核验型
                    .when('/reward/pin/add', {
                        templateUrl: baseUrl + '/reward/controllers/pin/add/template.html'
                    })
                    .when('/reward/pin/edit', {
                        templateUrl: baseUrl + '/reward/controllers/pin/edit/template.html'
                    })
                    .when('/reward/pin/detail', {
                        templateUrl: baseUrl + '/reward/controllers/pin/detail/template.html'
                    })
                    //大转盘
                    .when('/reward/baccarat/add', {
                        templateUrl: baseUrl + '/reward/controllers/baccarat/add/template.html'
                    })
                    .when('/reward/baccarat/edit', {
                        templateUrl: baseUrl + '/reward/controllers/baccarat/edit/template.html'
                    })
                    .when('/reward/baccarat/detail/show', {
                        templateUrl: baseUrl + '/reward/controllers/baccarat/detail/template_show.html'
                    })
                    .when('/reward/baccarat/detail/pin', {
                        templateUrl: baseUrl + '/reward/controllers/baccarat/detail/template_pin.html'
                    })
                    //核验账号
                    .when('/reward/account/list', {
                        templateUrl: baseUrl + '/reward/controllers/account/list/template.html'
                    })
                    .when('/reward/account/add', {
                        templateUrl: baseUrl + '/reward/controllers/account/add/template.html'
                    })
                    .when('/reward/account/edit', {
                        templateUrl: baseUrl + '/reward/controllers/account/edit/template.html'
                    })
                    //核验账号
                    .when('/reward/validate/login', {
                        templateUrl: baseUrl + '/reward/controllers/account/list/template.html'
                    })
                    .when('/reward/validate/code', {
                        templateUrl: baseUrl + '/reward/controllers/account/add/template.html'
                    })
                    .otherwise({
                        redirectTo: '/workbench'
                    });

                $provide.factory('loginInterceptor', ['$q', function($q) {
                    return {
                        'response': function(response) {
                            return response;
                        },
                        'responseError': function(rejection) {
                            if (rejection.status == 401) {
                                window.location.href = window.location.origin + baseUrl;
                            }
                            return $q.reject(rejection);
                        }
                    };
                }]);
                $httpProvider.interceptors.push('loginInterceptor');
                $locationProvider.html5Mode(!1);
            }
        ])
    .value('baseUrl',baseUrl)
    .run(['$window', '$rootScope', function($window, $rootScope) {
        $rootScope.baseUrl = baseUrl;
    }])
