import { takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';

// rxjs
import { Observable, interval, Subject } from 'rxjs';
import { TetrisCell, TetrisCellModel } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FigureService {
  private endGame: Subject<boolean> = new Subject();
  private figureSpeed = 2000;

  setFigureSpeed(): Observable<number> {
    this.figureSpeed = this.figureSpeed > 400 ? this.figureSpeed -= 200 : this.figureSpeed;
    this.endGame.next(false);
    return interval(this.figureSpeed).pipe(
      takeUntil(this.endGame)
    );
  }

  buildNewTetrisArray(size: number): TetrisCell[] {
    return new Array(size).fill(null).map(() => new TetrisCellModel('', 0));
  }
}
