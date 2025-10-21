(function () {
  'use strict';
  angular.module('app').component('appRoot', {
    template: `
      <ui-navbar></ui-navbar>
      <main class="container py-4">
        <div ng-view></div>
      </main>
    `
  });
})();
