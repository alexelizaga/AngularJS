(function () {
  'use strict';
  angular.module('app').service('CacheService', function () {
    const cache = new Map();
    this.get = key => cache.get(key);
    this.set = (key, value) => cache.set(key, value);
  });
})();