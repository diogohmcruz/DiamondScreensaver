import { DiamondGrid } from "./diamond-grid";

describe("DiamondGrid", () => {
  let container: HTMLElement;
  let grid: DiamondGrid;

  beforeEach(() => {
    container = document.createElement("div");
    Object.defineProperty(window, "innerWidth", { value: 1024 });
    Object.defineProperty(window, "innerHeight", { value: 768 });

    grid = new DiamondGrid(container);
  });

  describe("constructor", () => {
    it("should initialize the grid with diamonds", () =>
      expect(grid.getDiamonds().length).toBeGreaterThan(0));

    it("should create diamonds that fill the viewport plus overflow", () => {
      const diamonds = grid.getDiamonds();
      const expectedMinDiamonds = Math.ceil(1024 / 60) * Math.ceil(768 / 30);

      expect(diamonds.length).toBeGreaterThan(expectedMinDiamonds);
    });
  });

  describe("clearGrid", () => {
    it("should remove all diamonds", () => {
      grid.clearGrid();

      expect(grid.getDiamonds().length).toBe(0);
      expect(container.children.length).toBe(0);
    });
  });

  describe("init", () => {
    it("should clear existing diamonds and create new ones", () => {
      const initialDiamonds = grid.getDiamonds().length;
      grid.init();

      expect(grid.getDiamonds().length).toBe(initialDiamonds);
    });
  });

  describe("createDiamonds", () => {
    it("should create diamonds with correct spacing", () => {
      const diamonds = grid.getDiamonds();
      const firstDiamond = diamonds[0];
      const secondDiamond = diamonds[1];

      const horizontalSpacing =
        parseInt(secondDiamond.element.style.left) -
        parseInt(firstDiamond.element.style.left);

      expect(horizontalSpacing).toBe(60);
    });

    it("should offset odd rows", () => {
      const diamonds = grid.getDiamonds();
      const firstRowY = diamonds[0].element.style.top;

      const secondRowDiamond = diamonds.find(
        (d) => d.element.style.top !== firstRowY,
      );

      if (secondRowDiamond) {
        const firstRowX = parseInt(diamonds[0].element.style.left);
        const secondRowX = parseInt(secondRowDiamond.element.style.left);

        expect(secondRowX - firstRowX).toBe(30);
      }
    });
  });
});
