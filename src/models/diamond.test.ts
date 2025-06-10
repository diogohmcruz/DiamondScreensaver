import { Diamond } from "./diamond";

describe("Diamond", () => {
  let diamond: Diamond;

  beforeEach(() => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    diamond = new Diamond(100, 200);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should create a diamond element with correct position", () => {
      expect(diamond.element.className).toBe("diamond");
      expect(diamond.element.style.left).toBe("100px");
      expect(diamond.element.style.top).toBe("200px");
    });

    it("should create all four sections", () => {
      const sections = diamond.element.children;
      expect(sections.length).toBe(4);
      expect(sections[0].className).toBe("bottomright");
      expect(sections[1].className).toBe("bottomleft");
      expect(sections[2].className).toBe("topright");
      expect(sections[3].className).toBe("topleft");
    });
  });

  describe("color updates", () => {
    it("should apply neutral color when random value is below chanceOfNeutral", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.05);
      const newDiamond = new Diamond(0, 0);

      const sections = Array.from(
        newDiamond.element.children,
      ) as HTMLDivElement[];
      const expectedColor = "hsl(220, 30%, 20%)";

      expect(sections[0].style.borderBottomColor).toBe(expectedColor);
      expect(sections[1].style.borderBottomColor).toBe(expectedColor);
      expect(sections[2].style.borderTopColor).toBe(expectedColor);
      expect(sections[3].style.borderTopColor).toBe(expectedColor);
    });

    it("should apply varied colors when random value is above chanceOfNeutral", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.5);
      const newDiamond = new Diamond(0, 0);

      const sections = Array.from(
        newDiamond.element.children,
      ) as HTMLDivElement[];

      // Check that colors are different
      const colors = new Set([
        sections[0].style.borderBottomColor,
        sections[1].style.borderBottomColor,
        sections[2].style.borderTopColor,
        sections[3].style.borderTopColor,
      ]);

      expect(colors.size).toBeGreaterThan(1);
    });
  });

  describe("animation", () => {
    beforeEach(() => jest.useFakeTimers());

    afterEach(() => jest.useRealTimers());

    it("should start color animation", () => {
      const spyUpdateColors = jest.spyOn(
        Diamond.prototype as any,
        "updateColors",
      );
      const diamond = new Diamond(0, 0);

      jest.advanceTimersByTime(8000);

      expect(spyUpdateColors).toHaveBeenCalledTimes(2);
    });

    it("should skip color update when random value is below chanceOfColorChange", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.95);
      const spyUpdateColors = jest.spyOn(
        Diamond.prototype as any,
        "updateColors",
      );

      const diamond = new Diamond(0, 0);
      jest.advanceTimersByTime(8000);

      expect(spyUpdateColors).toHaveBeenCalledTimes(1);
    });
  });
});
