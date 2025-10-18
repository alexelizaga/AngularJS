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
    <div>
      <div class="card p-4">
        <h1 class="h4 mb-3">URL Page</h1>
        <p class="text-muted">El parámetro <code>id</code> actual en la URL es:</p>
        <p class="display-6">{{ getId() || '—' }}</p>
        <p class="mt-3">Cambia el parámetro directamente en la URL (por ejemplo, <code>/url/123</code>)
          y observarás cómo este valor se sincroniza con el estado interno mediante el efecto.</p>
      </div>

      <div class="mt-4">
        <a href="/url/1" class="btn btn-primary" role="button">1</a>
        <a href="/url/2" class="btn btn-secondary" role="button">2</a>
        <a href="/url/3" class="btn btn-secondary" role="button">3</a>
        <a href="/url/4" class="btn btn-secondary" role="button">4</a>
        <a href="/url/5" class="btn btn-secondary" role="button">5</a>
      </div>
    </div>
  `;
});
