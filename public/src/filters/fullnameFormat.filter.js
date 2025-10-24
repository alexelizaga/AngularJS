(function () {
  'use strict';

  angular.module('app').filter('fullnameFormat', function () {
    return function (input) {
      if (typeof input !== 'string') {
        return input;
      }

      var trimmed = input.trim();

      if (!trimmed) {
        return trimmed;
      }

      var parts = trimmed.split(/\s+/);

      if (parts.length < 2) {
        return trimmed;
      }

      var lastName = parts.pop();
      var firstNames = parts.join(' ');

      return lastName + ', ' + firstNames;
    };
  });
})();