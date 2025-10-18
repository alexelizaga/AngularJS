import { registerPage } from '../../ui/definePage.js';

console.log('[url-page] registrado');

registerPage('url-page', (vm, { html, state, scope, effect }) => {
  const [getId, setId] = state('');

  scope.getId = getId;

  effect(() => {
    const injector = angular.element(document.body).injector();
    if (!injector) return;

    const $route = injector.get('$route');

    return scope.$watch(
      () => $route.current?.params?.id ?? '',
      (nextId) => setId(nextId)
    );
  }, []);

  return html`
    <div class="card p-4">
      <h1 class="h4 mb-3">URL Page</h1>
      <p class="text-muted">El parámetro <code>id</code> actual en la URL es:</p>
      <p class="display-6">{{ getId() || '—' }}</p>
      <p class="mt-3">Cambia el parámetro directamente en la URL (por ejemplo, <code>/url/123</code>)
        y observarás cómo este valor se sincroniza con el estado interno mediante el efecto.</p>
    </div>
  `;
});
