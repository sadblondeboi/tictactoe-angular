import { Component, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { StatsComponent } from '../stats/stats.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit(): void {
  }

}
