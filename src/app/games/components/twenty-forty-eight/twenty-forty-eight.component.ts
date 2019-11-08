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


    switch (direction) {
      case DIRECTIONS.RIGHT:
        groupedArr = this.onLeftRightDirection(groupedArr);
        break;
      case DIRECTIONS.LEFT:
        groupedArr = this.onLeftRightDirection(groupedArr).map((row: TwentyFortyEightCell[]) => row.reverse());
        break;
      case DIRECTIONS.UP:
        groupedArr = this.onUpDownDirection(groupedArr).reverse();
        break;
      case DIRECTIONS.DOWN:
        groupedArr = this.onUpDownDirection(groupedArr);
        break;
    }

    this.board = groupedArr.reduce((newBoard: TwentyFortyEightCell[], row: TwentyFortyEightCell[]) => newBoard.concat(row), []);
    this.setNumber();
  }

  onUpDownDirection(arr): Array<TwentyFortyEightCell[]> {
    arr.forEach((row: TwentyFortyEightCell[], rowIndex: number, rows: Array<TwentyFortyEightCell[]>) => {
      const nextRow = rows[rowIndex + 1];
      row.forEach((cell: TwentyFortyEightCell, cellIndex: number, cells: TwentyFortyEightCell[]) => {
        if (nextRow) {
          if (nextRow[cellIndex].cellNumber === 0) {
            nextRow[cellIndex].cellNumber = cell.cellNumber;
            cell.cellNumber = 0;
          } else if (nextRow[cellIndex].cellNumber === cell.cellNumber) {
            nextRow[cellIndex].cellNumber += cell.cellNumber;
            cell.cellNumber = 0;
          }
        }
      });
    });

    return arr;
  }

  onLeftRightDirection(arr): Array<TwentyFortyEightCell[]> {
    arr.forEach((row: TwentyFortyEightCell[], rowIndex: number, rows: Array<TwentyFortyEightCell[]>) => {
      row.forEach((cell: TwentyFortyEightCell, cellIndex: number, cells: TwentyFortyEightCell[]) => {
        const nextCell: TwentyFortyEightCell = cells[cellIndex + 1];

        if (nextCell) {

          if (nextCell.cellNumber === 0) {
            nextCell.cellNumber = cell.cellNumber;
            cell.cellNumber = 0;
          } else if (nextCell.cellNumber === cell.cellNumber) {
            nextCell.cellNumber += cell.cellNumber;
            cell.cellNumber = 0;
          }
        }
      });
    });

    return arr;
  }

  // TODO: remove, For testing
  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.gameStart = true;

    // TODO: remove, For testing
    this.buildBoard(3);
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
    // TODO: use commented, For testing
    if (this.board[placeOnBoard].cellNumber !== 0) {
      this.setNumber();
    }
    this.board[placeOnBoard] = new TwentyFortyEightCell(this.generateRandomNumber());
  }

  setBoardStyle(): { width: string } {
    return {
      width: Math.sqrt(this.boardSize) * this.cellSize + this.borderSize + 'px'
    };
  }
}
