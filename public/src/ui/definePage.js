// src/ui/definePage.js
// ───────────────────────────────────────────────────────────────────────────────
// 1) Helpers compartidos
export function tagForPath(path) {
  const base = path === '/' ? 'home'
    : String(path || '').replace(/^\/|\/$/g, '').replace(/[^a-z0-9]+/gi, '-');
  return (base.replace(/^-+|-+$/g, '') || 'root') + '-page';
}

// “hooks” muy simples (persisten por instancia)
function makeHooks($scope) {
  let stateStore = [];
  let stateCursor = 0;
  let effectStore = [];
  let effectCursor = 0;
  let pendingEffects = [];

  function state(initial, opts = {}) {
    const i = stateCursor++;
    if (typeof stateStore[i] === 'undefined') {
      stateStore[i] = typeof initial === 'function' ? initial() : initial;
    }
    const get = () => stateStore[i];
    const set = (next) => {
      stateStore[i] = typeof next === 'function' ? next(stateStore[i]) : next;
      if (opts.reRender !== false) $scope.$evalAsync(); // re-render suave
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
        cleanup: typeof cleanup === 'function' ? cleanup : null,
      };
    });
  }

  function flushEffects() {
    if (!pendingEffects.length) return;
    const toRun = pendingEffects.slice();
    pendingEffects = [];
    $scope.$evalAsync(() => {
      toRun.forEach((run) => run());
    });
  }

  $scope.$on('$destroy', () => {
    effectStore.forEach((item) => {
      if (item && typeof item.cleanup === 'function') {
        item.cleanup();
      }
    });
    pendingEffects = [];
    effectStore = [];
    stateStore = [];
  });

  const html = (strings, ...vals) =>
    strings.reduce((s, str, i) => s + str + (vals[i] ?? ''), '');

  return {
    html,
    state,
    effect,
    flushEffects,
    resetCursor: () => {
      stateCursor = 0;
      effectCursor = 0;
    }
  };
}

function areDepsEqual(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) return false;
  }
  return true;
}

// ───────────────────────────────────────────────────────────────────────────────
// 2) Registro global de páginas (tag -> render)
const registry = Object.create(null);
export function registerPage(tag, render) {
  registry[tag] = render;
}
function getRenderer(tag) {
  return registry[tag];
}

// ───────────────────────────────────────────────────────────────────────────────
// 3) ÚNICO STUB para TODAS las páginas: <page-host tag="forms-page"></page-host>
let stubDeclared = false;
function ensureStub(ngModule) {
  if (stubDeclared) return;
  stubDeclared = true;

  ngModule.directive('pageHost', ['$compile', '$document', '$timeout', function ($compile, $document, $timeout) {
    return {
      restrict: 'E',
      scope: true,
      link(scope, el, attrs) {
        const tag = (attrs.tag || '').toLowerCase();
        let mountedEl = null;

        const hooks = makeHooks(scope);

        function doRender() {
          hooks.resetCursor();

          const render = getRenderer(tag);
          if (!render) return; // aún no registrado (lazy), se reintenta en el próximo digest

          const out = render(scope, {
            html: hooks.html,
            state: hooks.state,
            effect: hooks.effect,
            scope,
          });
          const frag = $compile(out)(scope);
          const nextEl = frag[0];

          if (mountedEl) {
            mountedEl.replaceWith(nextEl);
          } else {
            el[0].replaceWith(nextEl);
          }
          mountedEl = nextEl;

          hooks.flushEffects();
        }

        // primer render tras digest (por si llega el registro en un resolve previo)
        $timeout(doRender, 0);
        // cada digest revisará si ya hay render registrado
        scope.$watch(() => getRenderer(tag), (r) => { if (r) scope.$evalAsync(doRender); });
      }
    };
  }]);
}

// ───────────────────────────────────────────────────────────────────────────────
// 4) RUTA *EAGER* (Home): sigue funcionando como tenías
export function definePage(ngModule, path, render, tag = tagForPath(path)) {
  ensureStub(ngModule);
  registerPage(tag, render);

  ngModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when(path, {
      template: `<page-host tag="${tag}"></page-host>`,
    });
  }]);
}

// ───────────────────────────────────────────────────────────────────────────────
// 5) RUTA *LAZY*: plantilla + resolve que sólo carga el módulo (que hará registerPage)
export function defineLazyPage(ngModule, path, loader, tag = tagForPath(path)) {
  ensureStub(ngModule);

  ngModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when(path, {
      template: `<page-host tag="${tag}"></page-host>`,
      resolve: {
        __lazy: ['$q', function ($q) {
          // Importa el módulo de la página; ese módulo llamará a registerPage(tag, render)
          const d = $q.defer();
          loader().then(() => d.resolve(true), (e) => d.reject(e));
          return d.promise;
        }]
      }
    });
  }]);
}