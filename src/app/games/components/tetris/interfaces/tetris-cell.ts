export class TetrisCellModel {
  constructor(
    public type = '',
    public cellNumber = 0,
    public isStuck = false
  ) { }
}

export interface TetrisCell {
  type: string;
  cellNumber: number;
  index?: number;
  isStuck: boolean;
  transponedState?: number[];
  directionStep?: number;
}

export enum TetrisFigureType {
  STRAIGHT,
  SIGMA,
  THREEENDS,
  GTYPE,
  KUBE
}
