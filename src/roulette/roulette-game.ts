import * as PIXI from 'pixi.js'
import { IDrawable } from './graphics/idrawable';
import { ControlsMenu } from './ui/controls-menu';
import { RouletteUI } from './ui/ui';

export class RouletteGame {
    private rouletteTable: IDrawable;
    private controlsMenu: ControlsMenu;
    private rouletteUI: RouletteUI;
    private loader: PIXI.loaders.Loader;
    private app: PIXI.Application;
    
    constructor(rouletteTable: IDrawable, controlsMenu: ControlsMenu, ui: RouletteUI) {
        this.rouletteTable = rouletteTable;
        this.controlsMenu = controlsMenu;
        this.rouletteUI = ui;
        this.app = new  PIXI.Application({
            width: 1386,
            height: 754,
            backgroundColor: 0xaaaaaa
        });
        this.loader = PIXI.loader;
        this.setup();
    }

    private setup() {
        this.app.stage.addChild(this.rouletteUI.getGameBg());
        this.app.stage.addChild(this.rouletteTable.getDisplayObject());
    
        if (document.readyState === 'complete') {
            this.app.renderer.render(this.app.stage);document.body.appendChild(this.app.view);
        } else {
            window.addEventListener('DOMContentLoaded', () => document.body.appendChild(this.app.view));
        }
        window.addEventListener('resize', () => this.resize(1386,754));
        this.resize(1386,754);
        this.controlsMenu.init();
        this.rouletteUI.init();
        this.controlsMenu.getDisplayObject().y = 670;
        this.app.stage.addChild(this.controlsMenu.getDisplayObject());
        this.app.stage.addChild(this.rouletteUI.getDisplayObject());
    }

    private resize(logicalWidth: number, logicalHeight: number) {
        const scaleFactor = {
            x: window.innerWidth / logicalWidth,
            y: window.innerHeight / logicalHeight
        };
        const newWidth = Math.ceil(logicalWidth * scaleFactor.x);
        const newHeight = Math.ceil(logicalHeight * scaleFactor.y);
        
        this.app.renderer.view.style.width = `${newWidth}px`;
        this.app.renderer.view.style.height = `${newHeight}px`;
        
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.set(scaleFactor.x, scaleFactor.y); 
    }

    getApp(): PIXI.Application {
        return this.app;
    }
}