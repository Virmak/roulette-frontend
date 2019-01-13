import { RouletteTable } from "./roulette/graphics/roulette-table";
import { RouletteGame } from "./roulette/roulette-game";
import { NumberSelector } from "./roulette/graphics/number-selector";
import { ControlsMenu } from "./roulette/ui/controls-menu";
import { RouletteUI } from "./roulette/ui/ui";
import { ChipBuilder } from "./roulette/graphics/chip-builder";

window.addEventListener('DOMContentLoaded', () => {

    PIXI.settings.RESOLUTION = 2;
    const controls = new ControlsMenu(PIXI.utils.TextureCache);
    const ui = new RouletteUI(PIXI.utils.TextureCache);

    const chipBuilder = new ChipBuilder(PIXI.utils.TextureCache);

    const numberSelector = new NumberSelector();
    const rouletteTable = new RouletteTable(PIXI.utils.TextureCache, numberSelector, chipBuilder);
    const rouletteGame = new RouletteGame(rouletteTable, controls, ui);
    
});

console.log('bootstrapping 2 ');

