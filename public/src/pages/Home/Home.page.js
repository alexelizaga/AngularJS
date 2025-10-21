import { registerPage } from '../../ui/definePage.js';

console.log('[home-page] registrado');

registerPage('home-page', (vm, { html }) => html`
  <div class="p-3 border rounded">
    <h1 class="h4">Bienvenido 🚀</h1>
    <p class="text-muted">Página montada a las: <strong>{{ loadedAtText }}</strong></p>
    <ui-card title="Tarjeta principal" body="Componente funcional."></ui-card>
  </div>
`, {
  onInit({ scope }) {
    scope.loadedAtText = new Date().toLocaleTimeString();
  },
  onDestroy() {
    console.log('[home-page] destruido');
  }
});