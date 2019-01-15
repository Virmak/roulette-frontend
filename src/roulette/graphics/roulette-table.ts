import * as PIXI from 'pixi.js';
import { IDrawable } from './idrawable';
import { TilesheetBuilder } from './tilesheet-builder';
import * as spritesData from './sprites-data/xpg-sprites';
import * as hitboxesData from './sprites-data/hitboxes.json';
import { RouletteNumber } from './roulette-number';
import { RouletteHitbox } from './roulette-hitbox';
import { RouletteRaceTrack } from './roulette-racetrack';
import { NumberSelector } from './number-selector';
import { ChipBuilder } from './chip-builder';
import { Player } from '../player';

export class RouletteTable extends TilesheetBuilder{

    private interactive: boolean;
    private chipBuilder: ChipBuilder;
    private player: Player;
    private numberSelector: NumberSelector;
    
    constructor(textureCache: PIXI.Texture[], numberSelector: NumberSelector, chipBuilder: ChipBuilder, player: Player) {
        super(textureCache, spritesData);
        this.numberSelector = numberSelector;
        this.chipBuilder = chipBuilder;
        this.player = player;
        this.build();
    }

    build(): void {
        let numbersBg = new PIXI.Sprite(new PIXI.Texture(this.textureCache['images/dynamicBlueStandard.png'], new PIXI.Rectangle(390, 0, 1152, 360)));
        numbersBg.x = 450;
        numbersBg.y = 50;

        
        this.buildTableBg();
        Object.keys(spritesData).forEach(key => {
            if (key !== 'default') {
                const number = new RouletteNumber(
                    new PIXI.Texture(
                        this.textureCache['images/dynamicBlueStandard.png'], 
                        new PIXI.Rectangle(spritesData[key].tx, spritesData[key].ty, spritesData[key].w, spritesData[key].h)
                    ), spritesData[key], this.textureCache
                );
                
                this.tiles[key] = number;
                numbersBg.addChild(number.getDisplayObject());
                this.registerNumberEvents(number, key);
            }
        });
        this.numberSelector.setSpritesData(spritesData);
        this.numberSelector.setComponents(this.tiles)
        Object.keys(hitboxesData).forEach(key => {
            if (key !== 'default') {
                 const hitBox = new RouletteHitbox(hitboxesData[key], key, this.numberSelector, this.textureCache);
                 numbersBg.addChild(hitBox.getDisplayObject());
                 this.registerHitboxEvents(hitBox, key);
            }
        });
        numbersBg.scale.set(.8, .75);
        this.buildRaceTrack();
        this.container.addChild(numbersBg);
        this.container.x = -230;
        this.container.y = 250;
        this.container.scale.set(1, 1);
    }

    private registerHitboxEvents(h: RouletteHitbox, key: string) {
        h.getContainer().interactive = true;
        h.getDisplayObject().on('click', () => {
            this.chipBuilder.addChip(h, this.player.getSelectedChip(), key); 
        });
    }

    private registerNumberEvents(n: RouletteNumber , key: string) {
        n.setInteractive(true); 
        n.getDisplayObject().on('mouseover', () => {
            setTimeout(() => 
            this.numberSelector.select(key, rouletteNumber => rouletteNumber.highlight()), 0);
        });

        n.getDisplayObject().on('mouseout', () => {
            this.numberSelector.all(rouletteNumber => rouletteNumber.disableHighlight());
        });

        n.getDisplayObject().on('click', () => {
            this.chipBuilder.addChip(n, this.player.getSelectedChip(), key);
        });
    }

    private buildRaceTrack() {
        const raceTrack = new RouletteRaceTrack(this.textureCache, this.numberSelector, this.chipBuilder, this.player);
        this.container.addChild(raceTrack.getDisplayObject());
    }

    private buildTableBg() {
        let tableBg = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache["images/dynamicBlueStandard.png"],
            new PIXI.Rectangle(630, 954, 1636, 523)
        ));
        
        let tableRim = new PIXI.Sprite(this.textureCache['images/tableRimSilver.png']);
        let tableBorder = new PIXI.Sprite(this.textureCache['images/tableBorderBlack.png']);

        tableRim.x = 0;
        tableBg.x = 85;
        tableBg.y = 34;

        this.container.addChild(tableBg);
        this.container.addChild(tableRim);
        this.container.addChild(tableBorder);
        this.container.addChild(tableBg);

    }

    setInteractive(value: boolean) {
        this.interactive = value;
    }

}