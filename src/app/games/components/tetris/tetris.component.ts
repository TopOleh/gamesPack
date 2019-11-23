import { Component, HostListener } from '@angular/core';

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

  startNewGame(): void {
    this.gameStart = true;
  }

  buildBoard(size: number): void {
    this.rowSize = size;
    this.boardSize = Math.pow(size, 2);
    this.board = new Array(this.boardSize).fill(null).map((e: TetrisCell) => new TetrisCellModel('', 0));
    this.showBoard = true;

    this.putFigure(this.showBoard);
  }

  generateFigure(): TetrisCell {
    const figureType = Math.floor(Math.random() * this.figureLength);
    const newFigure = new TetrisCellModel(TetrisFigureType[figureType], figureType);

    return newFigure;
  }

  generateFigurePosition(): void {
    let boardPlace = Math.floor(this.rowSize / 2);

    switch (this.nextFigure.type) {
      case 'SIGMA':
        this.board[boardPlace] = this.nextFigure;
        this.board[boardPlace + 1] = this.nextFigure;
        this.board[boardPlace + this.rowSize + 1] = this.nextFigure;
        this.board[boardPlace + this.rowSize + 2] = this.nextFigure;
        break;

      case 'KUBE':
        this.board[boardPlace] = this.nextFigure;
        this.board[boardPlace + 1] = this.nextFigure;
        this.board[boardPlace + this.rowSize] = this.nextFigure;
        this.board[boardPlace + this.rowSize + 1] = this.nextFigure;
        break;

      case 'THREEENDS':
        this.board[boardPlace] = this.nextFigure;
        this.board[boardPlace + this.rowSize - 1] = this.nextFigure;
        this.board[boardPlace + this.rowSize] = this.nextFigure;
        this.board[boardPlace + this.rowSize + 1] = this.nextFigure;
        break;

      case 'GTYPE':
        this.board[boardPlace] = this.nextFigure;
        this.board[boardPlace + 1] = this.nextFigure;
        this.board[boardPlace + 2] = this.nextFigure;
        this.board[boardPlace + this.rowSize] = this.nextFigure;
        break;

      default:
        for (let cellIndex = 0; cellIndex < this.figureLength; cellIndex++) {
          this.board[boardPlace] = this.nextFigure;
          boardPlace++;
        }
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

  nextFigurePosition(): TetrisCell[] {
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

  moveFigure(): void {
    const nextFigurePlace: TetrisCell[] = this.nextFigurePosition();
    const stuckEvery = this.checkNextFigurePosition(nextFigurePlace);

    this.clearPreviousPositions(nextFigurePlace, stuckEvery);
    this.putFigureOnNextPosition(nextFigurePlace, stuckEvery);
    this.putFigure();
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
        break;

      case Directions.DOWN:
        this.nextFigure.directionStep = this.rowSize;
        break;
    }
    if (this.nextFigure.directionStep) {
      this.moveFigure();
    }
  }
}
