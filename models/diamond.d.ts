export declare class Diamond {
    private hue;
    private saturation;
    private chanceOfNeutral;
    private chanceOfColorChange;
    private intervalColorTransition;
    element: HTMLDivElement;
    private sections;
    constructor(x: number, y: number);
    private createSection;
    private updateColors;
    private startColorAnimation;
}
