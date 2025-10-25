(function () {
  'use strict';

  angular.module('app').factory('httpClient', [function () {
    // const base = 'https://jsonplaceholder.typicode.com';

    const client = axios.create(
        // { baseURL: base, }
    );

    client.interceptors.request.use((config) => {
      try {
        const token = window.localStorage.getItem('token');

        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        } else if (config.headers && config.headers.Authorization) {
          delete config.headers.Authorization;
        }
      } catch (error) {
        console.warn('[httpClient] Unable to read token from localStorage', error);
      }

      return config;
    });

    return client;
  }]);
})();