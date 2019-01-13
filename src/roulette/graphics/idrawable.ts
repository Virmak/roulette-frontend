import * as PIXI from 'pixi.js';

export interface IDrawable {
    getDisplayObject(): PIXI.DisplayObject;
}