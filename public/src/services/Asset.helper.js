(function () {
  'use strict';

  angular.module('app').factory('asset', function () {
    return function (path) {
      return import.meta.env.BASE_URL + 'assets/' + path;
    };
  });
})();
