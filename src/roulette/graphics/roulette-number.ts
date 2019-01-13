import * as PIXI from 'pixi.js';
import * as filters from 'pixi-filters';
import { IDrawable } from './idrawable';
import { INumberSprite } from './inumber-sprite';
import { RouletteComponent } from './roulette-component';
import { IContainer } from './icontainer';


export class RouletteNumber extends RouletteComponent implements IDrawable, IContainer {

    getContainer(): PIXI.Sprite {
        return this.sprite;
    }
}