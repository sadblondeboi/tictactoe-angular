import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Player } from '../models/player';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {
  @Input()
  public players: {
    player1: Player,
    player2: Player
  };

  constructor() { }

  ngOnInit(): void {
  }

}
