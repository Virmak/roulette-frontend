import * as PIXI from 'pixi.js';
import * as filters from 'pixi-filters';
import { IDrawable } from './idrawable';
import { IHitbox } from './ihitbox';
import { NumberSelector } from './number-selector';
import { IContainer } from './icontainer';


export class RouletteHitbox implements IDrawable, IContainer {
    private container: PIXI.Container;
    private hitCircle = new PIXI.Graphics();
    private numberSelector: NumberSelector;
    private numbers: string[];
    private static levels = [
        215, 165, 123, 80, 40, 0
    ];

    constructor(spriteData: IHitbox, key: string, numberSelector: NumberSelector) {
        this.container = new PIXI.Container();
        this.numbers = key.split('-');
        this.numberSelector = numberSelector;
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
}