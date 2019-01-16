import * as PIXI from "pixi.js";
import { IDrawable } from "../idrawable";
import { MenuButton } from "./menu-button";
import { ChipSelector } from "./chip-selector";
import { IObserver } from "../../../iobserver";
import { IObservable } from "../../../iobservable";

export class BetMenu implements IDrawable, IObservable {
    private container: PIXI.Container;
    private textureCache: PIXI.Texture[];
    private undoBtn: MenuButton;
    private replayBtn: MenuButton;
    private cancelBtn: MenuButton;
    private chipSelector: ChipSelector;

    private _observers: IObserver[] = [];

    constructor(textureCache: PIXI.Texture[], chipSelector: ChipSelector) {
        this.textureCache = textureCache;
        this.chipSelector = chipSelector;
        this.container = new PIXI.Container();
        this.buildButttons();
        this.buildChips();
    }

    buildChips() {
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

        this.undoBtn.getDisplayObject().interactive = true;
        this.cancelBtn.getDisplayObject().interactive = true;


        this.undoBtn.getDisplayObject().on('mouseover', () => {

        });
        this.undoBtn.getDisplayObject().on('click', () => {
            this.notifyObservers('undo');
        });
        
        this.replayBtn.getDisplayObject().on('mouseover', () => {

        });
        
        this.cancelBtn.getDisplayObject().on('click', () => {
            this.notifyObservers('cancel');
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
    
    registerObserver(observer: IObserver) {
        this._observers.push(observer);
    }

    removeObserver(observer: IObserver) {
        for(let i = 0; i < this._observers.length; i++) {
            if (observer === this._observers[i]) {
                this._observers.splice(i, 1);
            }
        }
    }

    notifyObservers(message: string) {
        this._observers.forEach(observer => observer.receiveNotification(message));
    }
}