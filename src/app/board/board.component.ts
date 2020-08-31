import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { GameState } from '../services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Output()
  buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public tiles: GameState[];

  public constructor() {}

  public clickButton(tile): void {
    this.buttonClicked.emit(tile);
  }
}
