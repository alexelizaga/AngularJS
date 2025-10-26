import { loadComponentModule } from '../../test-utils/loadComponentModule.js';

jest.mock('../../ui/defineComponent.js', () => ({
  defineComponent: jest.fn(),
}));

const loadNavbarModule = () =>
  loadComponentModule(() => import('./Navbar.component.js'));

describe('uiNavbar component', () => {
  afterEach(() => {
    delete global.angular;
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('registra el componente con el tag "uiNavbar" sin dependencias adicionales', async () => {
    const { moduleMock, defineComponent } = await loadNavbarModule();

    expect(global.angular.module).toHaveBeenCalledWith('app');
    expect(defineComponent).toHaveBeenCalledTimes(1);

    const [ngModule, tagName, render, propNames] = defineComponent.mock.calls[0];

    expect(ngModule).toBe(moduleMock);
    expect(tagName).toBe('uiNavbar');
    expect(render).toEqual(expect.any(Function));
    expect(propNames).toBeUndefined();
  });

  it('renderiza la estructura del navbar con todos los enlaces esperados', async () => {
    const { defineComponent } = await loadNavbarModule();
    const [, , render] = defineComponent.mock.calls[0];

    const html = (strings, ...vals) =>
      strings.reduce((acc, str, index) => acc + str + (vals[index] ?? ''), '');

    const scope = {};
    const effect = jest.fn((cb) => {
      cb();
    });

    const originalWindow = global.window;
    global.window = { location: { pathname: '/forms' } };

    const output = render({}, { html, scope, effect, state: jest.fn() });

    global.window = originalWindow;

    expect(scope.links).toEqual([
      { url: '/', label: 'Home' },
      { url: '/url/1', label: 'Direcciones' },
      { url: '/forms', label: 'Formularios' },
      { url: '/lists', label: 'Listados' },
      { url: '/http', label: 'Llamadas' },
    ]);

    expect(scope.active['/forms']).toBe('active');

    expect(effect).toHaveBeenCalledWith(expect.any(Function), []);

    expect(output).toContain('class="navbar navbar-expand-lg bg-dark border-bottom border-body sticky-top"');
    expect(output).toContain('<a class="navbar-brand" href="#">AngularJS</a>');
    expect(output).toContain('ng-repeat="l in links"');
  });
});
