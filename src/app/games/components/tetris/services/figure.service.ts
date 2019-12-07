import { Injectable } from '@angular/core';

import { TetrisCell, TetrisCellModel } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FigureService {

  buildNewTetrisArray(size: number): TetrisCell[] {
    return new Array(size).fill(null).map(() => new TetrisCellModel('', 0));
  }

  splitBoardByRows(tetrisBoard: TetrisCell[], rowSize: number) {
    return tetrisBoard.reduce((acc, cell, index) => {
      if (index % rowSize === 0) {
        acc.push([cell]);
      } else {
        acc[acc.length - 1].push(cell);
      }
      return acc;
    }, []);
  }
}
