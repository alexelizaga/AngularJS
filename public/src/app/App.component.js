(function () {
  'use strict';
  angular.module('app').component('appRoot', {
    template: `
      <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom mb-4">
        <div class="container">
          <a class="navbar-brand" href="/">Mi App</a>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/forms">Forms</a></li>
            <li class="nav-item"><a class="nav-link" href="/react">React Like</a></li>
            <li class="nav-item"><a class="nav-link" href="/url/demo">URL Page</a></li>
          </ul>
        </div>
      </nav>
      <main class="container py-4">
        <div ng-view></div>
      </main>
    `
  });
})();