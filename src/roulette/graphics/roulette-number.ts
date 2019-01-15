import * as PIXI from 'pixi.js';
import * as filters from 'pixi-filters';
import { IDrawable } from './idrawable';
import { INumberSprite } from './inumber-sprite';
import { RouletteComponent } from './roulette-component';
import { IPlayable } from './iplayable';
import { Chip } from './chip';


export class RouletteNumber extends RouletteComponent implements IDrawable, IPlayable {

    protected textureCache: PIXI.Texture[];
    protected chip: Chip;
    protected betValue = 0;

    constructor(texture: PIXI.Texture, spriteData: INumberSprite, textureCache: PIXI.Texture[]) {
        super(texture, spriteData);
        this.textureCache = textureCache;
    }

    addChip(value: number, key:string) {
        if (this.betValue === 0) {
            this.chip = new Chip(this.textureCache['images/webCommon.png'], value, this, 30);
            this.chip.setScale(.4);
            this.chip.getDisplayObject().position.set(this.sprite.width /2 - this.chip.getContainer().width / 2,this.sprite.height / 2 - this.chip.getContainer().height / 2);
            this.sprite.addChildAt(this.chip.getDisplayObject(), 0);
            this.betValue = value;
        } else {
            this.chip.addValue(value);
            this.betValue += value;
        }

        return this.chip;
    }

    resetBets() {
        if (this.chip) { 
            this.chip.getDisplayObject().destroy();
        }
        this.chip = undefined;
        this.betValue = 0;
    }

    removeChip(value: number) {
        this.betValue -= value;
        this.chip.addValue(-value);
        if (this.betValue === 0) {
            this.chip.getDisplayObject().destroy();
            this.chip = undefined;
        }
    }

    getContainer(): PIXI.Sprite {
        return this.sprite;
    }
    
}