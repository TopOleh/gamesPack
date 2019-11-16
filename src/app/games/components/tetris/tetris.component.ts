import { Component } from '@angular/core';

import { TetrisCellModel, TetrisCell } from './interfaces/tetris-cell';

@Component({
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})

export class TetrisComponent {
  boardSize = 3;
  borderSize = 1;
  board: Array<TetrisCell>;
  cellSize = 20;
  gameStart: boolean;
  showBoard: boolean;
  rowSize: number;

  // TODO: remove, For testing
  ngOnInit() {
    this.startNewGame();
  }

  startNewGame() {
    this.gameStart = true;

    // TODO: remove, For testing
    this.buildBoard(9);
  }

  buildBoard(size: number): void {
    this.rowSize = size;
    this.boardSize = Math.pow(size, 2);
    this.board = new Array(this.boardSize).fill(null).map((e) => new TetrisCellModel('', 0));
    this.showBoard = true;
  }

  setBoardStyle(): { width: string } {
    return {
      width: Math.sqrt(this.boardSize) * this.cellSize + this.borderSize + 'px'
    };
  }

}
