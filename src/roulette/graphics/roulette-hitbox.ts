import * as PIXI from 'pixi.js';
import { IDrawable } from './idrawable';
import { IHitbox } from './ihitbox';
import { NumberSelector } from './number-selector';
import { IPlayable } from './iplayable';
import { Chip } from './chip';


export class RouletteHitbox implements IDrawable, IPlayable {
    private container: PIXI.Container;
    private hitCircle = new PIXI.Graphics();
    private numberSelector: NumberSelector;
    private textureCache;
    private numbers: string[];
    private betValue = 0;
    private chip: Chip;
    private static levels = [
        215, 165, 123, 80, 40, 0
    ];

    constructor(spriteData: IHitbox, key: string, numberSelector: NumberSelector, textureCache: PIXI.Texture[]) {
        this.container = new PIXI.Container();
        this.numbers = key.split('-');
        this.numberSelector = numberSelector;
        this.textureCache = textureCache;
        this.hitCircle = new PIXI.Graphics();
        this.hitCircle.lineStyle(0, 0xFF33FF, 1);
        this.hitCircle.beginFill(0xFFFF00);
        this.hitCircle.drawCircle(0, 0, 10 );
        this.hitCircle.x = 7 
        this.hitCircle.y = 7

        this.container.x = spriteData.x - 7;
        this.container.y = RouletteHitbox.levels[spriteData.level] + 35;
        this.hitCircle.interactive = true;
        this.hitCircle.alpha = 0;
        this.hitCircle.buttonMode = true;
        this.container.addChild(this.hitCircle);
        this.registerEvents();
    }

    getDisplayObject(): PIXI.DisplayObject {
        return this.container;
    }

    getContainer(): PIXI.Container {
        return this.container;
    }

    private registerEvents() {
        this.container.interactive = true;
        this.container.on('mouseover', () => {
            setTimeout(() => this.numberSelector.groupSelector(this.numbers, rouletteNumber => rouletteNumber.highlight()), 0);
        });
        this.container.on('mouseout', () => {
            this.numberSelector.all(rouletteNumber => rouletteNumber.disableHighlight());
        });
    }

    addChip(value: number, key:string) {
        if (this.betValue === 0) {
            this.chip = new Chip(this.textureCache['images/webCommon.png'], value, this, 30);
            this.chip.setScale(.4);
            this.chip.getDisplayObject().position.set(this.container.width /2 - this.chip.getContainer().width / 2,this.container.height / 2 - this.chip.getContainer().height / 2);
            this.container.addChildAt(this.chip.getDisplayObject(), 0);
            this.betValue = value;
        } else {
            this.chip.addValue(value);
            this.betValue += value;
        }

        return this.chip;
    }

    removeChip(value: number) {
        this.betValue -= value;
        this.chip.addValue(-value);
        if (this.betValue === 0) {
            this.chip.getDisplayObject().destroy();
            this.chip = undefined;
        }
    }

    

    resetBets() {
        this.chip.getDisplayObject().destroy();
        this.chip = undefined;
        this.betValue = 0;
    }
}