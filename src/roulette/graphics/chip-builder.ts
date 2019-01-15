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
            this.bets.push({value, key, chip: n.addChip(value, key), });
            this.player.addBet({key, value});
        }
    }

    popChip() {
        if (this.enabled) { debugger;
            const lastAddedChip = this.bets.pop();
            if (lastAddedChip) {
                lastAddedChip.chip.getRouletteNumber().removeChip(lastAddedChip.value);
                this.player.removeBetAt(lastAddedChip.value, lastAddedChip.key);
                /*
                if (/^\d+(\-\d+)+$/.test(lastAddedChip.key)) {
                    this.numberSelector.groupSelector(lastAddedChip.key.split('-'), (s, n) => {
                        s.removeChip(lastAddedChip.value);
                        this.player.removeBetAt(lastAddedChip.value, n);
                    })
                } else {
                    lastAddedChip.chip.getRouletteNumber().removeChip(lastAddedChip.value);
                    this.player.removeBetAt(lastAddedChip.value, lastAddedChip.key);
                }*/
            }
        }
    }

    cancelBets() {
        if (this.enabled) {
            this.bets.forEach(bet => {
                bet.chip.getRouletteNumber().resetBets();
            });
            this.bets = [];
            this.player.clearBets();
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