import { registerPage } from "../../ui/definePage";
import { img as imgUrl } from "../../services/Asset.helper";

console.log('[list-page] registrado');

registerPage('list-page', (vm, { html, state, scope }) => {
    scope.img = imgUrl;

    scope.personas=[
        {
            "id": 0,
            "sexo": "hombre",
            "nombre": "Kari Carr",
            "avatar": "kari.jpg",
            "telefono": "(826) 453-3497",
            "celular": "(801) 9175-8136"
        },
        {
            "id": 1,
            "sexo": "mujer",
            "nombre": "Tameka Gamble",
            "avatar": "tameka.jpg",
            "telefono": "(824) 438-2499",
            "celular": "(801) 8595-8337"
        },
        {
            "id": 2,
            "sexo": "mujer",
            "nombre": "Charity Austin",
            "avatar": "charity.jpg",
            "telefono": "(817) 512-2258",
            "celular": "(801) 9375-3830"
        },
        {
            "id": 3,
            "sexo": "mujer",
            "nombre": "Slater Hunt",
            "avatar": "slater.jpg",
            "telefono": "(842) 413-3023",
            "celular": "(801) 9555-1729"
        },
        {
            "id": 4,
            "sexo": "mujer",
            "nombre": "Chen Hanson",
            "avatar": "chen.jpg",
            "telefono": "(966) 520-2696",
            "celular": "(801) 9324-4423"
        },
        {
            "id": 5,
            "sexo": "hombre",
            "nombre": "Obrien Davis",
            "avatar": "obrien.jpg",
            "telefono": "(996) 595-3896",
            "celular": "(801) 8195-2732"
        },
        {
            "id": 6,
            "sexo": "hombre",
            "nombre": "Le Haley",
            "avatar": "le.jpg",
            "telefono": "(967) 527-3286",
            "celular": "(801) 8074-5225"
        },
        {
            "id": 7,
            "sexo": "hombre",
            "nombre": "Lester Carney",
            "avatar": "lester.jpg",
            "telefono": "(994) 465-3542",
            "celular": "(801) 9044-7522"
        },
        {
            "id": 8,
            "sexo": "hombre",
            "nombre": "Rosario Perry",
            "avatar": "rosario.jpg",
            "telefono": "(848) 499-2977",
            "celular": "(801) 8495-0625"
        },
        {
            "id": 9,
            "sexo": "mujer",
            "nombre": "Marilyn Huber",
            "avatar": "marilyn.jpg",
            "telefono": "(982) 580-3235",
            "celular": "(801) 8184-2624"
        }
    ];

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
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="p in personas | filter:busqueda | orderBy:columna:reverse">
                                <td><img ng-src="{{ img(p.avatar) }}" class="avatar img-circle"></td>
                                <td>{{ p.nombre }}</td>
                                <td>{{ p.sexo }}</td>
                                <td>{{ p.telefono }}</td>
                                <td>{{ p.celular }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});