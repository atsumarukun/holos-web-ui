import "@testing-library/jest-dom";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.resetAllMocks();
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;
