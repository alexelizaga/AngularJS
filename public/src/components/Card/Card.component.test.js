jest.mock('../../ui/defineComponent.js', () => ({
  defineComponent: jest.fn(),
}));

const loadCardModule = async () => {
  const moduleMock = {};

  global.angular = {
    module: jest.fn(() => moduleMock),
  };

  const { defineComponent } = await import('../../ui/defineComponent.js');
  await import('./Card.component.js');

  return { moduleMock, defineComponent };
};

describe('uiCard component', () => {
  afterEach(() => {
    delete global.angular;
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('registra el componente con el tag "uiCard" y props "title", "body"', async () => {
    const { moduleMock, defineComponent } = await loadCardModule();

    expect(global.angular.module).toHaveBeenCalledWith('app');
    expect(defineComponent).toHaveBeenCalledTimes(1);

    const [ngModule, tagName, render, propNames] = defineComponent.mock.calls[0];

    expect(ngModule).toBe(moduleMock);
    expect(tagName).toBe('uiCard');
    expect(render).toEqual(expect.any(Function));
    expect(propNames).toEqual(['title', 'body']);
  });

  it('renderiza el título y cuerpo proporcionados', async () => {
    const { defineComponent } = await loadCardModule();
    const [, , render] = defineComponent.mock.calls[0];

    const html = (strings, ...vals) =>
      strings.reduce((acc, str, index) => acc + str + (vals[index] ?? ''), '');

    const output = render(
      { title: 'Hola', body: 'Mundo' },
      { html }
    );

    expect(output).toContain('<div class="card mb-3">');
    expect(output).toContain('<h5 class="card-title">Hola</h5>');
    expect(output).toContain('<p class="card-text mb-0">Mundo</p>');
  });
});
