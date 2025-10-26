import { loadComponentModule } from '../../test-utils/loadComponentModule.js';

const loadCounterModule = () => loadComponentModule(() => import('./Counter.component.js'));

describe('uiCounter component', () => {
  afterEach(() => {
    delete global.angular;
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('registra el componente con el tag "uiCounter" sin props adicionales', async () => {
    const { moduleMock, defineComponent } = await loadCounterModule();

    expect(global.angular.module).toHaveBeenCalledWith('app');
    expect(defineComponent).toHaveBeenCalledTimes(1);

    const [ngModule, tagName, render, propNames] = defineComponent.mock.calls[0];

    expect(ngModule).toBe(moduleMock);
    expect(tagName).toBe('uiCounter');
    expect(render).toEqual(expect.any(Function));
    expect(propNames).toBeUndefined();
  });

  it('define las funciones de incremento/decremento y renderiza la estructura esperada', async () => {
    const { defineComponent } = await loadCounterModule();
    const [, , render] = defineComponent.mock.calls[0];

    const html = (strings, ...vals) =>
      strings.reduce((acc, str, index) => acc + str + (vals[index] ?? ''), '');

    const scope = {};
    const getCount = jest.fn(() => 5);
    const setCount = jest.fn();
    const state = jest.fn((initial, opts) => {
      expect(initial).toBe(0);
      expect(opts).toEqual({ reRender: false });
      return [getCount, setCount];
    });

    const output = render({}, { html, scope, state });

    expect(state).toHaveBeenCalledTimes(1);
    expect(scope.getCount).toBe(getCount);

    scope.inc();
    expect(setCount).toHaveBeenCalledTimes(1);
    const incUpdater = setCount.mock.calls[0][0];
    expect(incUpdater).toEqual(expect.any(Function));
    expect(incUpdater(5)).toBe(6);

    scope.dec();
    expect(setCount).toHaveBeenCalledTimes(2);
    const decUpdater = setCount.mock.calls[1][0];
    expect(decUpdater).toEqual(expect.any(Function));
    expect(decUpdater(5)).toBe(4);

    expect(output).toContain('<div class="card mb-3">');
    expect(output).toContain('ng-click="dec()"');
    expect(output).toContain('{{ getCount() }}');
    expect(output).toContain('ng-click="inc()"');
  });
});
