export interface IObserver {
    receiveNotification(message: string): void;
}