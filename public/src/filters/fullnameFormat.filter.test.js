const loadFilter = async () => {
  const filters = {};
  const moduleMock = {
    filter: jest.fn((name, factory) => {
      filters[name] = factory();
      return moduleMock;
    }),
  };

  global.angular = {
    module: jest.fn(() => moduleMock),
  };

  await import('./fullnameFormat.filter.js');

  return { moduleMock, filters };
};

describe('fullnameFormat filter', () => {
  afterEach(() => {
    delete global.angular;
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('registra el filtro fullnameFormat en el módulo app', async () => {
    const { moduleMock, filters } = await loadFilter();

    expect(global.angular.module).toHaveBeenCalledWith('app');
    expect(moduleMock.filter).toHaveBeenCalledWith(
      'fullnameFormat',
      expect.any(Function)
    );
    expect(filters.fullnameFormat).toEqual(expect.any(Function));
  });

  it('devuelve la entrada original cuando no es una cadena', async () => {
    const { filters } = await loadFilter();
    const filter = filters.fullnameFormat;

    const values = [null, undefined, 42, { name: 'John' }, ['John']];

    values.forEach((value) => {
      expect(filter(value)).toBe(value);
    });
  });

  it('normaliza espacios y coloca el apellido antes del nombre', async () => {
    const { filters } = await loadFilter();
    const filter = filters.fullnameFormat;

    expect(filter('  John   Doe  ')).toBe('Doe, John');
    expect(filter('María-José     Carreño Quiñones')).toBe(
      'Quiñones, María-José Carreño'
    );
  });

  it('mantiene el valor cuando no hay apellido o la cadena queda vacía', async () => {
    const { filters } = await loadFilter();
    const filter = filters.fullnameFormat;

    expect(filter('  ')).toBe('');
    expect(filter('Madonna')).toBe('Madonna');
  });
});
