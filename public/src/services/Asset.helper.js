export function asset(path) {
  return import.meta.env.BASE_URL + 'assets/' + path;
}

export function img(path) {
  return import.meta.env.BASE_URL + 'assets/img/' + path;
}

(function () {
  'use strict';

  angular.module('app').factory('asset', function () {
    return asset;
  });

  angular.module('app').factory('img', function () {
    return img;
  });
})();
