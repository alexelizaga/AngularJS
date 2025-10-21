import { registerPage } from '../../ui/definePage.js';

console.log('[http-page] registrado');

registerPage('http-page', (vm, { html, state, scope }) => html`
  <div>
    <ui-page-header
        title="Llamadas" 
        subtitle="http"
    ></ui-page-header>
  </div>
`);