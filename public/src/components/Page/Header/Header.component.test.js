import { loadComponentModule } from '../../../test-utils/loadComponentModule.js';

const loadHeaderModule = () =>
  loadComponentModule(() => import('./Header.component.js'));

describe('uiPageHeader component', () => {
  afterEach(() => {
    delete global.angular;
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('registra el componente con el tag "uiPageHeader" y props "title", "subtitle"', async () => {
    const { moduleMock, defineComponent } = await loadHeaderModule();

    expect(global.angular.module).toHaveBeenCalledWith('app');
    expect(defineComponent).toHaveBeenCalledTimes(1);

    const [ngModule, tagName, render, propNames] = defineComponent.mock.calls[0];

    expect(ngModule).toBe(moduleMock);
    expect(tagName).toBe('uiPageHeader');
    expect(render).toEqual(expect.any(Function));
    expect(propNames).toEqual(['title', 'subtitle']);
  });

  it('renderiza el título y subtítulo proporcionados', async () => {
    const { defineComponent } = await loadHeaderModule();
    const [, , render] = defineComponent.mock.calls[0];

    const html = (strings, ...vals) =>
      strings.reduce((acc, str, index) => acc + str + (vals[index] ?? ''), '');

    const output = render(
      { title: 'Hola', subtitle: 'Mundo' },
      { html }
    );

    expect(output).toContain('<h1>Hola</h1>');
    expect(output).toContain('<h4>Mundo</h4>');
    expect(output).toContain('<h5 class="card-title">Hola</h5>');
    expect(output).toContain('<p class="card-text mb-0">Mundo</p>');
  });
});
