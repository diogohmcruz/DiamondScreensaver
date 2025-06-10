import { Diamond } from ".";
export declare class DiamondGrid {
    private readonly container;
    private diamonds;
    /**
     * Must match the CSS variable --diamond-width
     * @private
     */
    private readonly DIAMOND_WIDTH;
    /**
     * Must match the CSS variable --diamond-height
     * @private
     */
    private readonly DIAMOND_HEIGHT;
    constructor(container: HTMLElement);
    init(): void;
    clearGrid(): void;
    getDiamonds(): Diamond[];
    private createDiamonds;
}
