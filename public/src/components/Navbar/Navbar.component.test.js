jest.mock('../../ui/defineComponent.js', () => ({
  defineComponent: jest.fn(),
}));

const loadNavbarModule = async () => {
  const moduleMock = {};

  global.angular = {
    module: jest.fn(() => moduleMock),
  };

  const { defineComponent } = await import('../../ui/defineComponent.js');
  await import('./Navbar.component.js');

  return { moduleMock, defineComponent };
};

describe('uiNavbar component', () => {
  afterEach(() => {
    delete global.angular;
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('registra el componente con el tag "uiNavbar" y dependencias ["title", "body"]', async () => {
    const { moduleMock, defineComponent } = await loadNavbarModule();

    expect(global.angular.module).toHaveBeenCalledWith('app');
    expect(defineComponent).toHaveBeenCalledTimes(1);

    const [ngModule, tagName, render, propNames] = defineComponent.mock.calls[0];

    expect(ngModule).toBe(moduleMock);
    expect(tagName).toBe('uiNavbar');
    expect(render).toEqual(expect.any(Function));
    expect(propNames).toEqual(['title', 'body']);
  });

  it('renderiza la estructura del navbar con todos los enlaces esperados', async () => {
    const { defineComponent } = await loadNavbarModule();
    const [, , render] = defineComponent.mock.calls[0];

    const html = (strings, ...vals) =>
      strings.reduce((acc, str, index) => acc + str + (vals[index] ?? ''), '');

    const output = render({}, { html });

    expect(output).toContain('class="navbar navbar-expand-lg bg-body-tertiary"');
    expect(output).toContain('<a class="navbar-brand" href="#">AngularJS</a>');

    const links = [
      ['/', 'Home'],
      ['/url/1', 'URL Page'],
      ['/react', 'React Like'],
      ['/eje-02', 'Ejercicio 2'],
      ['/forms', 'Formularios'],
      ['/lists', 'Listados'],
      ['/http', 'Llamadas'],
    ];

    links.forEach(([href, label]) => {
      expect(output).toContain(`<a class="nav-link" href="${href}">${label}</a>`);
    });
  });
});
