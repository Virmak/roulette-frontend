import * as PIXI from 'pixi.js';
import { IDrawable } from "../graphics/idrawable";
import { LeftPanel } from './left-panel';
import { RightPanel } from './right-panel';

export class RouletteUI implements IDrawable {
    private textureCache: PIXI.Texture[];
    private container: PIXI.Container;
    private leftPanel: LeftPanel;
    private rightPanel: RightPanel;

    constructor(textureCache: PIXI.Texture[], leftPanel: LeftPanel, rightPanel: RightPanel) {
        this.textureCache = textureCache;
        this.leftPanel = leftPanel;
        this.rightPanel = rightPanel;
        this.container = new PIXI.Container();
    }

    init() {
        this.container.addChild(this.getVideoFrame());
        this.container.addChild(this.leftPanel.getDisplayObject());
        this.container.addChild(this.rightPanel.getDisplayObject());
    }

    private getVideoFrame() {
        const videoFrame = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommonSkinnable.png'], new PIXI.Rectangle(1443, 0, 610, 462)
        ));

        const bg = new PIXI.Graphics();
        bg.beginFill(0);
        bg.drawRect(10, 10, 590, 440);
        bg.endFill();
        videoFrame.addChild(bg);

        videoFrame.height = 300;
        videoFrame.width = 653;
        videoFrame.x = 360;
        return videoFrame;
    }

    getGameBg() {
        
        const leftPanel = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommonSkinnable.png'], new PIXI.Rectangle(0, 244, 1440, 634)));
        leftPanel.width = 1386;
        return leftPanel;
    }

    getDisplayObject() {
        return this.container;
    }
}