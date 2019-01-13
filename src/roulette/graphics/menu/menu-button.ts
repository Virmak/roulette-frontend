import { IDrawable } from "../idrawable";
import * as PIXI from "pixi.js";

export class MenuButton implements IDrawable {
    private sprite: PIXI.Sprite;
    private baseTexure: PIXI.BaseTexture;
    private frame: PIXI.Rectangle;
    private container: PIXI.Container;

    constructor(texture: PIXI.BaseTexture, frame: PIXI.Rectangle) {
        this.baseTexure = texture;
        this.frame = frame;
        this.sprite = new PIXI.Sprite(new PIXI.Texture(texture, frame));
    }

    setTexture(texture: PIXI.Texture) {
        this.sprite.texture = texture;
    }

    setTextureFrame(frame: PIXI.Rectangle) {
        this.sprite.texture.frame = frame;
    }

    getDisplayObject() {
        return this.sprite;
    }

    setDisabled() {
        this.frame.x = 423;
        this.sprite.texture = new PIXI.Texture(this.baseTexure, this.frame);
    }

    setEnabled() {
        this.frame.x = 357;
        this.sprite.texture = new PIXI.Texture(this.baseTexure, this.frame);
    }

}