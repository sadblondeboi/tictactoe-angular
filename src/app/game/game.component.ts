import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../services/player.service';
import { GameService } from '../services/game.service';
import { Player } from '../models/player.models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public tiles = this.gameService.tiles;
  public players: {
    player1?: Player;
    player2?: Player;
  } = {};

  public valueEmittedFromChildComponent = '';

  public constructor(
    private playerService: PlayerService,
    private gameService: GameService
  ) {}

  public ngOnInit(): void {
    this.gameService.setUpPlayers();

    this.playerService.player1.subscribe(
      (player) => (this.players.player1 = player)
    );
    this.playerService.player2.subscribe(
      (player) => (this.players.player2 = player)
    );

    this.playerService.setUpGame();
  }

  public parentEventHandlerFunction(valueEmitted: number): void {
    const oldValue = this.tiles[valueEmitted];
    this.tiles = this.gameService.captureTile(valueEmitted);
    if (oldValue !== this.tiles[valueEmitted]) {
      this.gameService.nextTurn();
    }
  }
}
