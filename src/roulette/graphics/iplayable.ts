import { Container } from "pixi.js";

export interface IPlayable {
    addChip(value: number, key: string);
    removeChip(value);
    resetBets();
    getContainer(): Container;
}