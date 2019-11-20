import { TetrisCellModel } from './interfaces/tetris-cell';
import { Component, HostListener } from '@angular/core';

// rxjs
import { Observable, interval } from 'rxjs';

import { TetrisCellModel, TetrisCell, TetrisFigureType } from './interfaces';
import { Directions } from '../snake/interfaces';

@Component({
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})

export class TetrisComponent {
  isStucked: boolean;
  boardSize = 3;
  borderSize = 1;
  board: Array<TetrisCell>;
  cellSize = 20;
  figureLength = 4;
  gameStart: boolean;
  moveInterval: Observable<number> = interval(1000);
  showBoard: boolean;
  rowSize: number;

  // TODO: remove, For testing
  ngOnInit() {
    this.startNewGame();
  }

  startNewGame(): void {
    this.gameStart = true;
    const figure: TetrisCell = this.generateFigure();

    // TODO: remove, For testing
    this.buildBoard(9);

    this.setFigure(figure);
  }

  buildBoard(size: number): void {
    this.rowSize = size;
    this.boardSize = Math.pow(size, 2);
    this.board = new Array(this.boardSize).fill(null).map((e: TetrisCell) => new TetrisCellModel('', 0));
    this.showBoard = true;
  }

  generateFigure(): TetrisCell {
    const figureType = Math.floor(Math.random() * this.figureLength);
    const newFigure = new TetrisCellModel(TetrisFigureType[figureType], figureType);
    return newFigure;
  }

  setFigure(figure: TetrisCell): void {
    let boardPlace = Math.floor(this.rowSize / 2);


    switch (figure.type) {
      case 'SIGMA':
        this.board[boardPlace] = figure;
        this.board[boardPlace + 1] = figure;
        this.board[boardPlace + this.rowSize + 1] = figure;
        this.board[boardPlace + this.rowSize + 2] = figure;
        break;

      case 'KUBE':
        this.board[boardPlace] = figure;
        this.board[boardPlace + 1] = figure;
        this.board[boardPlace + this.rowSize] = figure;
        this.board[boardPlace + this.rowSize + 1] = figure;
        break;

      case 'THREEENDS':
        this.board[boardPlace] = figure;
        this.board[boardPlace + this.rowSize - 1] = figure;
        this.board[boardPlace + this.rowSize] = figure;
        this.board[boardPlace + this.rowSize + 1] = figure;
        break;

      case 'GTYPE':
        this.board[boardPlace] = figure;
        this.board[boardPlace + 1] = figure;
        this.board[boardPlace + 2] = figure;
        this.board[boardPlace + this.rowSize] = figure;
        break;

      default:
        for (let cellIndex = 0; cellIndex < this.figureLength; cellIndex++) {
          this.board[boardPlace] = figure;
          boardPlace++;
        }
        break;
    }
  }

  moveFigure(): void {
    let stuckEvery = false;

    const nextFigurePlace: TetrisCell[] = this.board.reduce((potentialPlace, cell, cellI) => {
      if (cell.type && !cell.isStuck) {
        const newCell: TetrisCell = new TetrisCellModel(cell.type, cell.cellNumber);
        newCell.index = cellI;

        potentialPlace.push(newCell);
      }

      return potentialPlace;
    }, []);

    for (let i = 0; i < nextFigurePlace.length; i++) {
      const nextCellPlace = nextFigurePlace[i].index + this.rowSize;

      if (this.board[nextCellPlace] && this.board[nextCellPlace].type && this.board[nextCellPlace].isStuck) {
        stuckEvery = true;
      }
    }


    for (let i = 0; i < nextFigurePlace.length; i++) {
      const index = nextFigurePlace[i].index;

      if (nextFigurePlace[nextFigurePlace.length - 1].index + this.rowSize < this.board.length && !stuckEvery) {
        this.board[index] = new TetrisCellModel();
      } else {
        this.board[index].isStuck = true;
      }
    }

    for (let i = 0; i < nextFigurePlace.length; i++) {
      const index = nextFigurePlace[i].index + this.rowSize;
      if (nextFigurePlace[nextFigurePlace.length - 1].index + this.rowSize < this.board.length && !stuckEvery) {
        this.board[index] = new TetrisCellModel(nextFigurePlace[i].type, nextFigurePlace[i].cellNumber);
      }
    }
    const figureInMove = this.board.filter(fig => !fig.isStuck && fig.type);

    if (!figureInMove.length) {
      const figure: TetrisCell = this.generateFigure();
      this.setFigure(figure);
    }
  }

  moveFigureLeft() {
    let stuckEvery = false;

    const nextFigurePlace: TetrisCell[] = this.board.reduce((potentialPlace, cell, cellI) => {
      if (cell.type && !cell.isStuck) {
        const newCell: TetrisCell = new TetrisCellModel(cell.type, cell.cellNumber);
        newCell.index = cellI;

        potentialPlace.push(newCell);
      }

      return potentialPlace;
    }, []);

    for (let i = 0; i < nextFigurePlace.length; i++) {
      const nextCellPlace = nextFigurePlace[i].index - 1;

      if (this.board[nextCellPlace] && this.board[nextCellPlace].type && this.board[nextCellPlace].isStuck) {
        stuckEvery = true;
      }
    }


    for (let i = 0; i < nextFigurePlace.length; i++) {
      const index = nextFigurePlace[i].index;

      if (nextFigurePlace[nextFigurePlace.length - 1].index - 1 < this.board.length && !stuckEvery) {
        this.board[index] = new TetrisCellModel();
      } else {
        this.board[index].isStuck = true;
      }
    }

    for (let i = 0; i < nextFigurePlace.length; i++) {
      const index = nextFigurePlace[i].index - 1;
      if (nextFigurePlace[nextFigurePlace.length - 1].index - 1 < this.board.length && !stuckEvery) {
        this.board[index] = new TetrisCellModel(nextFigurePlace[i].type, nextFigurePlace[i].cellNumber);
      }
    }
    const figureInMove = this.board.filter(fig => !fig.isStuck && fig.type);

    if (!figureInMove.length) {
      const figure: TetrisCell = this.generateFigure();
      this.setFigure(figure);
    }
  }

  moveFigureRight() {
    let stuckEvery = false;

    const nextFigurePlace: TetrisCell[] = this.board.reduce((potentialPlace, cell, cellI) => {
      if (cell.type && !cell.isStuck) {
        const newCell: TetrisCell = new TetrisCellModel(cell.type, cell.cellNumber);
        newCell.index = cellI;

        potentialPlace.push(newCell);
      }

      return potentialPlace;
    }, []);

    for (let i = 0; i < nextFigurePlace.length; i++) {
      const nextCellPlace = nextFigurePlace[i].index + 1;

      if (this.board[nextCellPlace] && this.board[nextCellPlace].type && this.board[nextCellPlace].isStuck) {
        stuckEvery = true;
      }
    }


    for (let i = 0; i < nextFigurePlace.length; i++) {
      const index = nextFigurePlace[i].index;

      if (nextFigurePlace[nextFigurePlace.length - 1].index + 1 < this.board.length && !stuckEvery) {
        this.board[index] = new TetrisCellModel();
      } else {
        this.board[index].isStuck = true;
      }
    }

    for (let i = 0; i < nextFigurePlace.length; i++) {
      const index = nextFigurePlace[i].index + 1;
      if (nextFigurePlace[nextFigurePlace.length - 1].index + 1 < this.board.length && !stuckEvery) {
        this.board[index] = new TetrisCellModel(nextFigurePlace[i].type, nextFigurePlace[i].cellNumber);
      }
    }
    const figureInMove = this.board.filter(fig => !fig.isStuck && fig.type);

    if (!figureInMove.length) {
      const figure: TetrisCell = this.generateFigure();
      this.setFigure(figure);
    }
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
        this.moveFigureRight();
        break;

      case Directions.LEFT:
        this.moveFigureLeft();
        break;

      case Directions.UP:
        break;

      case Directions.DOWN:
        this.moveFigure();
        break;
    }
  }
}
