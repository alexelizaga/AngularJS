import { registerPage } from '../../ui/definePage.js';

console.log('[forms-page] registrado');

registerPage('forms-page', (_vm, { html, state, scope }) => {

  scope.country = "ESP";

  const [getForm, setForm] = state({
    name: '',
    email: '',
    country: scope.country
  }, { reRender: false });
  const [getSent, setSent] = state(false);

  scope.getForm = getForm;
  scope.getSent = getSent;
  
  scope.updateForm = (k, v) => setForm({
    ...getForm(),
    [k]: v
  });

  scope.send = () => {
    if (!getForm().name || !getForm().email || !getForm().country) {
      alert('Por favor completa todos los campos.');
    }
    setSent(true);
    console.log('📨 Enviado:', getForm())
  };

  scope.paises = [
    { id:"CRI", nombre:"COSTA RICA"},
    { id:"HRV", nombre:"CROACIA"},
    { id:"CUB", nombre:"CUBA"},
    { id:"DNK", nombre:"DINAMARCA"},
    { id:"DMA", nombre:"DOMINICA"},
    { id:"DOM", nombre:"REPÚBLICA DOMINICANA"},
    { id:"ECU", nombre:"ECUADOR"},
    { id:"EGY", nombre:"EGIPTO"},
    { id:"SLV", nombre:"EL SALVADOR"},
    { id:"ARE", nombre:"EMIRATOS ÁRABES UNIDOS"},
    { id:"ERI", nombre:"ERITREA"},
    { id:"SVK", nombre:"ESLOVAQUIA"},
    { id:"SVN", nombre:"ESLOVENIA"},
    { id:"ESP", nombre:"ESPAÑA"},
    { id:"USA", nombre:"ESTADOS UNIDOS"},
    { id:"EST", nombre:"ESTONIA"}
  ];

  return html`
    <div>
      <ui-page-header
        title="Formularios" 
        subtitle="ng-model, ng-change, ng-options, ng-submit"
      ></ui-page-header>

      <div class="card p-4">
        <h1 class="h4 mb-3">Formulario de contacto</h1>
        <form ng-submit="send()">
          <div class="mb-3">
            <label class="form-label">Nombre:</label>
            <input
              type="text"
              class="form-control"
              ng-model="fullName"
              ng-change="updateForm('name', fullName)"
              placeholder="Tu nombre"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              ng-model="email"
              ng-change="updateForm('email', email)"
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">País de origen</label>
            <select
              class="form-control"
              ng-model="country"
              ng-options="pais.id as pais.nombre for pais in paises"
              ng-change="updateForm('country', country)"
            >
              <option value="">Seleccione</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Enviar</button>
        </form>

        <div class="alert alert-success mt-4" ng-if="getSent()">
          <strong>¡Gracias, {{ getForm().name | uppercase }}!</strong> Hemos recibido tus datos correctamente.
        </div>
      </div>
    </div>
  `;
});