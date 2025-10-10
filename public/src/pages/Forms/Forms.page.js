import { registerPage } from '../../ui/definePage.js';

console.log('[forms-page] registrado');

registerPage('forms-page', (vm, { html, state, scope }) => {
  const [getName, setName] = state('', { reRender: false });
  const [getEmail, setEmail] = state('', { reRender: false });
  const [getSent, setSent] = state(false);

  scope.getSent = getSent;
  scope.name = getName;

  scope.updateName = v => setName(v);
  scope.updateEmail = v => setEmail(v);
  scope.send = () => {
    if (!getName() || !getEmail()) { alert('Por favor completa todos los campos.'); return; }
    setSent(true);
    console.log('📨 Enviado:', { nombre: getName(), email: getEmail() });
  };

  return html`
    <div class="card p-4">
      <h1 class="h4 mb-3">Formulario de contacto</h1>
      <form ng-submit="send()" novalidate autocomplete="off">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" name="fullNameField"
                 ng-model="fullName" ng-change="updateName(fullName)" placeholder="Tu nombre" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" name="emailField"
                 ng-model="email" ng-change="updateEmail(email)" placeholder="tucorreo@ejemplo.com" required />
        </div>

        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>

      <div class="alert alert-success mt-4" ng-if="getSent()">
        <strong>¡Gracias, {{ name() }}!</strong> Hemos recibido tus datos correctamente.
      </div>
    </div>
  `;
});