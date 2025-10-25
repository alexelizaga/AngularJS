import { registerPage } from '../../ui/definePage.js';
import { img as imgUrl } from "../../services/Asset.helper";

console.log('[details-page] registrado');

registerPage('details-page', (vm, { html, state, scope, effect, injector }) => {
    const [id, setId] = state('');

    scope.img = imgUrl;
    scope.id = id;

    scope.getId = () => {
        if (!injector) return;
        // const $route = injector.get('$route');
        // setId($route.current?.params?.id ?? '');
        const $routeParams = injector.get('$routeParams');
        setId($routeParams?.id ?? '');
    };

    scope.getPersona = () => {
        if (!injector) return;
        const api = injector.get('PersonasService');
        scope.persona = api.getPersona(id());
        if(!scope.persona) window.location = '/lists';
    };

    effect(() => {
        scope.getId();
    }, []);

    effect(() => {
        if(!id()) return;
        scope.getPersona();
    }, [id()]);

    return html`
        <div>
            <ui-page-header
                title="{{ persona.nombre }}" 
                subtitle="Persona"
            ></ui-page-header>

            <div style="display:flex; width:100%" ng-if="!!persona">
                <img ng-src="{{ img(persona.avatar) }}" class="avatar img-circle">
                <ul>
                    <li><b>Sexo:</b> {{ persona.sexo }}</li>
                    <li><b>Teléfono:</b> {{ persona.telefono }}</li>
                    <li><b>Móvil:</b> {{ persona.celular }}</li>
                </ul>
            </div>

            <br>

            <a class="btn btn-primary" href="/lists">Volver</a>
        </div>
    `;
});
