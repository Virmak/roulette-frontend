import { IDrawable } from "../graphics/idrawable";
import { Texture, Container } from "pixi.js";
import { IGameStateObserver } from "../../igame-state-observer";


export class LeftPanel implements IDrawable, IGameStateObserver {
    private container: Container;
    private textureCache: Texture[];

    private roundIDTxt: PIXI.Text;
    private dealerNameTxt: PIXI.Text;
    private playerNameTxt: PIXI.Text;

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

        this.roundIDTxt = new PIXI.Text('', {
            fill: 0xffffff, fontFamily: 'Times New Roman', fontSize: 18   
        })
        this.roundIDTxt.position.set(250, 95);

        this.dealerNameTxt = new PIXI.Text('', {
            fill: 0xffffff, fontFamily: 'Times New Roman', fontSize: 18   
        })
        this.dealerNameTxt.position.set(250, 175);

        this.playerNameTxt = new PIXI.Text('', {
            fill: 0xffffff, fontFamily: 'Times New Roman', fontSize: 18   
        })
        this.playerNameTxt.position.set(250, 175);

        const gameNameTxt = new PIXI.Text('Roulette 1', {
            fill: 0xffffff, fontFamily: 'Times New Roman', fontSize: 18   
        })
        gameNameTxt.position.set(250, 135);

        this.container.addChild(this.roundIDTxt);
        this.container.addChild(this.dealerNameTxt);
        this.container.addChild(this.playerNameTxt);
        this.container.addChild(gameNameTxt);

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

    
    updateGameState(gameState: any): void {
        this.roundIDTxt.text = gameState.roundId;
        this.dealerNameTxt.text = gameState.dealerName;
    }
}