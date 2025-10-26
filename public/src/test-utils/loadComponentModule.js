jest.mock('../ui/defineComponent.js', () => ({
  defineComponent: jest.fn(),
}));

export const loadComponentModule = async (importComponent) => {
  const moduleMock = {};
  global.angular = {
    module: jest.fn(() => moduleMock),
  };
  const { defineComponent } = await import('../ui/defineComponent.js');
  await importComponent();
  return { moduleMock, defineComponent };
};
