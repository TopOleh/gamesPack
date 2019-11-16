export class TetrisCellModel {
  constructor(
    public type: string,
    public cellNumber: number
  ) { }
}

export interface TetrisCell {
  type: string;
  cellNumber: number;
}
