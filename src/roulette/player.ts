import { IBet } from "./ibet";
import { IObserver } from "../iobserver";
import { IObservable } from "../iobservable";

export class Player implements IObserver, IObservable {
    static chipValues = [1, 5, 10, 20, 50, 100, 999];
    private currentBets: any;
    private selectedChip: number;
    private playerName: string;
    private totalBet: number;
    private balance: number;
    private lastBetValue: number;
    private _observers: IObserver[] = [];

    constructor() {
        this.currentBets = {};
        this.selectedChip = 1;
        this.totalBet = 0;
        this.lastBetValue = 0;
        this.setBalance(0);
    }

    setSelectedChipIndex(value) {
        this.selectedChip = value;
    }

    getSelectedChipIndex() {
        return this.selectedChip;
    }

    getSelectedChip() {
        if (this.selectedChip === 999) {
            return this.balance;
        }
        return Player.chipValues[this.selectedChip];
    }

    addBet(bet: IBet) {
        if (this.currentBets[bet.key]) {
            this.currentBets[bet.key].value += bet.value;
        } else {
            this.currentBets[bet.key] = bet;
        }
        this.totalBet += bet.value;
        this.setBalance(this.balance - bet.value)
        this.notifyObservers('update_bet', this.totalBet);
    }

    removeBetAt(value: number, key: string) {
        if (this.currentBets[key]) {
            this.currentBets[key].value -= value;
            if (this.currentBets[key].value <= 0) {
                delete this.currentBets[key];
            }
            
            this.totalBet -= value;
            this.notifyObservers('update_bet', this.totalBet);
            this.setBalance(this.balance + value);
        }
    }

    getBets() {
        return this.currentBets;
    }

    clearBets(updateBalance: boolean = false) {
        if (updateBalance && this.totalBet > 0) {
            this.setBalance(this.balance + this.totalBet);
        }
        this.currentBets = {};
        this.totalBet = 0;
        this.notifyObservers('update_bet', this.totalBet);
    }

    setPlayerName(name: string) {
        this.playerName = name;
    }

    getPlayerName() {
        return this.playerName;
    }

    getBalance(): number {
        return this.balance;
    }

    setBalance(balance: number) {
        this.balance = balance;
        this.notifyObservers('update_balance', balance);
    }
    
    receiveNotification(message: string): void {
        //console.log(message);
    }


    
    
    
    registerObserver(observer: IObserver) {
        this._observers.push(observer);
    }

    removeObserver(observer: IObserver) {
        for(let i = 0; i < this._observers.length; i++) {
            if (observer === this._observers[i]) {
                this._observers.splice(i, 1);
            }
        }
    }
    
    notifyObservers(message: string, data?: any) {
        this._observers.forEach(observer => observer.receiveNotification(message, data));
    }
}