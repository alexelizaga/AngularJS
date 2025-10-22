import { registerPage } from '../../ui/definePage.js';

console.log('[http-page] registrado');

registerPage('http-page', (vm, { html, state, scope, effect, injector }) => {

  const [getUsers, setUsers] = state([]);
  const [getLoading, setLoading] = state(true);
  const [getError, setError] = state('');

  scope.getUsers = getUsers;
  scope.getLoading = getLoading;
  scope.getError = getError;

  scope.loadUsers = () => {
    if (!injector) return;
    const api = injector.get('ApiService');

    setLoading(true);
    setError('');

    api.getUsers()
      .then((users) => {
        setUsers(Array.isArray(users) ? users : []);
        setLoading(false);
      })
      .catch((_error) => {
        setError('No se pudieron cargar los usuarios.');
        setLoading(false);
      });
  };

  // effect(() => {
  //   if (typeof scope.loadUsers === 'function') {
  //     scope.loadUsers()
  //   }
  //   return () => {
  //     console.log('[http-page] cleanup');
  //   }
  // }, []);

  return html`
    <div>
      <ui-page-header
          title="Llamadas" 
          subtitle="http"
      ></ui-page-header>

      <div class="alert alert-info" role="alert" ng-if="getLoading()">
        Cargando usuarios...
      </div>

      <div class="alert alert-danger" role="alert" ng-if="getError()">
        {{ getError() }}
      </div>

      <ul class="list-group" ng-if="!getLoading() && !getError()">
        <li class="list-group-item" ng-repeat="user in getUsers() track by user.id">
          <h2 class="h6 mb-1">{{ user.name }}</h2>
          <p class="mb-0 text-muted">{{ user.email }}</p>
          <small class="text-muted">{{ (user.company && user.company.name) || '—' }}</small>
        </li>
      </ul>
    </div>
  `;
}, {
  onInit({scope}) {
    if (typeof scope.loadUsers === 'function') scope.loadUsers()
  },
  onDestroy() {
    console.log('[http-page] destruido');
  }
});