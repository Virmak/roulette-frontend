import io from 'socket.io-client';
import { Player } from '../roulette/player';
import { ChipBuilder } from '../roulette/graphics/chip-builder';
import { IGameStateObservable } from '../igame-state-observable';
import { IGameStateObserver } from '../igame-state-observer';
import { ControlsMenu } from '../roulette/ui/controls-menu';

export class SocketRouletteServer implements IGameStateObservable {
    private roundStatus: number;
    private serviceActifState: boolean;
    private idleTime: number;
    private socket: any;

    private player: Player;
    private chipBuilder: ChipBuilder;
    private controlsMenu: ControlsMenu;

    private observers: IGameStateObserver[];

    constructor(player: Player, chipBuilder: ChipBuilder, controlsMenu: ControlsMenu) {
        this.player = player;
        this.chipBuilder = chipBuilder;
        this.controlsMenu = controlsMenu;
        this.roundStatus = 0;
        this.idleTime = 0;
        this.observers = [];
        this.setActifState(true);
        this.init();
        this.loginUser();
    }

    loginUser() {
        this.socket.on('connect', (message: any) => {
        });

        this.socket.on('gss', (gameState: any) => { // game state sequence
            this.setGameState(gameState);
            this.notifyObservers(gameState);
        });
       
        this.socket.on('f', (m: any) => {
            
        });

        this.socket.on('rs', (m: any) => { // roundStatus

        });

        this.socket.on('wn', (a: any) => {
            if (a > 0) {
                this.controlsMenu.setLastWinText(a);
            }
        });
        
        this.socket.on('accepting_bets', () => { console.log(this.player.getBets());
            this.chipBuilder.setState(false);
            this.sendBets(this.player.getBets());
        });
        
        this.socket.on('disconnect', function() {
            this.chipBuilder.setState(false);
        });
    }

    sendBets(bets) {
        this.socket.emit('sb', bets);
    }

    requestGameStateBySequence() {
        this.socket.emit('gameState', '');
    }

    setGameState(gameState) {
        if (this.roundStatus !== gameState.roundStatus) {
            this.roundStatus = gameState.roundStatus;
            if (gameState.roundStatus === 1) {
                this.chipBuilder.setState(true);
                this.player.clearBets();
                this.chipBuilder.cancelBets();
            } else if (gameState.roundStatus === 3) {
                // this.sendBets(this.game.getPlayer().getBets());
                // this.game.setInteractive(false);
            } else if (gameState.roundStatus === 0) {
                //this.fetchWinnings();
            } else {
                this.chipBuilder.setState(false);
            }
        }
    }

    setActifState(state) {
        this.serviceActifState = state;
    }


    runLoop() {
        setTimeout(() => {
            this.idleTime += 2;
            if (this.idleTime >= 60) { console.log('inactif');
                this.setActifState(false);
                this.chipBuilder.setState(false);
                return;
            }
            this.requestGameStateBySequence();
            if(this.serviceActifState) { 
                this.runLoop();
            }
        }, 2000);
    }

    private init() {
        // inactivity timeout
        window.addEventListener('mousemove', () => {
            this.idleTime = 0;
        });

        this.socket = io('http://127.0.0.1:3000');
    }


    
    registerObserver(observer: IGameStateObserver) {
        this.observers.push(observer);
    }

    removeObserver(observer: IGameStateObserver) {
        for(let i = 0; i < this.observers.length; i++) {
            if (this.observers[i] == observer) {
                this.observers.splice(i, 1);
            }
        }
    }

    notifyObservers(gameState: any) {
        this.observers.forEach(observer => observer.updateGameState(gameState));
    }

}