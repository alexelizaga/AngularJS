export function definePage(ngModule, path, render) {
  ngModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when(path, {
      template: '<div data-page-root></div>',
      controllerAs: 'vm',
      controller: [
        '$compile', '$scope', '$document', '$timeout',
        function ($compile, $scope, $document, $timeout) {
          const html = (strings, ...vals) =>
            strings.reduce((s, str, i) => s + str + (vals[i] ?? ''), '');

          // --- mini sistema de hooks persistentes ---
          let store = [];
          let cursor = 0;
          function state(initial, opts = {}) {
            const i = cursor++;
            if (typeof store[i] === 'undefined') {
              store[i] = typeof initial === 'function' ? initial() : initial;
            }
            const get = () => store[i];
            const set = (next) => {
              store[i] = typeof next === 'function' ? next(store[i]) : next;
              if (opts.reRender !== false) {
                $scope.$evalAsync(doRender);
              } else {
                $scope.$evalAsync(); // solo digest
              }
            };
            return [get, set];
          }
          // ------------------------------------------

          const vm = this;

          // ⬇️ referencia estable al nodo actualmente montado
          let mountedEl = null;

          function doRender() {
            cursor = 0; // reinicia el índice de hooks

            const out = render(vm, { html, scope: $scope, state });
            const frag = $compile(out)($scope);
            const nextEl = frag[0];

            if (mountedEl) {
              // reemplaza el contenido actual por el nuevo
              mountedEl.replaceWith(nextEl);
            } else {
              // primer render: usa el placeholder
              const placeholder = $document[0].querySelector('[data-page-root]');
              if (placeholder) placeholder.replaceWith(nextEl);
            }

            mountedEl = nextEl; // guarda referencia para el siguiente render
          }

          // primer render tras el digest
          $timeout(doRender, 0);
        }
      ]
    });
  }]);
}