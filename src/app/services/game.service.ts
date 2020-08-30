import { Injectable } from '@angular/core';

import { Game } from '../models/game';

export enum GameState {
  None = 'None',
  Player1 = 'Player1',
  Player2 = 'Player2'
}


@Injectable({
  providedIn: 'root'
})
export class GameService {
  public activePlayer: GameState;
  private game: Game = {
    round: 1
  };

  public tiles: GameState[] = new Array(9).fill(GameState.None);
  winConditions: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]
  ];

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

  public captureTile(value: number): GameState[] {
    if (this.tiles[value] === GameState.None) {
      this.tiles[value] = this.getActivePlayer();
    }
    return this.tiles;
  }

  public nextTurn(): void {
    if (this.checkWin(this.activePlayer, this.tiles)) {
      console.log(this.activePlayer + ' won.');
      this.nextRound();
    } else if (this.checkDraw()){
      console.log('draw');
      this.nextRound();
    }
    this.changeActivePlayer();

  }

  private nextRound(): void {
    // this.activePlayer.score += 1;
    this.game.round += 1;
    console.log(this.game.round);
    this.tiles.fill(GameState.None);
  }

  private checkWin(player: GameState, tiles: GameState[]): boolean {
    for (const i of this.winConditions) {
      let win = 0;
      for (const z of i) {
        win += +(tiles[z] === player);
      }
      if (win === 3) {
        return true;
      }
    }
    return false;
  }

  private checkDraw(): boolean {
    // ==-1 means that it wasnt found
    return this.tiles.findIndex(tile => tile === GameState.None) === -1;
  }
}
