import * as PIXI from 'pixi.js';
import { IDrawable } from "../graphics/idrawable";
import { IGameStateObserver } from '../../igame-state-observer';

export class ProgressBar implements IDrawable, IGameStateObserver {
    private container: PIXI.Container;
    private textureCache: PIXI.Texture[];
    private progressMask: PIXI.Graphics;

    private miliSecondsLeftToWait: number;


    constructor(textureCache: PIXI.Texture[]) {
        this.textureCache = textureCache;
        this.container = new PIXI.Container();
        this.drawProgressBg();
        this.drawProgress();
        this.setProgress(1);
    }

    private drawProgressBg() {
        const progressBg = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommon.png'], 
            new PIXI.Rectangle(98, 593, 547, 19)));
        progressBg.y = 0;
        this.container.addChild(progressBg);
    }

    private drawProgress() {
        const progressBar = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommon.png'],
            new PIXI.Rectangle(98, 575, 543, 15)
        ));
        progressBar.y = 2;
        progressBar.x = 2;

        this.progressMask = new PIXI.Graphics();
        
        this.progressMask.beginFill(0xff0000);
        this.progressMask.drawRect(0, 0, 200, 15);
        this.progressMask.endFill();
        this.progressMask.y = 2;
        this.progressMask.x = 2;


        progressBar.mask = this.progressMask;
        this.container.addChild(this.progressMask);

        this.container.addChild(progressBar);
    }

    setProgress(percent: number) {
        this.progressMask.width = 543 * percent;
    }

    getDisplayObject(): PIXI.DisplayObject {
        return this.container;
    }

    
    updateGameState(gameState: any): void {
        if (gameState.miliSecondsLeftToWait > 0) {
            this.setProgress( gameState.miliSecondsLeftToWait / gameState.miliSecondsToWait);
        } else {
            this.setProgress(1);
        }

        this.miliSecondsLeftToWait = gameState.miliSecondsLeftToWait;
    }

    tick() {
        if (this.miliSecondsLeftToWait > 0 && this.progressMask.width > 0) {
             this.progressMask.width -= 0.30166666666;
        }
    }
}