// @ts-expect-error - @testing-library/react ships without bundled types in this pnpm layout;
// the runtime API (render, screen, fireEvent, act) is stable and covered by jest matchers.
import { render, screen, fireEvent, act } from "@testing-library/react";
import HeroArt, { SceneBoundary } from "@/components/portfolio/hero-art";
import Sculpture from "@/components/portfolio/sculpture";
let mockCanvasProps: Record<string, unknown>;
jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: (_loader: unknown, options: { ssr: boolean }) => {
    if (options.ssr !== false) throw new Error("3D must be client-only");
    return function DeferredScene() { return <div data-testid="deferred-scene" />; };
  },
}));
jest.mock("@react-three/fiber", () => ({
  Canvas: (props: Record<string, unknown>) => { mockCanvasProps = props; return <canvas data-testid="mock-canvas" />; },
  useFrame: jest.fn(), useThree: jest.fn(),
}));
beforeEach(() => {
  jest.useFakeTimers();
  Object.defineProperty(window, "matchMedia", { writable: true, value: jest.fn().mockImplementation(query => ({ matches: query.includes("reduced-motion"), addEventListener: jest.fn(), removeEventListener: jest.fn() })) });
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({ observe: jest.fn(), disconnect: jest.fn() }));
});
afterEach(() => jest.useRealTimers());
test("reduced motion keeps artwork and avoids loading WebGL automatically", () => {
  render(<HeroArt />);
  act(() => jest.advanceTimersByTime(3000));
  expect(screen.getByTestId("static-sculpture")).toBeInTheDocument();
  expect(screen.queryByTestId("deferred-scene")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Explore in 3D/ }));
  expect(screen.getByTestId("deferred-scene")).toBeInTheDocument();
});
test("Canvas uses bounded pixel density and on-demand rendering, and stops when inactive", () => {
  const props = { onReady: jest.fn(), onFailure: jest.fn() };
  const view = render(<Sculpture active {...props} />);
  expect(screen.getByTestId("mock-canvas")).toBeInTheDocument();
  expect(mockCanvasProps.frameloop).toBe("demand");
  expect(mockCanvasProps.dpr).toEqual([1, 1.5]);
  view.rerender(<Sculpture active={false} {...props} />);
  expect(mockCanvasProps.frameloop).toBe("never");
});
test("a scene failure leaves usable static artwork", () => {
  const log = jest.spyOn(console, "error").mockImplementation(() => {});
  function Broken(): never { throw new Error("WebGL unavailable"); }
  render(<SceneBoundary><Broken /></SceneBoundary>);
  expect(screen.getByTestId("static-sculpture")).toBeInTheDocument();
  log.mockRestore();
});
