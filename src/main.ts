import { RouletteTable } from "./roulette/graphics/roulette-table";
import { RouletteGame } from "./roulette/roulette-game";
import { NumberSelector } from "./roulette/graphics/number-selector";
import { ControlsMenu } from "./roulette/ui/controls-menu";
import { RouletteUI } from "./roulette/ui/ui";
import { ChipBuilder } from "./roulette/graphics/chip-builder";
import { BetMenu } from "./roulette/graphics/menu/bet-menu";
import { ChipSelector } from "./roulette/graphics/menu/chip-selector";
import { Player } from "./roulette/player";
import { SocketRouletteServer } from "./network/socket-roulette-server";
import { LeftPanel } from "./roulette/ui/left-panel";
import { RightPanel } from "./roulette/ui/right-panel";
import { ProgressBar } from "./roulette/ui/progress-bar";
import { RouletteNotifier } from "./roulette/graphics/roulette-notifier";
import { StatsPanel } from "./roulette/ui/stats-panel";

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

        const statsPanel = new StatsPanel(PIXI.utils.TextureCache);
        const leftPanel = new LeftPanel(PIXI.utils.TextureCache);
        const rightPanel = new RightPanel(statsPanel, PIXI.utils.TextureCache);
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

        document.querySelector('.loading-gif').remove();
        (<HTMLElement>document.querySelector('.rplayer')).style.display = 'block';
        /*
        chipBuilder.setState(true);
        rouletteNotifier.showResult(1);

        player.setBalance(9);

        const g = {"roundId":79457939,"roundStatus":3,"dealerName":"Ciara A.","roundResult":-1,"winningBettingPoints":null,"winAmount":0.0,"currentBalance":0.0,"balanceUpdateTimestamp":"636847429509669874","balanceSequence":297886,"gameSequence":297916,"streamSequence":0,"specialGameStatusCode":0,"miliSecondsToWait":30000,"miliSecondsLeftToWait":-7282,"videoTimeCode":"1549146153619","updateTimeStamp":"636847429542429793","prevRound":null,"stats":{"roundsNo":300,"pastResults":[16,29,1,20,8,30,13,17,23,20,8,17],"hotNumbers":[21,25,36,32,6,2],"hotNumbersCount":[14,14,13,13,12,12],"coldNumbers":[23,1,12,22,18,21],"coldNumbersCount":[168,137,131,70,65,64],"redPct":48.00,"blackPct":50.0,"zeroPct":2.00,"oddPct":47.666666666666666666666666670,"evenPct":50.333333333333333333333333330},"activeStreams":[{"qualityClass":1,"activeStreamIndex":0},{"qualityClass":2,"activeStreamIndex":0},{"qualityClass":3,"activeStreamIndex":0}]};
        rightPanel.updateGameState(g);
        */
        
        const rouletteService = new SocketRouletteServer(player, chipBuilder, controlsMenu);
        rouletteService.registerObserver(leftPanel);
        rouletteService.registerObserver(rightPanel);
        rouletteService.registerObserver(progressBar);
        rouletteService.registerObserver(rouletteNotifier);

        rouletteGame.getApp().ticker.add(delta => {
            progressBar.tick();
        });
    });
}

