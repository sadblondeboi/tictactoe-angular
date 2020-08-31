import { Component, Input, OnInit } from '@angular/core';

import { Player } from '../models/player.models';
import { GameService, GameState } from '../services/game.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  @Input()
  public players: {
    player1: Player;
    player2: Player;
  };

  public playerActiveId = GameState.Player1;

  public constructor(private gameService: GameService) {}

  public ngOnInit() {
    this.gameService.activePlayerId.subscribe(
      (id) => (this.playerActiveId = id)
    );
  }
}
