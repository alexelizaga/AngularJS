import { peopleMockRequest } from './mocks/people.mock';

(function () {
  'use strict';
  angular.module('app').service('PeopleServices', ['httpClient', function (httpClient) {
    const base = 'https://jsonplaceholder.typicode.com';

    this.getPersonas = () =>
        httpClient
            .get(`${base}/people`, {
                adapter: peopleMockRequest
            })
            .then((response) => response.data);

    this.getPersona = (id) =>
        httpClient
            .get(`${base}/people/${id}`, {
                adapter: peopleMockRequest
            })
            .then((response) => response.data[id]);

  }]);
})();
