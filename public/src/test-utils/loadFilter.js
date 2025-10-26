export const loadFilter = async (importFilterModule) => {
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

  await importFilterModule();

  return { moduleMock, filters };
};
