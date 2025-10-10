import { definePage } from '../../ui/definePage.js';
const ng = angular.module('app');

definePage(ng, '/', (vm, { html }) => html`
  <div class="p-3 border rounded">
    <h1 class="h4">Bienvenido 🚀</h1>
    <ui-card title="Tarjeta principal" body="Componente funcional."></ui-card>
  </div>
`);