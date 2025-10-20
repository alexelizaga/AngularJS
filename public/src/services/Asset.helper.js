export function asset(path) {
  return import.meta.env.BASE_URL + 'assets/' + path;
}

(function () {
  'use strict';

  angular.module('app').factory('asset', function () {
    return asset;
  });
})();
