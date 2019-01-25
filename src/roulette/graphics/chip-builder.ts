import * as PIXI from 'pixi.js';
import { IDrawable } from "./idrawable";
import { RouletteNumber } from './roulette-number';
import { Chip } from './chip';
import { IPlayable } from './iplayable';
import { IObserver } from '../../iobserver';
import { Player } from '../player';
import { NumberSelector } from './number-selector';

interface Bet {
    value: number;
    key: string;
    chip: Chip;
}

export class ChipBuilder implements IDrawable, IObserver {

    private container: PIXI.Container;
    private player: Player;
    private bets: Bet[];
    private numberSelector: NumberSelector;
    private enabled: boolean = false;

    constructor(player: Player, numberSelector: NumberSelector) {
        this.player = player;
        this.numberSelector = numberSelector;
        this.container = new PIXI.Container();
        this.bets = [];
    }


    addChip(n: IPlayable, value: number, key: string) {
        if (this.enabled) {
            if (this.player.getBalance() >= value) {
                this.bets.push({value, key, chip: n.addChip(value, key), });
                this.player.addBet({key, value});
            } else {
                console.log('insufficient funds');
            }
        }
    }

    popChip() {
        if (this.enabled) {
            const lastAddedChip = this.bets.pop();
            if (lastAddedChip) {
                lastAddedChip.chip.getRouletteNumber().removeChip(lastAddedChip.value);
                this.player.removeBetAt(lastAddedChip.value, lastAddedChip.key);
            }
        }
    }

    cancelBets() {
        if (this.enabled) {
            this.bets.forEach(bet => {
                bet.chip.getRouletteNumber().resetBets();
            });
            this.bets = [];
            this.player.clearBets(true);
        }
    }

    setState(state: boolean) {
        this.enabled = state;
    }

    getDisplayObject() {
        return this.container;
    }
    
    receiveNotification(message: string): void {
        if (message === 'undo') {
            this.popChip();
        } else if (message === 'cancel') {
            this.cancelBets();
        }
    }
}