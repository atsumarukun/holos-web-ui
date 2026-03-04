import { render } from "@testing-library/react";
import { useScrollbarWidthVariable } from "./scrollbar-width";
import { act } from "react";

const observeMock = jest.fn();
const disconnectMock = jest.fn();

describe("useScrollbarWidthVariable", () => {
  it("sets scrollbar width to CSS variable when resized", () => {
    let resizeCallback: ResizeObserverCallback;
    global.ResizeObserver = jest.fn((callback) => {
      resizeCallback = callback;
      return {
        observe: observeMock,
        disconnect: disconnectMock,
        unobserve: jest.fn(),
      };
    });

    global.requestAnimationFrame = jest.fn((cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });

    const TestComponent = () => {
      const { scrollbarRef } = useScrollbarWidthVariable({
        variableName: "--scrollbar-width",
      });

      return <div ref={scrollbarRef} data-testid="target" />;
    };

    const { getByTestId } = render(<TestComponent />);
    const element = getByTestId("target");

    Object.defineProperty(element, "offsetWidth", {
      configurable: true,
      value: 120,
    });

    Object.defineProperty(element, "clientWidth", {
      configurable: true,
      value: 100,
    });

    act(() => {
      resizeCallback([], new ResizeObserver(() => {}));
    });

    expect(element.style.getPropertyValue("--scrollbar-width")).toBe("20px");
    expect(observeMock).toHaveBeenCalledWith(element);
  });

  it("disconnects ResizeObserver on unmount", () => {
    global.ResizeObserver = jest.fn(() => ({
      observe: observeMock,
      disconnect: disconnectMock,
      unobserve: jest.fn(),
    }));

    const TestComponent = () => {
      const { scrollbarRef } = useScrollbarWidthVariable({
        variableName: "--scrollbar-width",
      });

      return <div ref={scrollbarRef} />;
    };

    const { unmount } = render(<TestComponent />);

    unmount();

    expect(disconnectMock).toHaveBeenCalled();
  });
});
