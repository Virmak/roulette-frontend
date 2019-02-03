import { Texture, Container, Sprite, Rectangle, Graphics, Text } from "pixi.js";
import { IDrawable } from "../graphics/idrawable";


export class StatsPanel implements IDrawable {
    private container: Container;
    private textureCache: Texture[];

    constructor(textureCache: Texture[]) {
        this.textureCache = textureCache;
        this.container = new Container();
        this.build();
    }
    
    private build() {
        
        const hotNumbersBg = new PIXI.Graphics();
        hotNumbersBg.beginFill(0x3a3a3a);
        hotNumbersBg.drawRoundedRect(0, 0, 390, 45, 5);
        hotNumbersBg.endFill();
        hotNumbersBg.position.set(13, 133);

        const leftHotNumberIcon = new Sprite(new Texture(this.textureCache['images/webCommon.png'], new Rectangle(872, 591, 31, 35)))
        leftHotNumberIcon.position.set(5);
        hotNumbersBg.addChild(leftHotNumberIcon);

        const rightHotNumberIcon = new Sprite(new Texture(this.textureCache['images/webCommon.png'], new Rectangle(872, 591, 31, 35)))
        rightHotNumberIcon.position.set(350, 5);
        hotNumbersBg.addChild(rightHotNumberIcon);

        const coldNumbersBg = new PIXI.Graphics();
        coldNumbersBg.beginFill(0x3a3a3a);
        coldNumbersBg.drawRoundedRect(0, 0, 390, 45, 5);
        coldNumbersBg.endFill();
        coldNumbersBg.position.set(13, 182);


        const leftColdumberIcon = new Sprite(new Texture(this.textureCache['images/webCommon.png'], new Rectangle(905, 591, 31, 35)))
        leftColdumberIcon.position.set(5);
        coldNumbersBg.addChild(leftColdumberIcon);

        const rightColdumberIcon = new Sprite(new Texture(this.textureCache['images/webCommon.png'], new Rectangle(905, 591, 31, 35)))
        rightColdumberIcon.position.set(350, 5);
        coldNumbersBg.addChild(rightColdumberIcon);

        const pastResultsBg = new PIXI.Graphics();
        pastResultsBg.beginFill(0x3a3a3a);
        pastResultsBg.drawRoundedRect(0, 0, 390, 45, 5);
        pastResultsBg.endFill();
        pastResultsBg.position.set(13, 231);


        const pastResultsLeftIcon = new Sprite(new Texture(this.textureCache['images/webCommonSkinnable.png'], new Rectangle(2879, 10, 31, 35)));
        pastResultsLeftIcon.position.set(5);
        pastResultsBg.addChild(pastResultsLeftIcon);
        
        const pastResultsRightIcon = new Sprite(new Texture(this.textureCache['images/webCommonSkinnable.png'], new Rectangle(2879, 47, 31, 35)));
        pastResultsRightIcon.position.set(350, 5);
        pastResultsBg.addChild(pastResultsRightIcon);

        this.container.addChild(this.buildColorsBg());
        this.container.addChild(this.buildParity());
        this.container.addChild(hotNumbersBg);
        this.container.addChild(coldNumbersBg);
        this.container.addChild(pastResultsBg);
    }

    buildParity() {

        const textStyle = {fill: 0xbbbebc, fontFamily: 'Helvetica', fontWeight: '900', fontSize: 16};
        const percentageTextStyle = {fill: 0xbbbebc, fontFamily: 'Helvetica', fontWeight: '900', fontSize: 14};
        
        const parityBg = new PIXI.Graphics();
        parityBg.beginFill(0x3a3a3a);
        parityBg.drawRoundedRect(13, 0, 390, 55, 5);
        parityBg.endFill();
        parityBg.y = 73;
        const evenText = new Text('Even', textStyle)
        evenText.position.set(40, 5);
        const zeroText = new Text('Zero', textStyle)
        zeroText.position.set(180, 5);
        const oddText = new Text('Odd', textStyle)
        oddText.position.set(340, 5);

        const evenPercentageRectangle = new Graphics();
        evenPercentageRectangle.beginFill(0x60a3db);
        evenPercentageRectangle.drawRect(23, 25, 370 * (46 / 100), 10);
        evenPercentageRectangle.endFill();
        const evenPercentageText = new Text('46%', percentageTextStyle);
        evenPercentageText.position.set(60, 35)

        const zeroPercentageRectangle = new Graphics();
        zeroPercentageRectangle.beginFill(0xffffff);
        zeroPercentageRectangle.drawRect(23 + evenPercentageRectangle.width, 25, 370 * (2 / 100), 10);
        zeroPercentageRectangle.endFill();
        const zeroPercentageText = new Text('2%', percentageTextStyle);
        zeroPercentageText.position.set(185, 35)

        const oddPercentageRectangle = new Graphics();
        oddPercentageRectangle.beginFill(0x005f9f);
        oddPercentageRectangle.drawRect(23 + evenPercentageRectangle.width + zeroPercentageRectangle.width, 25, 370 * (51 / 100), 10);
        oddPercentageRectangle.endFill();
        const oddPercentageText = new Text('51%', percentageTextStyle);
        oddPercentageText.position.set(320, 35)

        parityBg.addChild(evenText);
        parityBg.addChild(zeroText);
        parityBg.addChild(oddText);
        parityBg.addChild(evenPercentageRectangle);
        parityBg.addChild(zeroPercentageText);
        parityBg.addChild(oddPercentageText);
        parityBg.addChild(zeroPercentageRectangle);
        parityBg.addChild(oddPercentageRectangle);
        parityBg.addChild(evenPercentageText);


        return parityBg;
    }

    buildColorsBg(): Graphics {
        const textStyle = {fill: 0xbbbebc, fontFamily: 'Helvetica', fontWeight: '900', fontSize: 16};
        const percentageTextStyle = {fill: 0xbbbebc, fontFamily: 'Helvetica', fontWeight: '900', fontSize: 14};
        
        const colorsBg = new PIXI.Graphics();
        colorsBg.beginFill(0x3a3a3a);
        colorsBg.drawRoundedRect(13, 13, 390, 55, 5);
        colorsBg.endFill();

        const redText = new Text('Red', textStyle)
        redText.position.set(40, 15);
        const greenText = new Text('Green', textStyle)
        greenText.position.set(180, 15);
        const blackText = new Text('Black', textStyle)
        blackText.position.set(340, 15);

        const redPercentageRectangle = new Graphics();
        redPercentageRectangle.beginFill(0xff1700);
        redPercentageRectangle.drawRect(23, 35, 370 * (46 / 100), 10);
        redPercentageRectangle.endFill();
        const redPercentageText = new Text('46%', percentageTextStyle);
        redPercentageText.position.set(60, 45)

        const greenPercentageRectangle = new Graphics();
        greenPercentageRectangle.beginFill(0x2dba58);
        greenPercentageRectangle.drawRect(23 + redPercentageRectangle.width, 35, 370 * (2 / 100), 10);
        greenPercentageRectangle.endFill();
        const greenPercentageText = new Text('2%', percentageTextStyle);
        greenPercentageText.position.set(185, 45)

        const blackPercentageRectangle = new Graphics();
        blackPercentageRectangle.beginFill(0x686768);
        blackPercentageRectangle.drawRect(23 + redPercentageRectangle.width + greenPercentageRectangle.width, 35, 370 * (51 / 100), 10);
        blackPercentageRectangle.endFill();
        const blackPercentageText = new Text('51%', percentageTextStyle);
        blackPercentageText.position.set(320, 45)

        colorsBg.addChild(redText);
        colorsBg.addChild(greenText);
        colorsBg.addChild(blackText);
        colorsBg.addChild(redPercentageRectangle);
        colorsBg.addChild(greenPercentageText);
        colorsBg.addChild(blackPercentageText);
        colorsBg.addChild(greenPercentageRectangle);
        colorsBg.addChild(blackPercentageRectangle);
        colorsBg.addChild(redPercentageText);


        return colorsBg;

    }
    getDisplayObject(): Container {
        return this.container;
    }
}