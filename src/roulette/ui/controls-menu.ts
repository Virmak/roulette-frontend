import { IDrawable } from "../graphics/idrawable";
import * as PIXI from 'pixi.js';
import { ProgressBar } from "./progress-bar";
import { BetMenu } from "../graphics/menu/menu-builder";

export class ControlsMenu implements IDrawable {
    
    private container: PIXI.Container;

    private menuContainer: PIXI.Container;

    private balanceText: PIXI.Text;
    private betAmountText: PIXI.Text;
    private lastWinText: PIXI.Text;
    private textureCache: PIXI.Texture[];
    private progressBar: ProgressBar;

    static textStyles = [
        {fontFamily : 'Times', fontSize: 16, fill : 0xffffff, align : 'center', fontWeight: '150'},
        {fontFamily : 'Times', fontSize: 16, fill : 0x93F763, align : 'center', fontWeight: '150'},
    ]

    constructor(textureCache: PIXI.Texture[]) {
        this.textureCache = textureCache;
        this.container = new PIXI.Container();
        this.menuContainer = new PIXI.Container();
    }

    public init() {
        const buttonsBuilder = new BetMenu(this.textureCache);
        this.drawBg();
        this.progressBar = new ProgressBar(this.textureCache);
        
        this.container.addChild( this.progressBar.getDisplayObject());
        this.container.addChild(this.drawBalance(100));
        this.container.addChild(this.drawBetAmount());
        this.container.addChild(this.drawLastWin());


        buttonsBuilder.getDisplayObject().x = 620;

        this.container.addChild(buttonsBuilder.getDisplayObject());
        this.container.y = 10;
        this.menuContainer.scale.y = .9;
        this.menuContainer.addChild(this.container);
    }


    private drawLastWin(): PIXI.Container {
        const lastWinContainer = new PIXI.Container();
        const lastWinLabel = new PIXI.Text('Last Win', ControlsMenu.textStyles[0]);
        lastWinLabel.position.set(10, -10);
        this.lastWinText = new PIXI.Text('0 EUR', ControlsMenu.textStyles[0]);
        this.lastWinText.position.set(10, lastWinLabel.height-10);
        lastWinContainer.addChild(lastWinLabel);
        lastWinContainer.addChild(this.lastWinText);
        lastWinContainer.y = 38;
        lastWinContainer.x = 350;
        return lastWinContainer;
    }

    private drawBetAmount(): PIXI.Container {
        const betAmountContainer = new PIXI.Container();
        const betAmountLabel = new PIXI.Text('Bet', ControlsMenu.textStyles[0]);
        betAmountLabel.position.set(10, -10);
        this.betAmountText = new PIXI.Text('0 EUR', ControlsMenu.textStyles[0]);
        this.betAmountText.position.set(10, betAmountLabel.height-10);
        betAmountContainer.addChild(betAmountLabel);
        betAmountContainer.addChild(this.betAmountText);
        betAmountContainer.y = 38;
        betAmountContainer.x = 180;
        return betAmountContainer;
    }

    private drawBalance(balance: number): PIXI.Container {
        const balanceContainer = new PIXI.Container();
        const balanceLabel = new PIXI.Text('Balance', ControlsMenu.textStyles[0]);
        balanceLabel.position.set(10, -10);
        this.balanceText = new PIXI.Text(balance + ' EUR', ControlsMenu.textStyles[1]);
        this.balanceText.position.set(10, balanceLabel.height-10);
        balanceContainer.addChild(balanceLabel);
        balanceContainer.addChild(this.balanceText);
        balanceContainer.y = 38;
        return balanceContainer;
    }

    private drawBg() {
        const bgSprite = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/ui-components.png'], 
            new PIXI.Rectangle(0, 882, 1441, 103)));
        const bgRect = new PIXI.Graphics();
        bgRect.beginFill(0x000000);
        bgRect.drawRect(0, 0, 1441, 103);
        bgRect.endFill();
        this.menuContainer.addChild(bgRect);

        bgSprite.scale.y = .8;
        this.menuContainer.addChild(bgSprite);
    }



    getDisplayObject(): PIXI.DisplayObject {
        return this.menuContainer;
    }

    getMenuContainer() {
        return this.menuContainer;
    }

}