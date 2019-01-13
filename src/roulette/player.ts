import { IBet } from "./ibet";

export class Player {
    private currentBets: any[];
    private selectedChip: number;



    setSelectedChip(value) {
        this.selectedChip;
    }

    addBet(bet: IBet) {
        if (this.currentBets[bet.key]) {
            this.currentBets[bet.key].value += bet.value;
        } else {
            this.currentBets[bet.key] = bet;
        }
    }
}