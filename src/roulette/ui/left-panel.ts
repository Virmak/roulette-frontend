import { IDrawable } from "../graphics/idrawable";
import { Texture, Container } from "pixi.js";


export class LeftPanel implements IDrawable {
    private container: Container;
    private textureCache: Texture[];

    constructor(textureCache: PIXI.Texture[]) {
        this.textureCache = textureCache;
        this.container = new Container();
        this.build();
    }

    build() {
        const leftPanel = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommonSkinnable.png'], new PIXI.Rectangle(2057, 1, 418, 288)));
        leftPanel.y = 80;
        leftPanel.x = 1;
        leftPanel.width = 355;
        leftPanel.height = 190;

        const infoIcon =  new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommonSkinnable.png'], new PIXI.Rectangle(1707, 781, 46, 42)));
        infoIcon.y = 43;

        const chatIcon =  new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommonSkinnable.png'], new PIXI.Rectangle(1640, 747, 31, 31)));
        chatIcon.y = 51;
        chatIcon.x = 40;
        
        const rect = new PIXI.Graphics();
        rect.beginFill(0x3a3a3a);
        rect.drawRoundedRect(12, 88, 333, 172, 5);
        rect.endFill();
        


        this.container.addChild(leftPanel);
        this.container.addChild(rect);
        this.container.addChild(infoIcon);
        this.container.addChild(chatIcon);


        this.buildInfoTab();
    }


    private buildInfoTab() {
        const roundIdLbl = new PIXI.Text('Round ID', {
            fill: 0xb2b2b2, fontFamily: 'Times New Roman', fontSize: 18
        });
        roundIdLbl.position.set(25, 95);
        roundIdLbl.resolution = 2;
        const gameNameLbl = new PIXI.Text('Game Name', {
            fill: 0xb2b2b2, fontFamily: 'Times New Roman', fontSize: 18
        });
        gameNameLbl.position.set(25, 135);
        const dealerName = new PIXI.Text('Dealer Name', {
            fill: 0xb2b2b2, fontFamily: 'Times New Roman', fontSize: 18
        });
        dealerName.position.set(25, 175);

        const playerName = new PIXI.Text('Player Name', {
            fill: 0xb2b2b2, fontFamily: 'Times New Roman', fontSize: 18
        });
        playerName.position.set(25, 215);

        this.container.addChild(roundIdLbl);
        this.container.addChild(this.buildElementSeparator(125));
        this.container.addChild(gameNameLbl);
        this.container.addChild(this.buildElementSeparator(165));
        this.container.addChild(dealerName);
        this.container.addChild(this.buildElementSeparator(205));
        this.container.addChild(playerName);


    }

    private buildElementSeparator(y: number) {
        const line = new PIXI.Graphics();
        line.lineStyle(2, 0x363636);
        line.moveTo(20, y);
        line.lineTo(330, y);

        return line;
    }

    getDisplayObject() {
        return this.container;
    }
}