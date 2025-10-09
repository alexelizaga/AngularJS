(function () {
  'use strict';
  angular.module('app').run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeStart', (_, next) => {
      console.log('➡️ Navegando a:', next?.originalPath);
    });
  }]);
})();