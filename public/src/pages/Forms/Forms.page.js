import { registerPage } from '../../ui/definePage.js';

console.log('[forms-page] registrado');

registerPage('forms-page', (_vm, { html, state, scope, effect, injector }) => {
  scope.country = "ESP";
  scope.phoneMask = "+34-999999999"

  const [paises, setPaises] = state([]);
  const [form, setForm] = state({
    name: '',
    email: '',
    country: scope.country,
    phone: ''
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

  scope.send = async () => {
    if (!form().name || !form().email || !form().country) {
      alert('Por favor completa todos los campos.');
    }
    const data = await scope.saveForm();
    console.log('📨 Enviado:', data);
  };

  effect(() => {
    scope.loadPaises();
  }, []);

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
            <label class="form-label">Teléfono:</label>
            <input
              type="text"
              class="form-control"
              ng-model="phone"
              ng-change="updateForm('phone', phone)"
              ui-mask="{{ phoneMask }}"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">País de origen</label>
            <select
              class="form-control"
              ng-model="country"
              ng-options="pais.id as pais.nombre for pais in paises()"
              ng-change="updateForm('country', country)"
            >
              <option value="">Seleccione</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">
            <i class="bi bi-floppy-fill"></i>
            Guardar
          </button>
        </form>

        <div class="alert alert-success mt-4" ng-if="sent()">
          <strong>¡Gracias, {{ form().name | uppercase }}!</strong> Hemos recibido tus datos correctamente.
        </div>
      </div>
    </div>
  `;
});