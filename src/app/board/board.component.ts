import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { GameState } from '../services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  @Output()
  buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public tiles: GameState[];

  constructor() { }

  public clickButton(tile): void {
    this.buttonClicked.emit(tile);
  }

  ngOnInit(): void {
  }

}
