export interface IObserver {
    receiveNotification(message: string, data?: any): void;
}