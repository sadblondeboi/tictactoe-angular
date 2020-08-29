import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public players

  public constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getPlayersIDs();
  }

  getPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(players => console.log(players));
  }
}
