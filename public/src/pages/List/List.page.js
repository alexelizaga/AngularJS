import { registerPage } from "../../ui/definePage";
import { img as imgUrl } from "../../services/Asset.helper";

console.log('[list-page] registrado');

registerPage('list-page', (vm, { html, state, scope, effect, injector }) => {
    const [personas, setPersonas] = state([]);
    const [position, setPosition] = state(5);

    scope.img = imgUrl;
    scope.personas = personas;
    scope.position = position;

    scope.siguiente = () => {
        if (personas().length > position()) {
            setPosition(p => p + 5);
        }
    }

    scope.anteriores = () => {
        if (position() > 5) {
            setPosition(p => p - 5);
        }
    }

    scope.loadPersonas = async () => {
        if (!injector) return;
        const api = injector.get('PeopleServices');

        try {
            setPersonas(await api.getPersonas());
        } catch (error) {
            console.error('[list-page] No fue posible cargar las personas', error);
        }
    };

    effect(() => {
        scope.loadPersonas();
    }, []);

    return html`
        <div>
            <ui-page-header
                title="Listados" 
                subtitle="ng-repeat"
            ></ui-page-header>

            <div class="row">
                <div class="col">
                    <label class="form-label">Busqueda</label>
                    <input
                        type="text"
                        ng-model="busqueda.nombre"
                        class="form-control"
                        placeholder="Nombre"
                    />
                </div>
                <div class="col">
                    <label class="form-label">Sexo</label>
                    <select ng-model="busqueda.sexo" class="form-control">
                        <option value="">Cualquiera</option>
                        <option value="mujer">Mujeres</option>
                        <option value="hombre">Hombres</option>
                    </select>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Avatar</th>
                                <th scope="col"><a class="link" ng-click="columna='nombre';reverse = !reverse">Nombre</a></th>
                                <th scope="col"><a class="link" ng-click="columna='sexo';reverse = !reverse">Sexo</a></th>
                                <th scope="col"><a>Teléfono</a></th>
                                <th scope="col"><a>Móvil</a></th>
                                <th scope="col"><a>Ver</a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="p in personas() | filter:busqueda | orderBy:columna:reverse | limitTo:position() | limitTo:-5">
                                <td><img ng-src="{{ img(p.avatar) }}" class="avatar img-circle"></td>
                                <td>{{ p.nombre | fullnameFormat }}</td>
                                <td>{{ p.sexo }}</td>
                                <td>{{ p.telefono }}</td>
                                <td>{{ p.celular }}</td>
                                <td>
                                    <a href="/details/{{p.id}}" aria-label="Ver registro">
                                        <i class="bi bi-eye-fill"></i>
                                        <span class="visually-hidden">Ver registro</span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <br>

                    <button class="btn btn-primary" ng-click="anteriores()">
                        <i class="bi bi-chevron-left"></i>
                        Anteriores
                    </button>
                    <button class="btn btn-primary" ng-click="siguiente()">
                        Siguientes
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `
});