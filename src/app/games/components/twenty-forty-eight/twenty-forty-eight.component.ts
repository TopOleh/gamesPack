import { Component, HostListener } from '@angular/core';

import { DIRECTIONS } from 'src/app/shared';

class TwentyFortyEightCell {
  cellNumber: number;
  constructor(cellNumber = 0) {
    this.cellNumber = cellNumber;
  }
}

@Component({
  selector: 'app-twenty-forty-eight',
  templateUrl: './twenty-forty-eight.component.html',
  styleUrls: ['./twenty-forty-eight.component.scss']
})
export class TwentyFortyEightComponent {
  rowSize = 3;
  boardSize = 3;
  borderSize = 1;
  cellSize = 50;
  gameStart = false;
  showBoard = false;
  board: Array<TwentyFortyEightCell>;

  @HostListener('document:keydown', ['$event.keyCode'])
  addMoveListener(direction: number): void {
    switch (direction) {
      case DIRECTIONS.RIGHT:
        this.makeMove(direction);
        break;
      case DIRECTIONS.LEFT:
        this.makeMove(direction);
        break;
      case DIRECTIONS.UP:
        this.makeMove(direction);
        break;
      case DIRECTIONS.DOWN:
        this.makeMove(direction);
        break;
    }
  }

  makeMove(direction: number): void {
    let groupedArr: Array<TwentyFortyEightCell[]> = this.board.reduce((acc, cell, index, arr) => {
      if (index % this.rowSize === 0) {
        acc.push([cell]);
      } else {
        acc[acc.length - 1].push(cell);
      }
      return acc;
    }, []);

    const zeroRemoved = groupedArr.map((row) => row.filter((cell) => cell.cellNumber !== 0));
    zeroRemoved.map((row) => {
      for (let i = 0; i < row.length; i++) {
        const cell = row[i];
        const nextCell = row[i + 1];
        if (nextCell && cell.cellNumber === nextCell.cellNumber) {
          nextCell.cellNumber += cell.cellNumber;
          cell.cellNumber = 0;
          break;
        }
      }
    });

    groupedArr = zeroRemoved.map((row) => {
      while (row.length < zeroRemoved.length) {
        row.unshift(new TwentyFortyEightCell());
      }
      return row;
    });
    console.log(zeroRemoved);
    console.log(groupedArr);
    this.board = groupedArr.reduce((newBoard: TwentyFortyEightCell[], row: TwentyFortyEightCell[]) => newBoard.concat(row), []);
    this.setNumber();
  }

  startGame(): void {
    this.gameStart = true;
  }

  buildBoard(size: number): void {
    this.rowSize = size;
    this.boardSize = Math.pow(size, 2);
    this.board = new Array(this.boardSize).fill(null).map((e) => new TwentyFortyEightCell());
    this.showBoard = true;

    this.setNumber();
  }

  generateRandomNumber(): number {
    return Math.random() >= 0.5 ? 2 : 4;
  }

  setNumber(): void {
    const placeOnBoard = Math.floor(Math.random() * this.board.length);
    if (this.board[placeOnBoard].cellNumber !== 0) {
      return this.setNumber();
    }
    this.board[placeOnBoard] = new TwentyFortyEightCell(this.generateRandomNumber());
  }

  setBoardStyle(): { width: string } {
    return {
      width: Math.sqrt(this.boardSize) * this.cellSize + this.borderSize + 'px'
    };
  }
}
