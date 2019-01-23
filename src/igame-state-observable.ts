import { IGameStateObserver } from "./igame-state-observer";

export interface IGameStateObservable {
    registerObserver(observer: IGameStateObserver): void;
    removeObserver(observer: IGameStateObserver): void;
    notifyObservers(gameState: any, message?: string): void;
}