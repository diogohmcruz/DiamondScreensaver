import { DiamondGrid } from "./diamond-grid";

describe("DiamondGrid", () => {
  let container: HTMLElement;
  let grid: DiamondGrid;
  let originalInnerWidth: number;
  let originalInnerHeight: number;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;
    Object.defineProperty(window, "innerWidth", {
      value: 1024,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 768,
      configurable: true,
    });

    grid = new DiamondGrid(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    Object.defineProperty(window, "innerWidth", {
      value: originalInnerWidth,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: originalInnerHeight,
      configurable: true,
    });
  });

  it("should create the diamonds", () => {
    grid.clearGrid();
    grid.init();
    grid.init();

    const diamonds = grid.getDiamonds();

    expect(diamonds).toHaveLength(162);
  });

  it("should clear all diamonds", () => {
    grid.clearGrid();
    expect(container.children.length).toBe(0);
    expect(grid.getDiamonds().length).toBe(0);
  });
});
