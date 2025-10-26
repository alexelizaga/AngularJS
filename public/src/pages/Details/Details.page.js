import { registerPage } from '../../ui/definePage.js';
import { img as imgUrl } from "../../services/Asset.helper";

console.log('[details-page] registrado');

registerPage('details-page', (vm, { html, state, scope, effect, injector }) => {
    const [id, _setId] = state(injector.get('$routeParams')?.id);
    const [persona, setPersona] = state(undefined, { reRender: false });

    scope.img = imgUrl;
    scope.id = id;
    scope.persona = persona;

    scope.getPersona = async () => {
        if (!injector) return;
        const api = injector.get('PeopleServices');

        try {
            const persona = await api.getPersona(id());
            setPersona(persona);
        } catch (error) {
            console.error('[detail-page] No fue posible cargar la persona', error);
        }

        if(!persona()) window.location = '/lists';
    };

    effect(() => {
        scope.getPersona();
    }, []);

    return html`
        <div>
            <ui-page-header
                title="{{ persona().nombre }}" 
                subtitle="Persona"
            ></ui-page-header>

            <div style="display:flex; width:100%" ng-if="!!persona">
                <img ng-src="{{ img(persona().avatar) }}" class="avatar img-circle">
                <ul>
                    <li><b>Sexo:</b> {{ persona().sexo }}</li>
                    <li><b>Teléfono:</b> {{ persona().telefono }}</li>
                    <li><b>Móvil:</b> {{ persona().celular }}</li>
                </ul>
            </div>

            <br>

            <a class="btn btn-primary" href="/lists">Volver</a>
        </div>
    `;
});
