import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twenty-forty-eight',
  templateUrl: './twenty-forty-eight.component.html',
  styleUrls: ['./twenty-forty-eight.component.scss']
})
export class TwentyFortyEightComponent implements OnInit {
  boardSize = 3;
  borderSize = 1;
  cellSize = 50;
  gameStart = false;
  showBoard = false;
  initialCell = { number: 0 };
  board: Array<{ number: 0 }>;

  constructor() { }

  ngOnInit() {
  }

  startGame() {
    this.gameStart = true;
  }

  buildBoard(size: number): void {
    this.boardSize = Math.pow(size, 2);
    this.board = new Array(this.boardSize).fill(this.initialCell);
    this.showBoard = true;
  }

  setBoardStyle() {
    return {
      width: Math.sqrt(this.boardSize) * this.cellSize + this.borderSize + 'px'
    }
  }
}
