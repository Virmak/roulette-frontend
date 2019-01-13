import * as PIXI from 'pixi.js';
import { IDrawable } from './idrawable';
import { INumberSprite } from './inumber-sprite';
import { RouletteComponent } from './roulette-component';


export abstract class TilesheetBuilder implements IDrawable {
    protected tiles: RouletteComponent[];
    protected container: PIXI.Container;
    protected textureCache: PIXI.Texture[];
    protected tilesData: any;

    constructor(textureCache: PIXI.Texture[], tilesData: any) {
        this.textureCache =textureCache;
        this.tilesData = tilesData;
        this.tiles = [];
        this.container = new PIXI.Container();
    }

    protected abstract build(): void;

    getDisplayObject(): PIXI.DisplayObject {
        return this.container;
    }
}