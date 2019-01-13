import * as PIXI from 'pixi.js';
import { IDrawable } from "./idrawable";
import { RouletteNumber } from './roulette-number';
import { Chip } from './chip';
import { IContainer } from './icontainer';

export class ChipBuilder implements IDrawable {

    private textureCache: PIXI.Texture[];
    private container: PIXI.Container;
    private chips: Chip[];

    constructor(textureCache: PIXI.Texture[]) {
        this.textureCache = textureCache;
        this.container = new PIXI.Container();
        this.chips = [];
    }


    addChip(n: IContainer, value: number, key: string) {
        
        if (this.chips[key] === undefined) {
            const chip = new Chip(this.textureCache['images/webCommon.png'], value);
            chip.setScale(.4);
            chip.getDisplayObject().position.set(n.getContainer().width /2 - chip.getContainer().width / 2, n.getContainer().height / 2 - chip.getContainer().height / 2);
            n.getContainer().addChildAt(chip.getDisplayObject(), 0);
            this.chips[key] = chip;
        } else {
            this.chips[key].addValue(value);
        }
    }
    

    getChipAt(key: string): Chip {
        return this.chips[key];
    }

    getDisplayObject() {
        return this.container;
    }
}