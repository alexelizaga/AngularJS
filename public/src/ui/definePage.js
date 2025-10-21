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
  const destroyHandlers = [];

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

  function onDestroy(handler) {
    if (typeof handler !== 'function') return () => {};
    destroyHandlers.push(handler);
    return () => {
      const idx = destroyHandlers.indexOf(handler);
      if (idx >= 0) {
        destroyHandlers.splice(idx, 1);
      }
    };
  }

  $scope.$on('$destroy', () => {
    while (destroyHandlers.length) {
      const cb = destroyHandlers.shift();
      try {
        cb();
      } catch (err) {
        console.error(err);
      }
    }
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
    onDestroy,
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
export function registerPage(tag, definition, lifecycle = {}) {
  let render = null;
  let config = lifecycle;

  if (typeof definition === 'function') {
    render = definition;
  } else if (definition && typeof definition === 'object') {
    render = definition.render;
    config = definition;
  }

  if (typeof render !== 'function') {
    throw new Error(`registerPage('${tag}') requiere una función de renderizado.`);
  }

  registry[tag] = {
    render,
    onInit: typeof config.onInit === 'function' ? config.onInit : null,
    onRender: typeof config.onRender === 'function' ? config.onRender : null,
    onDestroy: typeof config.onDestroy === 'function' ? config.onDestroy : null,
  };
}
function getEntry(tag) {
  return registry[tag];
}

// ───────────────────────────────────────────────────────────────────────────────
// 3) ÚNICO STUB para TODAS las páginas: <page-host tag="forms-page"></page-host>
let stubDeclared = false;
function ensureStub(ngModule) {
  if (stubDeclared) return;
  stubDeclared = true;

  ngModule.directive('pageHost', ['$compile', '$document', '$timeout', '$injector', function ($compile, $document, $timeout, $injector) {
    return {
      restrict: 'E',
      scope: true,
      link(scope, el, attrs) {
        const tag = (attrs.tag || '').toLowerCase();
        let mountedEl = null;

        const hooks = makeHooks(scope);

        const ctx = {
          html: hooks.html,
          state: hooks.state,
          effect: hooks.effect,
          scope,
          tag,
          injector: $injector,
          onDestroy: hooks.onDestroy,
          getElement: () => mountedEl,
        };

        let initialized = false;
        let entry = null;

        function safeCall(cb, label) {
          if (typeof cb !== 'function') return;
          try {
            cb(ctx);
          } catch (err) {
            const prefix = label ? `[page:${tag}] ${label}()` : `[page:${tag}] handler`;
            console.error(prefix, err);
          }
        }

        function doRender() {
          hooks.resetCursor();

          entry = getEntry(tag);
          if (!entry || typeof entry.render !== 'function') return; // aún no registrado (lazy)

          const out = entry.render(scope, ctx);
          const frag = $compile(out)(scope);
          const nextEl = frag[0];

          if (mountedEl) {
            mountedEl.replaceWith(nextEl);
          } else {
            el[0].replaceWith(nextEl);
          }
          mountedEl = nextEl;

          hooks.flushEffects();

          if (!initialized) {
            initialized = true;
            safeCall(entry.onInit, 'onInit');
          }

          safeCall(entry.onRender, 'onRender');
        }

        // primer render tras digest (por si llega el registro en un resolve previo)
        $timeout(doRender, 0);
        // cada digest revisará si ya hay render registrado
        scope.$watch(() => getEntry(tag)?.render, (r) => { if (r) scope.$evalAsync(doRender); });

        hooks.onDestroy(() => {
          if (!entry) {
            entry = getEntry(tag);
          }
          if (entry) {
            safeCall(entry.onDestroy, 'onDestroy');
          }
          mountedEl = null;
        });
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