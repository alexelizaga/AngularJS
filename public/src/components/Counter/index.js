import { defineComponent } from '../../ui/defineComponent.js';
const ng = angular.module('app');
console.log('[ui-counter] registrado');

defineComponent(ng, 'uiCounter', (_props, { html, state, scope }) => {
  const [getCount, setCount] = state(0,  { reRender: false });

  scope.getCount = getCount;

  scope.inc = () => setCount(c => c + 1);
  scope.dec = () => setCount(c => c - 1);

  return html`
    <div class="card mb-3">
      <div class="card-body d-flex align-items-center gap-2">
        <button class="btn btn-outline-secondary" ng-click="dec()">−</button>
        <span class="fw-bold" style="min-width:3rem;text-align:center;">{{ getCount() }}</span>
        <button class="btn btn-primary" ng-click="inc()">+</button>
      </div>
    </div>
  `;
});