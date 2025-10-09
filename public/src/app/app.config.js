(function () {
  'use strict';

  angular.module('app').config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

      $locationProvider.html5Mode({ enabled: true, requireBase: true, rewriteLinks: true });

      $routeProvider
        .when('/', {
          templateUrl: '/src/pages/Home/Home.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm'
        })
        .when('/forms', {
          templateUrl: '/src/pages/Forms/Forms.html',
          controller: 'FormsCtrl',
          controllerAs: 'vm'
        })
        .when('/react', {                                  // 👇 ruta añadida aquí directamente
          templateUrl: '/src/pages/ReactDemo/ReactDemo.html',
          controller: 'ReactDemoCtrl',
          controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/' });
    }
  ]);
})();