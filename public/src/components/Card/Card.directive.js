(function () {
  'use strict';
  angular.module('app').directive('uiCard', function () {
    return {
      restrict: 'E',
      scope: { title: '@', body: '@' },
      template: `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text mb-0">{{body}}</p>
          </div>
        </div>`
    };
  });
})();