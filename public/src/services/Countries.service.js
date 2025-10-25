import { countriesMockRequest } from './mocks/countries.mock.js';

(function () {
  'use strict';
  angular.module('app').service('CountriesService', ['httpClient', function (httpClient) {
    const base = 'https://jsonplaceholder.typicode.com';

    this.getCountries = () =>
      httpClient
        .get(`${base}/countries`, {
          adapter: countriesMockRequest
        })
        .then((response) => response.data);

  }]);
})();