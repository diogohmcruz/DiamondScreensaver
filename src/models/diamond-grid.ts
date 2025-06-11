import { Diamond } from ".";

export class DiamondGrid {
  private diamonds: Diamond[] = [];
  /**
   * Must match the CSS variable --diamond-width
   * @private
   */
  private readonly DIAMOND_WIDTH: number = 162;
  /**
   * Must match the CSS variable --diamond-height
   * @private
   */
  private readonly DIAMOND_HEIGHT: number = 100;

  constructor(private readonly container: HTMLElement) {
    this.init();
  }

  public init(): void {
    this.clearGrid();
    this.diamonds = this.createDiamonds(this.container);
  }

  public clearGrid(): void {
    this.diamonds.forEach((diamond) => diamond.element.remove());
    this.diamonds = [];
    this.container.innerHTML = "";
  }

  public getDiamonds(): Diamond[] {
    return this.diamonds;
  }

  private createDiamonds(container: HTMLElement): Diamond[] {
    const diamonds: Diamond[] = [];

    const width = window.innerWidth;
    const height = window.innerHeight;

    const horizontalSpacing = this.DIAMOND_WIDTH;
    const verticalSpacing = this.DIAMOND_HEIGHT / 2;

    const overflowMargin = 1;
    const cols = Math.ceil(width / horizontalSpacing);
    const rows = Math.ceil(height / verticalSpacing);

    for (let row = -overflowMargin; row < rows + overflowMargin; row++) {
      const isOddRow = Math.abs(row) % 2 === 1;
      const rowDiv = document.createElement("div");
      rowDiv.className = `diamond-row ${isOddRow ? "odd" : "even"}`;
      container.appendChild(rowDiv);

      for (let col = -overflowMargin; col < cols + overflowMargin; col++) {
        const diamond = new Diamond();
        rowDiv.appendChild(diamond.element);
        diamonds.push(diamond);
      }
    }
    return diamonds;
  }
}
