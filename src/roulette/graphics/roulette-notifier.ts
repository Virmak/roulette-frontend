import { IDrawable } from "./idrawable";
import * as PIXI from 'pixi.js';
import * as filters from 'pixi-filters';
import { IGameStateObserver } from "../../igame-state-observer";
import * as NumbersSpritesData from '../graphics/sprites-data/xpg-sprites.json';
import { NumberSelector } from "./number-selector";
import { RouletteNumber } from "./roulette-number";

export class RouletteNotifier implements IDrawable, IGameStateObserver {
    private roundResultSprite: PIXI.Sprite;
    private messageText: PIXI.Text;
    private wonText: PIXI.Text;
    private roundResultText: PIXI.Text;
    private roundResultColorTxt: PIXI.Text;
    private resultPin: PIXI.Sprite;
    private container: PIXI.Container;
    private textureCache: PIXI.Texture[];
    private numberSelector: NumberSelector;


    static colorsFramesPositions = {
        red: new PIXI.Rectangle(418, 363, 246, 246),
        black: new PIXI.Rectangle(672, 363, 246, 246),
        green: new PIXI.Rectangle(672, 629, 246, 246)
    };

    constructor(textureCache: PIXI.Texture[], numberSelector: NumberSelector) {
        this.textureCache = textureCache;
        this.numberSelector = numberSelector;
        this.container = new PIXI.Container();
        this.buildComponents();
    }



    buildComponents() {
        this.messageText = new PIXI.Text('No more bets', {
            fontSize: 50,
            fontWeight: 'bold',
            fill: 0xffb600,
            align: 'center'
        })
        this.messageText.visible = false;
        this.messageText.filters = [new filters.DropShadowFilter({ rotation: 0, distance: 0, alpha: 1})]

        this.container.addChild(this.messageText);

        
        this.wonText = new PIXI.Text('YOU WON\n 300$', {
            fill: ['#ffd152', '#ab4c00', '#ffde81' ],
            fillGradientStops: [0.1, 0.5, 0.1],
            fontSize: 50,
            fillGradientType: 0,
            fontWeight: 'bolder', 
            align: 'center',
            dropShadow: true,
            dropShadowBlur: 20,
            leading: -15
        })
        this.wonText.visible = false;
        this.wonText.filters = [new filters.DropShadowFilter({ rotation: 0, distance: 0, alpha: 1, blur: 3, quality: 5})];
        
        this.container.addChild(this.wonText);
        
        this.container.x = 550;
        this.container.y = 280;


        this.roundResultColorTxt = new PIXI.Text('', {fill: 0xffffff, fontWeight: 'bold', fontSize: 40, fontFamily: 'Times New Roman'});
        this.roundResultColorTxt.x = 123;
        this.roundResultColorTxt.y = 60;
        this.roundResultColorTxt.anchor.set(.5);
        this.roundResultSprite = new PIXI.Sprite(new PIXI.Texture(this.textureCache['images/dynamicBlueStandard.png'], RouletteNotifier.colorsFramesPositions.red));
        this.roundResultSprite.x = 50;
        this.roundResultSprite.scale.set(.7);
        this.roundResultSprite.visible = false;
        this.roundResultText = new PIXI.Text('AAA', {fill: 0xffffff, fontWeight: 'bold', fontSize: 120, fontFamily: 'Times New Roman'});
        this.roundResultText.x = 123;
        this.roundResultText.y = 135;
        this.roundResultText.anchor.set(.5, .5);
        this.roundResultSprite.addChild(this.roundResultColorTxt);
        this.roundResultSprite.addChild(this.roundResultText);
        this.container.addChild(this.roundResultSprite);


        this.resultPin = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommon.png'],
            new PIXI.Rectangle(691, 604, 56, 57)
        ));
    }

    showResult(roundResult: number) {
        const colorFrame = RouletteNotifier.colorsFramesPositions[NumbersSpritesData[roundResult].color];
        this.roundResultSprite.texture.frame = colorFrame;
        this.roundResultSprite.visible = true;
        this.roundResultText.text = roundResult +'';
        this.roundResultColorTxt.text = NumbersSpritesData[roundResult].color.toUpperCase();

        this.resultPin = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/webCommon.png'],
            new PIXI.Rectangle(691, 604, 56, 57)
        ));
        this.numberSelector.groupSelector([roundResult], (n: RouletteNumber) => {
            n.addResultPin(this.resultPin);
        })
        setTimeout(() => this.roundResultSprite.visible = false, 2000);
        
    }

    showMessage(message: string) {
        this.messageText.text = message;
        this.messageText.visible = true;
        setTimeout(() => this.messageText.visible = false, 2000);
    }

    showWinnings(winnings: number) {
        setTimeout(() => {

        this.wonText.text = 'YOU WON\n' + winnings.toFixed(2) + '$';
        this.wonText.visible = true;
        setTimeout(() => this.wonText.visible = false, 2000);
    
        }, 2000);
    }

    getDisplayObject(): PIXI.DisplayObject {
        return this.container;
    }

    updateGameState(gameState: any, message?: string): void {
        if (message === 'no_more_bet') {
            this.showMessage('No more bets');
        } else if (message === 'place_bet') {
            this.resultPin.destroy();
            this.showMessage('Place your bets');
        } else if (/wn\d+(\.\d+)?/.test(message)) {
            this.showWinnings(parseInt(message.replace('wn', '')));
        } else if (/^rr\d+$/.test(message)) {
            this.showResult(parseInt(message.replace('rr', '')));
        } 
    }
}