import { defineComponent } from '../../../ui/defineComponent.js';
const ng = angular.module('app');
console.log('[ui-page-header] registrado');

defineComponent(ng, 'uiPageHeader', (props, { html, state, scope }) => {
  const { title, subtitle } = props;

  return html`
    <div class="mb-4">
      <h1>${title}</h1>
      <h4>${subtitle}</h4>
    </div>
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text mb-0">${subtitle}</p>
      </div>
    </div>
  `;
}, ['title', 'subtitle']);
