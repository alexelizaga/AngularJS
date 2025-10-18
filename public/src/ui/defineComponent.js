export function defineComponent(ngModule, tagName, render, propNames = []) {
  ngModule.directive(kebabToCamel(tagName), ['$compile', function ($compile) {
    return {
      restrict: 'E',
      scope: propNames.reduce((acc, p) => (acc[p] = '@', acc), {}),

      link(scope, el, attrs) {
        const html = (strings, ...vals) =>
          strings.reduce((s, str, i) => s + str + (vals[i] ?? ''), '');

        // --- Hooks persistentes por instancia (igual que definePage) ---
        let stateStore = [];    // valores de estado del componente
        let stateCursor = 0;    // índice del hook de estado actual
        let effectStore = [];   // metadatos de efectos
        let effectCursor = 0;   // índice del hook de efecto actual
        let pendingEffects = [];

        function state(initial, opts = {}) {
          const i = stateCursor++;
          if (typeof stateStore[i] === 'undefined') {
            stateStore[i] = (typeof initial === 'function') ? initial() : initial;
          }
          const get = () => stateStore[i];
          const set = (next) => {
            stateStore[i] = (typeof next === 'function') ? next(stateStore[i]) : next;
            if (opts.reRender !== false) {
              scope.$evalAsync(doRender); // re-render del componente
            } else {
              scope.$evalAsync();         // solo digest (no reemplaza DOM)
            }
          };
          return [get, set];
        }

        function effect(callback, deps) {
          const i = effectCursor++;
          const prev = effectStore[i];
          const depsArray = Array.isArray(deps) ? deps : null;
          const shouldRun = !prev
            || !depsArray
            || !prev.deps
            || !areDepsEqual(prev.deps, depsArray);

          if (!shouldRun) {
            effectStore[i] = prev;
            return;
          }

          pendingEffects.push(() => {
            if (prev && typeof prev.cleanup === 'function') {
              prev.cleanup();
            }
            const cleanup = callback();
            effectStore[i] = {
              deps: depsArray ? depsArray.slice() : null,
              cleanup: (typeof cleanup === 'function') ? cleanup : null,
            };
          });
        }

        function flushEffects() {
          if (!pendingEffects.length) return;
          const toRun = pendingEffects.slice();
          pendingEffects = [];
          scope.$evalAsync(() => {
            toRun.forEach((run) => run());
          });
        }

        scope.$on('$destroy', () => {
          effectStore.forEach((item) => {
            if (item && typeof item.cleanup === 'function') {
              item.cleanup();
            }
          });
          pendingEffects = [];
          effectStore = [];
          stateStore = [];
        });
        // ----------------------------------------------------------------

        const readProps = () =>
          Object.fromEntries(propNames.map(k => [k, attrs[k]]));

        // nodo actualmente montado (para reemplazar sin vaciar el host)
        let mountedEl = null;

        function doRender() {
          stateCursor = 0;  // reinicia índice de hooks de estado antes de cada render
          effectCursor = 0; // reinicia índice de hooks de efecto

          const out = render(readProps(), { html, scope, state, effect });
          const frag = $compile(out)(scope);
          const nextEl = frag[0];

          if (mountedEl) {
            mountedEl.replaceWith(nextEl);     // swap seguro
          } else {
            el.empty();                        // primer render: limpia el host
            el.append(nextEl);
          }
          mountedEl = nextEl;

          flushEffects();
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
        scope.$on('$destroy', () => { mountedEl = null; stateStore = []; });
      }
    };
  }]);
}

function kebabToCamel(s) {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function areDepsEqual(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) return false;
  }
  return true;
}