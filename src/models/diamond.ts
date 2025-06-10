import {DiamondSection} from "../types";

export class Diamond {
  private hue = 220;
  private saturation = 30;
  private chanceOfNeutral = 0.10;
  private chanceOfColorChange = 0.90;
  private intervalColorTransition = 5000;

  element: HTMLDivElement;
  private sections: DiamondSection;

  constructor(x: number, y: number) {
    this.element = document.createElement('div');
    this.element.className = 'diamond';
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;

    this.sections = {
      bottomright: this.createSection('bottomright'),
      bottomleft: this.createSection('bottomleft'),
      topright: this.createSection('topright'),
      topleft: this.createSection('topleft')
    };

    this.updateColors();
    this.startColorAnimation();
  }

  private createSection(className: string): HTMLDivElement {
    const section = document.createElement('div');
    section.className = className;
    this.element.appendChild(section);
    return section;
  }

  private updateColors(): void {
    const { hue, saturation, chanceOfNeutral } = this;
    const baseDiamondLightness = Math.random() * 20 + 10; // 10-30
    const isNeutral = Math.random() < chanceOfNeutral;

    if (isNeutral) {
      const color = `hsl(${hue}, ${saturation}%, ${baseDiamondLightness}%)`;
      this.sections.bottomright.style.borderBottomColor = color;
      this.sections.topright.style.borderTopColor = color;
      this.sections.bottomleft.style.borderBottomColor = color;
      this.sections.topleft.style.borderTopColor = color;
      return;
    }

    const leftToRightVariation = 3;
    const baseMultiplier = 6;

    const leftVariation = (Math.random() * baseMultiplier)
      - leftToRightVariation;
    const rightVariation = (Math.random() * baseMultiplier)
      - leftToRightVariation;

    const leftBaseLightness = baseDiamondLightness + leftVariation;
    const rightBaseLightness = baseDiamondLightness + rightVariation;

    const topBottomVariation = (Math.random() * 16) - 8;

    const clampLightness = (value: number): number =>
      Math.max(15, Math.min(35, value));

    this.sections.bottomright.style.borderBottomColor =
      `hsl(${hue}, ${saturation}%, ${clampLightness(leftBaseLightness - topBottomVariation)}%)`;
    this.sections.topright.style.borderTopColor =
      `hsl(${hue}, ${saturation}%, ${clampLightness(leftBaseLightness + topBottomVariation)}%)`;

    this.sections.bottomleft.style.borderBottomColor =
      `hsl(${hue}, ${saturation}%, ${clampLightness(rightBaseLightness - topBottomVariation)}%)`;
    this.sections.topleft.style.borderTopColor =
      `hsl(${hue}, ${saturation}%, ${clampLightness(rightBaseLightness + topBottomVariation)}%)`;
  }

  private startColorAnimation(): void {
    const animate = (): void => {
      const isChangingColor = Math.random() < this.chanceOfColorChange;
      if (!isChangingColor) {
        setTimeout(() => animate(), Math.random() * 6000 + this.intervalColorTransition);
        return;
      }

      this.updateColors();

      setTimeout(() => animate(), Math.random() * 6000 + this.intervalColorTransition);
    };

    setTimeout(() => animate(), Math.random() * this.intervalColorTransition);
  }
}
