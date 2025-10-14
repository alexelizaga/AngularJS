import { registerPage } from '../../ui/definePage.js';

console.log('[react-page] registrado');

registerPage('react-page', (vm, { html, state, scope, effect }) => {
  const [getClicks, setClicks] = state(0,  { reRender: false });

  scope.getClicks = getClicks;

  scope.increment = () => setClicks(c => c + 1);
  scope.reset = () => setClicks(0);

  effect(() => {
    const stop = scope.$watch(getClicks, (next, prev) => {
      if (next !== prev) {
        console.log('[react-page] clicks changed →', next);
      }
    });

    return () => {
      stop();
    };
  }, []);

  return html`
    <div class="py-4">
      <h2 class="h4 mb-3">Demo React-like ⚛️</h2>
      <p class="text-muted">
        Esta página está renderizada mediante una función JS que devuelve HTML, 
        similar a un componente React.
      </p>

      <div class="mb-4">
        <ui-card 
          title="Componente funcional" 
          body="Los componentes ui-card y ui-counter están definidos con defineComponent().">
        </ui-card>
      </div>

      <ui-counter></ui-counter>

      <div class="card p-3 mt-4">
        <p class="mb-2">Clicks: <strong>{{ getClicks() }}</strong></p>
        <button class="btn btn-primary me-2" ng-click="increment()">+1</button>
        <button class="btn btn-outline-secondary" ng-click="reset()">Reiniciar</button>
      </div>
    </div>
  `;
});