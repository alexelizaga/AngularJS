(function () {
  'use strict';
  angular.module('app').directive('uiCounter', function ($compile) {
    return {
      restrict: 'E',
      scope: {},
      link(scope, el) {
        scope.count = 0;
        scope.inc = () => scope.count++;
        scope.dec = () => scope.count--;
        const html = `
          <div class="card mb-3">
            <div class="card-body d-flex align-items-center gap-2">
              <button class="btn btn-outline-secondary" ng-click="dec()">−</button>
              <span class="fw-bold" style="min-width:3rem; text-align:center;">{{count}}</span>
              <button class="btn btn-primary" ng-click="inc()">+</button>
            </div>
          </div>`;
        const compiled = $compile(html)(scope);
        el.append(compiled);
      }
    };
  });
})();