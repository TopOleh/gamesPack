import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  table: string[] = new Array(9);

  constructor() { }

  ngOnInit() {
    this.table.fill('');
    console.log('this.table :', this.table);
  }

}
