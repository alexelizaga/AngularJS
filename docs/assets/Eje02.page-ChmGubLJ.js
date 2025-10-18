import{r as e}from"./index-BaIJh3no.js";console.log("[eje-02-page] registrado");e("eje-02-page",(o,{html:s,state:r,scope:a})=>(o.profe={nombre:"Juan Carlos Pineda",bio:"Saludos estudiante, mi nombre es Juan Carlos, encantado de conocerte, soy una apasionado instructor de matemáticas aplicadas cuánticas, más orientado a la física termonuclear. Mi vocación es ser maestro y lograr transmitir mis conocimientos a todos mis estudiantes!.",edad:47,foto:"assets/img/juancarlos.jpg"},a.profesor={nombre:"Juan Carlos Pineda",bio:"Saludos estudiante, mi nombre es Juan Carlos, encantado de conocerte, soy una apasionado instructor de matemáticas aplicadas cuánticas, más orientado a la física termonuclear. Mi vocación es ser maestro y lograr transmitir mis conocimientos a todos mis estudiantes!.",edad:47,foto:"assets/img/juancarlos.jpg"},a.editando={},a.EditarProfesor=()=>{a.editando={...a.profesor}},a.GuardarCambios=()=>{a.profesor={...a.editando}},a.CancelarCambios=()=>{a.editando={}},s`
        <div>
            <h1>Profesor</h1>
            <h4>{{ profesor.nombre }}</h4>
            <hr>

            <div class="row">
                <!-- Div que contiene la imagen del profesor -->
                <div class="col-sm-3">
                    <section class="panel">
                        <div class="panel-body" align="center">
                            <img ng-src="{{ profesor.foto }}" class="img-thumbnail" alt="" width="150px" height="150px">
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

            <div class="row">
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
    `));
