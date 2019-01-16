import { IObserver } from "./iobserver";

export interface IObservable {
    registerObserver(observer: IObserver);
    removeObserver(observer: IObserver);
    notifyObservers(message: string, data?: any);
}