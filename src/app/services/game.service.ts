import { Injectable } from '@angular/core';

import { Game } from '../models/game';

export enum GameState {
  None,
  Player1,
  Player2
}


@Injectable({
  providedIn: 'root'
})
export class GameService {
  public activePlayer: GameState;
  private game: Game = {
    round: 1
  };

  public constructor() { }

  public changeActivePlayer(): void {
    if (this.activePlayer !== GameState.None) {
      (this.activePlayer === GameState.Player1 ? this.activePlayer = GameState.Player2 : this.activePlayer = GameState.Player1);
    }
  }

  public getActivePlayer(): GameState {
    return this.activePlayer;
  }

  public setActivePlayer(player: GameState): void {
    this.activePlayer = player;
  }

  private nextRound(): void {
    this.game.round += 1;
    this.setActivePlayer(GameState.Player1);
  }
}
