import { registerPage } from "../../ui/definePage";
import { asset as assetUrl } from "../../services/Asset.helper";

console.log('[eje-02-page] registrado');

registerPage('eje-02-page', (vm, { html, state, scope }) => {

    scope.asset = assetUrl;

    // vm.profe = {
    //     nombre: "Juan Carlos Pineda",
	//     bio: "Saludos estudiante, mi nombre es Juan Carlos, encantado de conocerte, soy una apasionado instructor de matemáticas aplicadas cuánticas, más orientado a la física termonuclear. Mi vocación es ser maestro y lograr transmitir mis conocimientos a todos mis estudiantes!.",
	//     edad: 47,
	//     foto: "assets/img/juancarlos.jpg"
    // }

    scope.profesor = {
        nombre: "Juan Carlos Pineda",
	    bio: "Saludos estudiante, mi nombre es Juan Carlos, encantado de conocerte, soy una apasionado instructor de matemáticas aplicadas cuánticas, más orientado a la física termonuclear. Mi vocación es ser maestro y lograr transmitir mis conocimientos a todos mis estudiantes!.",
	    edad: 47,
	    foto: "img/juancarlos.jpg"
    }

    scope.editando = {}

    scope.mostrarCaja = false;

    scope.EditarProfesor = () => {
        // angular.copy(scope.profesor, scope.editando)
        scope.editando = { ...scope.profesor };
        scope.mostrarCaja = true;
    }

    scope.GuardarCambios = () => {
        scope.profesor = { ...scope.editando };
        scope.mostrarCaja = false;
    }

    scope.CancelarCambios = () => {
        scope.editando = {};
        scope.mostrarCaja = false;
    }

    return html`
        <div>
            <h1>Profesor</h1>
            <h4>{{ profesor.nombre }}</h4>
            <hr>

            <div class="row">
                <!-- Div que contiene la imagen del profesor -->
                <div class="col-sm-3">
                    <section class="panel">
                        <div class="panel-body" align="center">
                            <img ng-src="{{ asset(profesor.foto) }}" class="img-thumbnail" width="150px" height="150px">
                        </div>
                    </section>
                </div>

                <!-- Div, donde se mostrará la bio del profesor -->
                <div class="col-sm-9">
                    <section class="panel">
                        <div class="panel-body">
                            {{ profesor.bio }}
                            <br>
                            <br>
                            <strong>Edad:</strong> {{ profesor.edad }} años
                            <br>
                            <button class="btn btn-primary" ng-click="EditarProfesor()">Editar</button>
                        </div>
                    </section>
                </div>
            </div>

            <div class="row" ng-show="mostrarCaja">
                <div class="col-sm-6">
                    <section class="panel">
                        <div class="panel-body">
                            Nombre:
                            <input type="text" class="form-control" ng-model="editando.nombre" />
                            <br>

                            Edad:
                            <input type="text" class="form-control" ng-model="editando.edad" />
                            <br>

                            Bio:
                            <textarea class="form-control" rows="5" ng-model="editando.bio"></textarea>
                            <br>

                            <button class="btn btn-primary" ng-click="GuardarCambios()">Guardar</button>
                            <button class="btn btn-danger" ng-click="CancelarCambios()">Cancelar</button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    `
})