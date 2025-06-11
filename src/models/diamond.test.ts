import { Diamond } from "./diamond";

describe("Diamond", () => {
  let mockRandom: jest.SpyInstance = jest.spyOn(Math, "random");

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  afterEach(() => {
    mockRandom.mockRestore();
    jest.clearAllMocks();
  });

  it("should create a diamond with correct structure", () => {
    mockRandom.mockReturnValue(0.5);
    const diamond = new Diamond();
    expect(diamond.element).toBeTruthy();
    expect(diamond.element.className).toBe("diamond");

    const sections = Array.from(diamond.element.children);
    expect(sections).toHaveLength(4);

    const expectedSections: string[] = [
      "bottomright",
      "bottomleft",
      "topright",
      "topleft",
    ];
    sections.forEach((section, index) => {
      expect(section.className).toBe(expectedSections[index]);
    });
  });

  it("should initialize with varied colors when random value is above threshold", () => {
    mockRandom.mockReturnValue(0.5);
    const colorfulDiamond = new Diamond();

    const sections = Array.from(
      colorfulDiamond.element.children,
    ) as HTMLDivElement[];
    const colors = new Set(
      sections.map(
        (section) =>
          section.style.borderBottomColor || section.style.borderTopColor,
      ),
    );

    expect(colors.size).toBeGreaterThan(1);
  });
});
