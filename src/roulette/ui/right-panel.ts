import { IDrawable } from "../graphics/idrawable";
import { Texture, Container } from "pixi.js";


export class RightPanel implements IDrawable {
    private container: Container;
    private textureCache: Texture[];

    constructor(textureCache: PIXI.Texture[]) {
        this.textureCache = textureCache;
        this.container = new Container();
        this.build();
    }

    build() {

        this.buildHistoryDisplay();
        const rightPanel = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommonSkinnable.png'], new PIXI.Rectangle(2057, 1, 418, 288)));
        rightPanel.x = 1015;
        rightPanel.y = 50;
        rightPanel.width = 355;
        rightPanel.height = 220;
        

        const vipSpote = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommon.png'], new PIXI.Rectangle(108, 283, 146, 53)));
        vipSpote.x = 1120;
        
        const betListIcon = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommonSkinnable.png'], new PIXI.Rectangle(1640, 612, 31, 31)));
        betListIcon.x = 1022;
        betListIcon.y = 23;

        const statsIcon = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommonSkinnable.png'], new PIXI.Rectangle(1707, 466, 46, 42)));
        statsIcon.x = 1047;
        statsIcon.y = 15;

        
        const rect = new PIXI.Graphics();
        rect.beginFill(0x3a3a3a);
        rect.drawRoundedRect(1026, 60, 333, 200, 5);
        rect.endFill();
        
        this.container.addChild(vipSpote);
        this.container.addChild(rightPanel);
        this.container.addChild(rect);
        this.container.addChild(betListIcon);
        this.container.addChild(statsIcon);
    }

    private buildMaxBetTab() {
        
    }

    private buildHistoryDisplay() {
        const display = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommon.png'], new PIXI.Rectangle(938, 575, 151, 372)));
        display.x = 1150;
        display.y = 70;
        display.height = 280;
        this.container.addChild(display);
    }

    getDisplayObject() {
        return this.container;
    }
}