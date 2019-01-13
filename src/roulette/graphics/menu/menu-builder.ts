import * as PIXI from "pixi.js";
import { IDrawable } from "../idrawable";
import { MenuButton } from "./menu-button";
import { ChipSelector } from "./chip-selector";

export class BetMenu implements IDrawable{
    private container: PIXI.Container;
    private textureCache: PIXI.Texture[];
    private undoBtn: MenuButton;
    private replayBtn: MenuButton;
    private cancelBtn: MenuButton;
    private chipSelector: ChipSelector;

    constructor(textureCache: PIXI.Texture[]) {
        this.textureCache = textureCache;
        this.container = new PIXI.Container();
        this.buildButttons();
        this.buildChips();
    }

    buildChips() {
        this.chipSelector = new ChipSelector(this.textureCache);
        this.container.addChild(this.chipSelector.getDisplayObject());
    }

    buildButttons() {
        this.undoBtn = new MenuButton(
            this.textureCache['images/webCommon.png'],
            new PIXI.Rectangle(423, 1324, 63, 74));
        this.replayBtn = new MenuButton(
            this.textureCache['images/webCommon.png'],
            new PIXI.Rectangle(423, 1247, 63, 74));
        this.cancelBtn = new MenuButton(
            this.textureCache['images/webCommon.png'],
            new PIXI.Rectangle(423, 1093, 63, 74));

        this.undoBtn.getDisplayObject().on('mouseover', () => {

        });
        this.replayBtn.getDisplayObject().on('mouseover', () => {

        });
        this.cancelBtn.getDisplayObject().on('mouseover', () => {

        });


        this.replayBtn.getDisplayObject().x = 65;
        this.cancelBtn.getDisplayObject().x = 130;
        this.container.addChild(this.undoBtn.getDisplayObject());
        this.container.addChild(this.replayBtn.getDisplayObject());
        this.container.addChild(this.cancelBtn.getDisplayObject());
    }

    getDisplayObject(): PIXI.DisplayObject {
        return this.container;
    }


}