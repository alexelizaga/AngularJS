jest.mock('../../ui/definePage.js', () => ({
  registerPage: jest.fn(),
}));

const loadHomePageModule = async () => {
  const { registerPage } = await import('../../ui/definePage.js');
  await import('./Home.page.js');
  return registerPage;
};

describe('Home.page', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('registra la página con el tag "home-page" y lifecycle básico', async () => {
    const registerPage = await loadHomePageModule();

    expect(registerPage).toHaveBeenCalledTimes(1);
    const [tag, renderer, lifecycle] = registerPage.mock.calls[0];

    expect(tag).toBe('home-page');
    expect(typeof renderer).toBe('function');
    expect(lifecycle).toEqual(
      expect.objectContaining({
        onInit: expect.any(Function),
        onDestroy: expect.any(Function),
      })
    );
  });

  it('asigna la hora de carga en onInit', async () => {
    const registerPage = await loadHomePageModule();
    const lifecycle = registerPage.mock.calls[0][2];
    const scope = {};

    const toLocaleSpy = jest
      .spyOn(Date.prototype, 'toLocaleTimeString')
      .mockReturnValue('10:00:00');

    try {
      lifecycle.onInit({ scope });
    } finally {
      toLocaleSpy.mockRestore();
    }

    expect(scope.loadedAtText).toBe('10:00:00');
  });
});
