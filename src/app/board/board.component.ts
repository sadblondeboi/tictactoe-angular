import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  @Output()
  buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  public tiles = [
    {key: '0', value: 'empty'},
    {key: '1', value: 'empty'},
    {key: '2', value: 'empty'},
    {key: '3', value: 'empty'},
    {key: '4', value: 'empty'},
    {key: '5', value: 'empty'},
    {key: '6', value: 'empty'},
    {key: '7', value: 'empty'},
    {key: '8', value: 'empty'},
  ];

  constructor() { }

  public clickButton(tile): void {
    this.buttonClicked.emit(tile);
  }

  ngOnInit(): void {
  }

}
