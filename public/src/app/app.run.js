(function () {
  'use strict';
  angular.module('app').run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function (_e, next) {
      console.log('➡️ Navegando a:', next && next.originalPath);
    });
  }]);
})();