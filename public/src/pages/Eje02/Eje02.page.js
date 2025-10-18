import { registerPage } from "../../ui/definePage";

console.log('[eje-02-page] registrado');

registerPage('eje-02-page', (vm, { html, state, scope }) => {

    vm.profe = {
        nombre: "Juan Carlos Pineda",
	    bio: "Saludos estudiante, mi nombre es Juan Carlos, encantado de conocerte, soy una apasionado instructor de matemáticas aplicadas cuánticas, más orientado a la física termonuclear. Mi vocación es ser maestro y lograr transmitir mis conocimientos a todos mis estudiantes!.",
	    edad: 47,
	    foto: "assets/img/juancarlos.jpg"
    }

    return html`
        <div>
            <h1>Profesor</h1>
            <h4>{{ profe.nombre }}</h4>
            <hr>

            <div class="row">
                
                <!-- Div que contiene la imagen del profesor -->
                <div class="col-sm-3">
                    <section class="panel">
                        <div class="panel-body" align="center">
                            <img ng-src="{{ profe.foto }}" class="img-circle" alt="" width="150px" height="150px">
                        </div>
                    </section>
                </div>

                <!-- Div, donde se mostrará la bio del profesor -->
                <div class="col-sm-9">
                    <section class="panel">
                        <div class="panel-body">
                            {{ profe.bio }}
                            <br>
                            <br>
                            <strong>Edad:</strong> {{ profe.edad }} años   
                        </div>
                    </section>
                </div>


            </div>
        </div>
    `
})