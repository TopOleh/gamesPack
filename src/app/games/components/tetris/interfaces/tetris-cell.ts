export class TetrisCellModel {
  constructor(
    public type = '',
    public cellNumber = 0,
    public pointsEarned = 0,
    public isStuck = false,
    public rotation = 0,
  ) { }
}

export interface TetrisCell {
  type: string;
  cellNumber: number;
  index?: number;
  isStuck: boolean;
  rotation: number;
  directionStep?: number;
  pointsEarned: number;
}

export enum TetrisFigureType {
  I,
  S,
  T,
  L,
  O
}
