import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../services/player.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public tiles = this.gameService.tiles;

  public valueEmittedFromChildComponent = '';

  public constructor(private playerService: PlayerService, private gameService: GameService) { }

  ngOnInit(): void {
    this.playerService.setUpGame();
  }

  getPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(players => console.log(players));
  }

  parentEventHandlerFunction(valueEmitted: number): void{
    this.tiles = this.gameService.captureTile(valueEmitted);
    this.gameService.nextTurn();
  }
}
