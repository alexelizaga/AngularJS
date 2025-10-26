import { registerPage } from '../../ui/definePage.js';

console.log('[forms-page] registrado');

registerPage('forms-page', (_vm, { html, state, scope, effect, injector }) => {
  scope.country = "ESP";
  scope.phoneMask = "+34-999999999"

  const [paises, setPaises] = state([]);
  const [form, setForm] = state({
    name: undefined,
    email: undefined,
    country: scope.country,
    phone: undefined
  }, { reRender: false });
  const [sent, setSent] = state(false);

  scope.paises = paises;
  scope.form = form;
  scope.sent = sent;
  
  scope.updateForm = (k, v) => setForm({
    ...form(),
    [k]: v
  });

  scope.loadPaises = async () => {
    if (!injector) return;
    const api = injector.get('CountriesService');

    try {
      setPaises(await api.getCountries());
    } catch (error) {
      console.error('[forms-page] No fue posible cargar los países', error);
    }
  };

  scope.saveForm = async () => {
    if (!injector) return;
    const api = injector.get('ApiService');

    let data;
    try {
      data = await api.saveUser(form());
    } catch (error) {
      console.log('El guardado del usuario ha fallado')
    } finally {
      setSent(true);
    }
    return data;
  }

  scope.send = async (valid) => {
    if(!valid) {
      alert('Por favor completa todos los campos.');
      return
    };

    const resp = await scope.saveForm();
    console.log('📨 Enviado:', resp);
  };

  scope.wasValidated = (form) => {
    return form.$submitted ? 'was-validated' : 'needs-validation'
  }

  effect(() => {
    scope.loadPaises();
  }, []);

  return html`
    <div class="row">
      <ui-page-header
        title="Formularios" 
        subtitle="ng-model, ng-change, ng-options, ng-submit"
      ></ui-page-header>

      <div class="col">
        <div class="card p-4 col">
          <h1 class="h4 mb-3">Formulario de contacto</h1>
          <form name="userForm" ng-class="wasValidated(userForm)" ng-submit="send(userForm.$valid)" novalidate>
            <div class="mb-3">
              <label for="fullName" class="form-label">Nombre:</label>
              <input
                type="text"
                class="form-control"
                id="fullName"
                name="fullName"
                ng-model="fullName"
                ng-change="updateForm('name', fullName)"
                placeholder="Tu nombre"
                minlength="3"
                required
              />
              <p ng-if="userForm.fullName.$error.minlength" class="invalid-feedback">Debe tener al menos 2 caracteres</p>
              <p ng-if="userForm.fullName.$error.required" class="invalid-feedback">Este campo es necesario</p>
              <!-- <p class="valid-feedback">Looks good!</p> -->
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                name="email"
                ng-model="email"
                ng-change="updateForm('email', email)"
                placeholder="tucorreo@ejemplo.com"
                required
              />
              <p class="invalid-feedback">Este campo es necesario</p>
            </div>

            <div class="mb-3">
              <label for="phone" class="form-label">Teléfono:</label>
              <input
                type="text"
                class="form-control"
                name="phone"
                ng-model="phone"
                ng-change="updateForm('phone', phone)"
                ui-mask="{{ phoneMask }}"
                required
              />
              <p class="invalid-feedback">Este campo es necesario</p>
            </div>

            <div class="mb-3">
              <label for="country" class="form-label">País de origen</label>
              <select
                class="form-select"
                name="country"
                ng-model="country"
                ng-options="pais.id as pais.nombre for pais in paises()"
                ng-change="updateForm('country', country)"
                required
              >
                <option disabled value="">Seleccione</option>
              </select>
              <p class="invalid-feedback">Este campo es necesario</p>
            </div>

            <button type="submit" class="btn btn-primary" ng-disabled="!userForm.$dirty">
              <i class="bi bi-floppy-fill"></i>
              Guardar
            </button>
          </form>

          

          <div class="alert alert-success mt-4" ng-if="sent()">
            <strong>¡Gracias, {{ form().name | uppercase }}!</strong> Hemos recibido tus datos correctamente.
          </div>
        </div>
      </div>

      <!--
      <div class="col">
        <pre>{{ userForm | json }}</pre>
      </div>
      -->

    </div>
  `;
});