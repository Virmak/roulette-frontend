import { IDrawable } from "../graphics/idrawable";
import { Texture, Container, Sprite, Rectangle } from "pixi.js";
import { IGameStateObserver } from "../../igame-state-observer";
import * as SpritesData from '../graphics/sprites-data/xpg-sprites.json';

export class RightPanel implements IDrawable, IGameStateObserver {
    private container: Container;
    private rightPanelBg: Sprite;
    private statsPanel: IDrawable;
    private textureCache: Texture[];
    private pastResultDisplay: Sprite;

    
    constructor(statsPanel: IDrawable, textureCache: PIXI.Texture[]) {
        this.statsPanel = statsPanel;
        this.textureCache = textureCache;
        this.container = new Container();
        this.build();
    }

    build() {

        this.buildHistoryDisplay();
        this.rightPanelBg = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommonSkinnable.png'], new PIXI.Rectangle(2057, 1, 418, 288)));
        this.rightPanelBg.x = 1015;
        this.rightPanelBg.y = 50;
        this.rightPanelBg.width = 355;
        this.rightPanelBg.height = 220;
        this.rightPanelBg.addChild(this.statsPanel.getDisplayObject());
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
        statsIcon.interactive = true;
        statsIcon.on('click', () => { 
            this.rightPanelBg.visible = !this.rightPanelBg.visible ;
        });

        
        this.container.addChild(vipSpote);
        this.container.addChild(this.rightPanelBg);
        this.container.addChild(betListIcon);
        this.container.addChild(statsIcon);
    }

    private buildMaxBetTab() {
        
    }

    private buildHistoryDisplay() {
        this.pastResultDisplay = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommon.png'], new PIXI.Rectangle(938, 575, 151, 372)));
            this.pastResultDisplay.x = 1150;
        this.pastResultDisplay.y = 70;
        this.pastResultDisplay.height = 280;
        this.container.addChild(this.pastResultDisplay);
    }

    getDisplayObject() {
        return this.container;
    }

    updateGameState(gameState: any, message?: string): void {
        if (gameState && this.pastResultDisplay.children.length === 0) {
            let counter = 0;

            for(let i = gameState.stats.pastResults.length - 1; i > 1; i--) {
                let color = 0xc72613;
                let x = 18;
                if (SpritesData[gameState.stats.pastResults[i]].color === 'black') {
                    color = 0xdc9a3c;
                    x = 110;
                }


                const resultText = new PIXI.Text(gameState.stats.pastResults[i], {fill: color, fontFamily: 'sans', fontWeight: 'bold', fontSize: 18});
                resultText.position.set(x, 25 + 28 * (gameState.stats.pastResults.length - 1 - i));
                this.pastResultDisplay.addChild(resultText);
        

            }
        } else if (/^rr\d+$/.test(message)) {
            const res = message.replace('rr', '');
            this.pastResultDisplay.children.forEach(child => {
                child.y += 28;
                if (child.y > 270) {
                    child.destroy();
                }
            });
            let color = 0xc72613;
            let x = 18;
            if (SpritesData[res].color === 'black') {
                color = 0xdc9a3c;
                x = 110;
            }
            const resultText = new PIXI.Text(res, {fill: color, fontFamily: 'sans', fontWeight: 'bold', fontSize: 18});
            resultText.position.set(x, 25);
            this.pastResultDisplay.addChildAt(resultText, 0);
        } 
    }
}