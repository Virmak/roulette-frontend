import { IBet } from "./ibet";
import { IObserver } from "../iobserver";

export class Player implements IObserver {
    static chipValues = [1, 5, 10, 20, 50, 100, 'MAX'];
    private currentBets: any;
    private selectedChip: number;
    private playerName: string;


    constructor() {
        this.currentBets = {};
        this.selectedChip = 1;
    }

    setSelectedChipIndex(value) {
        this.selectedChip = value;
    }

    getSelectedChipIndex() {
        return this.selectedChip;
    }

    getSelectedChip() {
        return Player.chipValues[this.selectedChip];
    }

    addBet(bet: IBet) {
        if (this.currentBets[bet.key]) {
            this.currentBets[bet.key].value += bet.value;
        } else {
            this.currentBets[bet.key] = bet;
        }
    }

    removeBetAt(value: number, key: string) {
        if (this.currentBets[key]) {
            this.currentBets[key].value -= value;
            if (this.currentBets[key].value <= 0) {
                delete this.currentBets[key];
            }
        }
    }

    getBets() {
        return this.currentBets;
    }

    clearBets() {
        this.currentBets = {};
    }

    setPlayerName(name: string) {
        this.playerName = name;
    }

    getPlayerName() {
        return this.playerName;
    }

    
    receiveNotification(message: string): void {

        console.log(message);
    }
}