import { defineComponent } from '../../ui/defineComponent.js';
const ng = angular.module('app');
console.log('[ui-navbar] registrado');

defineComponent(ng, 'uiNavbar', (_props, { html, state, scope }) => {
    return html`
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <a class="navbar-brand" href="#">AngularJS</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="/url/1">URL Page</a></li>
                    <li class="nav-item"><a class="nav-link" href="/react">React Like</a></li>
                    <li class="nav-item"><a class="nav-link" href="/eje-02">Ejercicio 2</a></li>
                    <li class="nav-item"><a class="nav-link" href="/forms">Formularios</a></li>
                    <li class="nav-item"><a class="nav-link" href="/lists">Listados</a></li>
                    <li class="nav-item"><a class="nav-link" href="/http">Llamadas</a></li>
                </ul>
                </div>
            </div>
        </nav>
    `;
}, ['title', 'body']);