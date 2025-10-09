(function () {
  'use strict';
  angular.module('app').service('ApiService', ['$http', function ($http) {
    const base = 'https://jsonplaceholder.typicode.com';
    this.getUsers = () => $http.get(`${base}/users`).then(r => r.data);
  }]);
})();