export function defineComponent(ngModule, tagName, render, propNames = []) {
  ngModule.directive(kebabToCamel(tagName), ['$compile', function ($compile) {
    return {
      restrict: 'E',
      scope: propNames.reduce((acc, p) => (acc[p] = '@', acc), {}),

      link(scope, el, attrs) {
        const html = (strings, ...vals) =>
          strings.reduce((s, str, i) => s + str + (vals[i] ?? ''), '');

        // --- Hooks persistentes por instancia (igual que definePage) ---
        let store = [];   // valores de estado del componente
        let cursor = 0;   // índice del hook actual
        function state(initial, opts = {}) {
          const i = cursor++;
          if (typeof store[i] === 'undefined') {
            store[i] = (typeof initial === 'function') ? initial() : initial;
          }
          const get = () => store[i];
          const set = (next) => {
            store[i] = (typeof next === 'function') ? next(store[i]) : next;
            if (opts.reRender !== false) {
              scope.$evalAsync(doRender); // re-render del componente
            } else {
              scope.$evalAsync();         // solo digest (no reemplaza DOM)
            }
          };
          return [get, set];
        }
        // ----------------------------------------------------------------

        const readProps = () =>
          Object.fromEntries(propNames.map(k => [k, attrs[k]]));

        // nodo actualmente montado (para reemplazar sin vaciar el host)
        let mountedEl = null;

        function doRender() {
          cursor = 0; // reinicia índice de hooks antes de cada render

          const out = render(readProps(), { html, scope, state });
          const frag = $compile(out)(scope);
          const nextEl = frag[0];

          if (mountedEl) {
            mountedEl.replaceWith(nextEl);     // swap seguro
          } else {
            el.empty();                        // primer render: limpia el host
            el.append(nextEl);
          }
          mountedEl = nextEl;
        }

        // render inicial
        doRender();

        // re-render automático cuando cambian props/atributos
        if (propNames.length) {
          // Observa cambios de atributos (incluye interpolaciones)
          propNames.forEach(name => attrs.$observe(name, () => scope.$evalAsync(doRender)));

          // watcher de respaldo (por si el atributo cambia por binding complejo)
          const stop = scope.$watchGroup(propNames.map(n => () => attrs[n]), doRender);
          scope.$on('$destroy', stop);
        }

        // cleanup extra (por si el host se destruye)
        scope.$on('$destroy', () => { mountedEl = null; store = []; });
      }
    };
  }]);
}

function kebabToCamel(s) {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}