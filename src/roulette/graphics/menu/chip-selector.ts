import * as PIXI from "pixi.js";
import { IDrawable } from "../idrawable";
import { MenuButton } from "./menu-button";
import { Chip } from "../chip";

export class ChipSelector implements IDrawable{
    private textureCache: PIXI.Texture[];
    private chips: Chip[];
    private selectorSprite: PIXI.Sprite;
    private container: PIXI.Container;
    private selectedChipIndex: number;

    constructor(textureCache: PIXI.Texture[]) {
        this.textureCache = textureCache;
        this.container = new PIXI.Container();
        this.buildChips();
    }

    buildChips() {
        let xCounter = 0;
        this.chips = [1, 5, 10, 20, 50, 100, 'MAX'].map((chipValue, index) => {    
            const chip = new Chip(this.textureCache['images/webCommon.png'], chipValue);
            chip.getDisplayObject().x = xCounter;
            this.container.addChild(chip.getDisplayObject());
            xCounter += 76;
            chip.getDisplayObject().interactive = true;
            chip.getDisplayObject().on('click', () => {
                if (this.selectedChipIndex !== index) {
                    this.selectChip(index);
                }
            });
            return chip;
        });
        this.container.x = 230;

        this.selectChip(0);
    }
    
    selectChip(chipIndex: number) {

        if (this.selectedChipIndex !== undefined) {
            this.chips[this.selectedChipIndex].getDisplayObject().removeChildAt(2);
        }
        this.selectorSprite = new PIXI.Sprite(new PIXI.Texture(this.textureCache['images/webCommon.png'], 
            new PIXI.Rectangle(61, 283, 44, 23)));
        this.selectorSprite.anchor.x = 0.5;
        this.selectorSprite.x = this.chips[chipIndex].getDisplayObject().width / 2;
        this.selectorSprite.y = 55;
        this.chips[chipIndex].getDisplayObject().addChildAt(this.selectorSprite, 2);
        this.selectedChipIndex = chipIndex;
    }

    getDisplayObject(): PIXI.DisplayObject {
        return this.container;
    }
}