import { Component, HostListener } from '@angular/core';

import { DIRECTIONS } from 'src/app/shared';

@Component({
  selector: 'app-twenty-forty-eight',
  templateUrl: './twenty-forty-eight.component.html',
  styleUrls: ['./twenty-forty-eight.component.scss']
})
export class TwentyFortyEightComponent {
  boardSize = 3;
  borderSize = 1;
  cellSize = 50;
  gameStart = false;
  showBoard = false;
  initialCell = { number: 0 };
  board: Array<{ number: number }>;

  @HostListener('document:keydown', ['$event.keyCode'])
  addMoveListener(direction: number) {
    if (DIRECTIONS.RIGHT === direction) {
      console.log('RIGHT')
    }
  }

  startGame() {
    this.gameStart = true;
  }

  buildBoard(size: number): void {
    this.boardSize = Math.pow(size, 2);
    this.board = new Array(this.boardSize).fill(this.initialCell);
    this.showBoard = true;

    this.setNumber();
  }

  generateRandomNumber(): number {
    return Math.random() >= 0.5 ? 2 : 4;
  }

  setNumber() {
    const placeOnBoard = Math.floor(Math.random() * this.board.length);
    this.board[placeOnBoard] = { number: this.generateRandomNumber() };
  }

  setBoardStyle() {
    return {
      width: Math.sqrt(this.boardSize) * this.cellSize + this.borderSize + 'px'
    };
  }
}
