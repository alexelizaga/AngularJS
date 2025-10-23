import { registerPage } from '../../ui/definePage.js';

console.log('[home-page] registrado');

registerPage('home-page', (vm, { html, state, scope, effect }) => {
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
    <div>
      <ui-page-header
        title="Home" 
        subtitle="React Like"
      ></ui-page-header>

        <ui-card 
          title="Componente funcional" 
          body="Los componentes ui-card y ui-counter están definidos con defineComponent().">
        </ui-card>

        <ui-counter></ui-counter>

        <div class="card p-3 mt-4">
          <p class="mb-2">Clicks: <strong>{{ getClicks() }}</strong></p>
          <button class="btn btn-primary me-2" ng-click="increment()">+1</button>
          <button class="btn btn-outline-secondary" ng-click="reset()">Reiniciar</button>
        </div>
    </div>
    <div class="p-3 border rounded">
      <h1 class="h4">Bienvenido 🚀</h1>
      <p class="text-muted">Página montada a las: <strong>{{ loadedAtText }}</strong></p>
      <ui-card title="Tarjeta principal" body="Componente funcional."></ui-card>
    </div>
  `},
  {
    onInit({ scope }) {
      scope.loadedAtText = new Date().toLocaleTimeString();
    },
    onDestroy() {
      console.log('[home-page] destruido');
    }
  }
);