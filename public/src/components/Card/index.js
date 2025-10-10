import { defineComponent } from '../../ui/defineComponent.js';
const ng = angular.module('app');
console.log('[ui-card] registrado');

defineComponent(ng, 'uiCard', (props, { html, state, scope }) => {
  const { title, body } = props;

  return html`
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text mb-0">${body}</p>
      </div>
    </div>
  `;
}, ['title', 'body']);
