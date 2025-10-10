(function () {
  'use strict';
  angular.module('app').config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
      $locationProvider.html5Mode({ enabled: true, requireBase: true, rewriteLinks: true });
      $routeProvider.otherwise('/');
    }
  ]);
})();