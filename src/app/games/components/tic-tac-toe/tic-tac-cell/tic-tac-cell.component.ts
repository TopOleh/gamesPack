import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tic-tac-cell',
  templateUrl: './tic-tac-cell.component.html',
  styleUrls: ['./tic-tac-cell.component.scss']
})
export class TicTacCellComponent implements OnInit {
  @Input() cell: string;

  constructor() { }

  ngOnInit() {
  }

}
