import { TilesheetBuilder } from "./tilesheet-builder";
import * as spritesData from './sprites-data/racetrack.json';
import { RacetrackNumber } from "./racetrack-number";
import { Rectangle } from "pixi.js";
import { NumberSelector } from "./number-selector";
import { ChipBuilder } from "./chip-builder";
import { Player } from "../player";

export class RouletteRaceTrack extends TilesheetBuilder {
    private sprites: RacetrackNumber[];
    private numberSelector: NumberSelector;
    private chipBuilder: ChipBuilder;
    private player: Player;

    constructor(textureCache: PIXI.Texture[], numberSelector: NumberSelector, chipBuilder: ChipBuilder, player: Player) {
        super(textureCache, spritesData);
        this.sprites = [];
        this.numberSelector = numberSelector;
        this.chipBuilder = chipBuilder;
        this.player = player;
        this.build();
    }

    protected build(): void {
        
        let raceTrackBg = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache['images/dynamicBlueStandard.png'],
            new PIXI.Rectangle(973, 836, 493, 93)
        ));


        let raceTrackBorder = new PIXI.Sprite(new PIXI.Texture(
            this.textureCache["images/dynamicBlueStandard.png"],
            new PIXI.Rectangle(1485, 836, 496, 96)
        ));

        this.container.x = 700;
        this.container.y = 330;

        this.container.scale.y = 0.8;

        this.container.addChild(raceTrackBg);
        this.container.addChild(raceTrackBorder);

        Object.keys(spritesData).forEach(key => {
            const sprite = new RacetrackNumber(
                new PIXI.Texture(this.textureCache['images/dynamicBlueStandard.png'], new Rectangle(spritesData[key].tx, spritesData[key].ty, spritesData[key].w, spritesData[key].h)),
                spritesData[key], this.textureCache
            );

            this.sprites[key] = sprite;

            sprite.setInteractive(true);
            sprite.getDisplayObject().on('mouseover', () => {
                setTimeout(() => {
                    spritesData[key].numbers.forEach(n => {
                        this.sprites[n].highlight(0xffffff);
                    });
                    this.numberSelector.groupSelector(spritesData[key].numbers, rouletteNumber => rouletteNumber.highlight());
                }, 0);
            });

            sprite.getDisplayObject().on('mouseout', () => {
                spritesData[key].numbers.forEach(n => {
                    this.sprites[n].disableHighlight();
                });
                this.numberSelector.all(rouletteNumber => rouletteNumber.disableHighlight());
            });

            sprite.getDisplayObject().on('click', () => {
                if (spritesData[key].numbers.length * this.player.getSelectedChip() > this.player.getBalance()) {
                    console.log('insufficient funds');
                    return;
                }
                this.numberSelector.groupSelector(spritesData[key].numbers,
                    (s, n) => this.chipBuilder.addChip(s, this.player.getSelectedChip(), n));
            });


            
            if (spritesData[key].zIndex) {
            
                this.container.addChildAt(sprite.getDisplayObject(), spritesData[key].zIndex);
            } else {
                
                this.container.addChild(sprite.getDisplayObject());
            }
        });
    }

}