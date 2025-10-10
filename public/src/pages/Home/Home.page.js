import { registerPage } from '../../ui/definePage.js';

console.log('[home-page] registrado');

registerPage('home-page', (vm, { html, state, scope }) => html`
  <div class="p-3 border rounded">
    <h1 class="h4">Bienvenido 🚀</h1>
    <ui-card title="Tarjeta principal" body="Componente funcional."></ui-card>
  </div>
`);