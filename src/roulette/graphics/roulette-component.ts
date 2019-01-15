import * as PIXI from 'pixi.js';
import * as filters from 'pixi-filters';
import { IDrawable } from './idrawable';
import { INumberSprite } from './inumber-sprite';


export abstract class RouletteComponent implements IDrawable {
    protected sprite = new PIXI.Sprite();

    constructor(texture: PIXI.Texture, spriteData: INumberSprite) {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = spriteData.sx + 8;
        this.sprite.y = spriteData.sy + 5;
        this.sprite.buttonMode = true;
    }

    getDisplayObject(): PIXI.DisplayObject {
        return this.sprite;
    }

    highlight(highlightColor = 0x0086ae) {
        //this.sprite.alpha = 0.7;
        //this.sprite.filters = [new filters.OutlineFilter(3, highlightColor)];

        this.sprite.filters = [ new filters.GlowFilter(10, 4, 0, 0x00ffff, 0.5), new filters.OutlineFilter(2, highlightColor),];
    }
    
    disableHighlight() {
        this.sprite.alpha = 1;
        this.sprite.filters = [];
    }
    
    setInteractive(value) {
        this.sprite.interactive = value;
    }
}