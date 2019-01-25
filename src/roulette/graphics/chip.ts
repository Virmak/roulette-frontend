import * as PIXI from 'pixi.js';
import { IDrawable } from './idrawable';
import { IPlayable } from './iplayable';

export class Chip implements IDrawable {
    private baseTexture: PIXI.BaseTexture;
    private sprite: PIXI.Sprite;
    private container: PIXI.Container;
    private chipText: PIXI.Text;
    private currentValue: number;
    private rouletteNumber: IPlayable;

    private chipsPositions = {
        1: {x: 571, y:773},
        5: {x: 255, y:773},
        10: {x: 334, y:773},
        20: {x: 413, y:694},
        50: {x: 413, y:615},
        100: {x: 492, y:615},
        999: {x: 334, y: 615}
    };

    constructor(baseTexture: PIXI.BaseTexture, value: any, rouletteNumber?: IPlayable, fontSize = 18) {
        this.baseTexture = baseTexture;
        this.rouletteNumber = rouletteNumber;
        this.container = new PIXI.Container();
        this.sprite = new PIXI.Sprite(new PIXI.Texture(
            this.baseTexture, new PIXI.Rectangle(
                this.chipsPositions[value].x,
                this.chipsPositions[value].y,
                74, 74
            )
        ));
        this.chipText = new PIXI.Text(value === 999 ? 'MAX' : value, {
            fontSize: fontSize,
            fontWeight: 'bold'
        });
        this.chipText.anchor.set(0.5);
        this.chipText.x = this.sprite.width / 2;
        this.chipText.y = this.sprite.height / 2;
        this.container.addChildAt(this.sprite, 0);
        this.container.addChildAt(this.chipText, 1);

        this.currentValue = value;
    }

    getCurrentValue() {
        return this.currentValue;
    }

    setScale(x: number, y?: number) {
        this.container.scale.set(x, y);
    }

    setText(t: string) {
        this.chipText.text = t;
    }

    setValue(value) {
        this.sprite.texture.frame =  new PIXI.Rectangle(
            this.getChipFrameByValue(value).x,
            this.getChipFrameByValue(value).y,
            74, 74
        );
        this.setText(value);
    }

    addValue(value: number) {
        this.currentValue += value;
        this.setValue(this.currentValue);
    }

    getRouletteNumber(): IPlayable {
        return this.rouletteNumber;
    }

    getChipFrameByValue(value) {
        if (value < 5) {
            return this.chipsPositions[1];
        } else if (value < 10) {
            return this.chipsPositions[5];
        } else if (value < 20) {
            return this.chipsPositions[10];
        } else if (value < 50) {
            return this.chipsPositions[20];
        } else if (value < 100) {
            return this.chipsPositions[50];
        } else if (value == 100) {
            return this.chipsPositions[100];
        } else {
            return this.chipsPositions['MAX'];
        }
    }
    
    getDisplayObject() {
        return this.container;
    }

    getContainer() {
        return this.container;
    }
}