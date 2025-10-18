export function asset(path) {
  console.log(import.meta.env.BASE_URL + 'assets/' + path);
  return import.meta.env.BASE_URL + 'assets/' + path;
}

(function () {
  'use strict';

  angular.module('app').factory('asset', function () {
    return asset;
  });
})();
