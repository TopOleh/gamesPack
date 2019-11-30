import { Component, HostListener } from '@angular/core';

// rxjs
import { Subject, Observable, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TetrisCellModel, TetrisCell, TetrisFigureType } from './interfaces';
import { Directions } from '../snake/interfaces';

@Component({
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})

export class TetrisComponent {
  board: Array<TetrisCell>;
  boardSize = 9;
  gameStart: boolean;
  showBoard: boolean;

  private borderSize = 1;
  private cellSize = 20;
  private figureLength = 4;
  private rowSize: number;
  private nextFigure: TetrisCell;
  private moveInterval: Observable<number> = interval(1000);
  private endGame: Subject<boolean> = new Subject();

  startNewGame(): void {
    this.gameStart = true;
  }

  buildBoard(size: number): void {
    this.rowSize = size;
    this.boardSize = Math.pow(size, 2);
    this.board = new Array(this.boardSize).fill(null).map((e: TetrisCell) => new TetrisCellModel('', 0));
    this.showBoard = true;

    this.putFigure(this.showBoard);
    this.moveInterval.pipe(
      takeUntil(this.endGame)
    ).subscribe(_ => {
      this.nextFigure.directionStep = this.rowSize;
      this.moveFigure();
    });
  }

  generateFigure(): TetrisCell {
    const figureType = Math.floor(Math.random() * (this.figureLength + 1));
    const newFigure = new TetrisCellModel(TetrisFigureType[figureType], figureType);
    return newFigure;
  }

  generateFigurePosition(): void {
    let boardPlace = Math.floor(this.rowSize / 2);

    switch (this.nextFigure.type) {
      case 'S':
        this.board[boardPlace] = this.nextFigure;
        this.board[boardPlace + 1] = this.nextFigure;
        this.board[boardPlace + this.rowSize + 1] = this.nextFigure;
        this.board[boardPlace + this.rowSize + 2] = this.nextFigure;
        break;

      case 'O':
        this.board[boardPlace] = this.nextFigure;
        this.board[boardPlace + 1] = this.nextFigure;
        this.board[boardPlace + this.rowSize] = this.nextFigure;
        this.board[boardPlace + this.rowSize + 1] = this.nextFigure;
        break;

      case 'T':
        this.board[boardPlace] = this.nextFigure;
        this.board[boardPlace + this.rowSize - 1] = this.nextFigure;
        this.board[boardPlace + this.rowSize] = this.nextFigure;
        this.board[boardPlace + this.rowSize + 1] = this.nextFigure;
        break;

      case 'L':
        this.board[boardPlace] = this.nextFigure;
        this.board[boardPlace + 1] = this.nextFigure;
        this.board[boardPlace + 2] = this.nextFigure;
        this.board[boardPlace + this.rowSize] = this.nextFigure;
        break;

      case 'I':
        for (let cellIndex = 0; cellIndex < this.figureLength; cellIndex++) {
          this.board[boardPlace] = this.nextFigure;
          boardPlace++;
        }
        break;
      default:
        console.log('Unknown type');
        break;
    }
  }

  putFigure(initialSetup = false) {
    const figureInMove = this.board.filter(fig => !fig.isStuck && fig.type);

    if (!figureInMove.length || initialSetup) {
      this.nextFigure = this.generateFigure();
      this.generateFigurePosition();
    }
  }

  getFigurePosition(): TetrisCell[] {
    return this.board.reduce((potentialPlace, cell, cellI) => {
      if (cell.type && !cell.isStuck) {
        const newCell: TetrisCell = new TetrisCellModel(cell.type, cell.cellNumber);
        newCell.index = cellI;

        potentialPlace.push(newCell);
      }

      return potentialPlace;
    }, []);
  }

  checkNextFigurePosition(cells: TetrisCell[]): boolean {
    for (const cell of cells) {
      const nextCellPlace = cell.index + this.nextFigure.directionStep;
      const nextCell = this.board[nextCellPlace];

      if (nextCell && nextCell.type && nextCell.isStuck) {
        return true;
      }
    }
    return false;
  }

  checkFigureRotatedPosition(cells: TetrisCell[], rotationPosition: number[]): boolean {
    for (const [i, cell] of cells.entries()) {
      const nextCellPlace = cell.index + rotationPosition[i];
      const nextCell = this.board[nextCellPlace];
      if (!nextCell || nextCell.type && nextCell.isStuck) {
        return true;
      }
    }
    return false;
  }

  clearPreviousPositions(cells, isStucked): void {
    for (const cell of cells) {
      const index = cell.index;

      if (cells[cells.length - 1].index + this.nextFigure.directionStep < this.board.length && !isStucked) {
        this.board[index] = new TetrisCellModel();
      } else {
        this.board[index].isStuck = true;
      }
    }
  }

  putFigureOnNextPosition(cells, isStuck): void {
    for (const cell of cells) {
      const index = cell.index + this.nextFigure.directionStep;
      if (cells[cells.length - 1].index + this.nextFigure.directionStep < this.board.length && !isStuck) {
        this.board[index] = new TetrisCellModel(cell.type, cell.cellNumber);
      }
    }
  }

  endOfRow(cells): boolean {
    for (const cell of cells) {
      let nextCellPlace = cell.index + this.nextFigure.directionStep;

      nextCellPlace = this.nextFigure.directionStep === -1 ? nextCellPlace += 1 : nextCellPlace;
      if (nextCellPlace % this.rowSize === 0 && this.nextFigure.directionStep !== this.rowSize) {
        return false;
      }
    }
    return true;
  }

  moveFigure(): void {
    const figurePosition: TetrisCell[] = this.getFigurePosition();
    const isStuck = this.checkNextFigurePosition(figurePosition);
    const isEndOfRow = this.endOfRow(figurePosition);
    if (!isEndOfRow) {
      return;
    }
    this.clearPreviousPositions(figurePosition, isStuck);
    this.putFigureOnNextPosition(figurePosition, isStuck);
    this.clearRow();
    this.putFigure();
  }

  rotateFigure() {
    const figurePosition: TetrisCell[] = this.getFigurePosition();
    const fig = {
      I: [
        [-this.rowSize * 2 + 1, -this.rowSize, -1, this.rowSize - 2],
        [this.rowSize * 2 + 2, this.rowSize + 1, 0, -this.rowSize - 1],
        [-this.rowSize * 2 + 1, -this.rowSize, -1, this.rowSize - 2],
        [this.rowSize * 2 + 2, this.rowSize + 1, 0, -this.rowSize - 1]
      ],
      S: [
        [-this.rowSize + 2, 1, -this.rowSize, -1],
        [this.rowSize - 1, -1, this.rowSize - 1, 1],
        [-this.rowSize + 2, 1, -this.rowSize, -1],
        [this.rowSize - 1, -1, this.rowSize - 1, 1]
      ],
      T: [
        [0, -this.rowSize * 2, -this.rowSize - 1, -2],
        [0, -this.rowSize + 1, 0, -this.rowSize * 2 + 2],
        [this.rowSize + 2, this.rowSize * 2 + 1, 0, 0],
        [this.rowSize * 2 - 2, 0, this.rowSize - 1, 0]
      ],
      L: [
        [-this.rowSize, -this.rowSize, -1, 1],
        [this.rowSize + 2, this.rowSize * 2 - 1, this.rowSize, 1],
        [-this.rowSize - 2, -this.rowSize, -1, -1],
        [this.rowSize + 1, 0, -this.rowSize + 2, -1],
      ],
      O: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
    };
    const isNotAvailable = this.checkFigureRotatedPosition(figurePosition, fig[this.nextFigure.type][this.nextFigure.rotation]);

    if (isNotAvailable) {
      return false;
    }

    this.clearPreviousPositions(figurePosition, isNotAvailable);

    for (const [i, cell] of figurePosition.entries()) {
      const index = cell.index + fig[this.nextFigure.type][this.nextFigure.rotation][i];

      if (figurePosition[figurePosition.length - 1].index + this.nextFigure.directionStep < this.board.length && !isNotAvailable) {
        this.board[index] = new TetrisCellModel(cell.type, cell.cellNumber);
      }
    }

    this.putFigure();
    this.nextFigure.rotation++;
    if (this.nextFigure.rotation === 4) {
      this.nextFigure.rotation = 0;
    }
  }

  splitBoardByRows() {
    return this.board.reduce((acc, cell, index) => {
      if (index % this.rowSize === 0) {
        acc.push([cell]);
      } else {
        acc[acc.length - 1].push(cell);
      }
      return acc;
    }, []);
  }

  clearRow() {
    const arr = this.splitBoardByRows();
    arr.forEach((row: TetrisCell[], rowIndex: number, rows: TetrisCell[][]) => {
      if (row.every((cell: TetrisCell) => cell.isStuck && cell.type)) {
        rows.splice(rowIndex, 1);
        rows.unshift(new Array(this.rowSize).fill(null).map((e: TetrisCell) => new TetrisCellModel('', 0)));
        this.endGame.next(false);
        this.moveInterval = interval(300);
        this.moveInterval.pipe(
          takeUntil(this.endGame)
        ).subscribe(_ => {
          this.nextFigure.directionStep = this.rowSize;
          this.moveFigure();
        });
      }
      return row;
    });

    this.board = arr.reduce((newBoard: TetrisCell[], row: TetrisCell[]) => newBoard.concat(row), []);
  }

  setBoardStyle(): { width: string } {
    return {
      width: Math.sqrt(this.boardSize) * this.cellSize + this.borderSize + 'px'
    };
  }

  @HostListener('window:keydown', ['$event'])
  snakeDirectionListener(event): void {
    switch (event.keyCode) {
      case Directions.RIGHT:
        this.nextFigure.directionStep = 1;
        break;

      case Directions.LEFT:
        this.nextFigure.directionStep = -1;
        break;

      case Directions.UP:
        this.nextFigure.directionStep = 0;
        this.rotateFigure();
        break;

      case Directions.DOWN:
        this.nextFigure.directionStep = this.rowSize;
        break;
      default:
        this.nextFigure.directionStep = 0;
    }
    if (this.nextFigure.directionStep) {
      this.moveFigure();
    }
  }
}