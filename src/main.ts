import { RouletteTable } from "./roulette/graphics/roulette-table";
import { RouletteGame } from "./roulette/roulette-game";
import { NumberSelector } from "./roulette/graphics/number-selector";
import { ControlsMenu } from "./roulette/ui/controls-menu";
import { RouletteUI } from "./roulette/ui/ui";
import { ChipBuilder } from "./roulette/graphics/chip-builder";
import { BetMenu } from "./roulette/graphics/menu/menu-builder";
import { ChipSelector } from "./roulette/graphics/menu/chip-selector";
import { Player } from "./roulette/player";
import { SocketRouletteServer } from "./network/socket-roulette-server";
import { LeftPanel } from "./roulette/ui/left-panel";
import { RightPanel } from "./roulette/ui/right-panel";
import { ProgressBar } from "./roulette/ui/progress-bar";
import { RouletteNotifier } from "./roulette/graphics/roulette-notifier";

window.addEventListener('DOMContentLoaded', () => {
    init();
});


function init() {
    
    PIXI.settings.RESOLUTION = 2;
    PIXI.loader
    .add('images/dynamicBlueStandard.png')
    .add('images/tableRimSilver.png')
    .add('images/tableBorderBlack.png')
    .add('images/ui-components.png')
    .add('images/webCommon.png')
    .add('images/webCommonSkinnable.png')
    .load(() => {

        
        const leftPanel = new LeftPanel(PIXI.utils.TextureCache);
        const rightPanel = new RightPanel(PIXI.utils.TextureCache);
        const progressBar = new ProgressBar(PIXI.utils.TextureCache);
        
        const player = new Player();
        const numberSelector = new NumberSelector();
        const chipBuilder = new ChipBuilder(player, numberSelector);
        const chipSelector = new ChipSelector(PIXI.utils.TextureCache, player);
        const betMenu = new BetMenu(PIXI.utils.TextureCache, chipSelector);

        betMenu.registerObserver(player);
        betMenu.registerObserver(chipBuilder);


        const rouletteNotifier = new RouletteNotifier(PIXI.utils.TextureCache, numberSelector);

        const controlsMenu = new ControlsMenu(PIXI.utils.TextureCache, betMenu, progressBar);
        const ui = new RouletteUI(PIXI.utils.TextureCache, leftPanel, rightPanel);
        const rouletteTable = new RouletteTable(PIXI.utils.TextureCache, numberSelector, chipBuilder, player);
        const rouletteGame = new RouletteGame(rouletteTable, controlsMenu, ui, rouletteNotifier);
        
        player.registerObserver(controlsMenu);

        /*chipBuilder.setState(true);
        rouletteNotifier.showResult(1);*/

        const rouletteService = new SocketRouletteServer(player, chipBuilder, controlsMenu);
        rouletteService.registerObserver(leftPanel);
        rouletteService.registerObserver(progressBar);
        rouletteService.registerObserver(rouletteNotifier);

        rouletteGame.getApp().ticker.add(delta => {
            progressBar.tick();
        });
    });
}

