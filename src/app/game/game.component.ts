import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../services/player.service';
import { GameService, GameState } from '../services/game.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public tiles: any [];
  public valueEmittedFromChildComponent = '';

  public constructor(private playerService: PlayerService, private gameService: GameService) { }

  ngOnInit(): void {
    this.playerService.getPlayersIDs();
    this.gameService.setActivePlayer(GameState.None)
  }

  getPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(players => console.log(players));
  }

  parentEventHandlerFunction(valueEmitted): void{
    console.log(this.gameService);
    this.tiles[valueEmitted] = this.gameService.getActivePlayer();
  }
}
