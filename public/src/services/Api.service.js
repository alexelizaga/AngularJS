// (function () {
//   'use strict';
//   angular.module('app').service('ApiService', ['$http', function ($http) {
//     const base = 'https://jsonplaceholder.typicode.com';
  
//     this.getUsers = () => $http.get(`${base}/users`).then(r => r.data);
//     this.saveUser = (data) => $http.post(`${base}/posts`, data).then(r => r.data);
//   }]);
// })();

(function () {
  'use strict';
  angular.module('app').service('ApiService', ['httpClient', function (httpClient) {
    const base = 'https://jsonplaceholder.typicode.com';

    this.getUsers = () =>
      httpClient
        .get(`${base}/users`)
        .then((response) => response.data);

    this.saveUser = (data) =>
      httpClient
        .post(`${base}/posts`, data)
        .then((response) => response.data);
  }]);
})();