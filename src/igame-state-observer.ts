export interface IGameStateObserver {
    updateGameState(gameState: any, message?: string): void;
}