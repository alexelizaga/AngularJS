import { defineComponent } from '../../ui/defineComponent.js';
const ng = angular.module('app');
console.log('[ui-navbar] registrado');

defineComponent(ng, 'uiNavbar', (_props, { html, state, scope, effect }) => {

    scope.links = [
        { url: '/', label: 'Home' },
        { url: '/url/1', label: 'Direcciones' },
        { url: '/react', label: 'React Like' },
        { url: '/eje-02', label: 'Ejercicio 2' },
        { url: '/forms', label: 'Formularios' },
        { url: '/lists', label: 'Listados' },
        { url: '/http', label: 'Llamadas' }
    ]

    scope.setActive = (opt) => {
        scope.active = {};
        scope.active[opt] = 'active';
    }

    scope.getActive = (opt) => scope.active[opt];

    effect(() => {
        scope.setActive('/');
    }, []);

    return html`
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <a class="navbar-brand" href="#">AngularJS</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li ng-repeat="l in links">
                        <a class="nav-link" ng-class="getActive(l.url)" href="{{ l.url }}" ng-click="setActive(l.url)">{{ l.label }}</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    `;
});