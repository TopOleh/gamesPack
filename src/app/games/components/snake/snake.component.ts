import { Component, OnInit, HostListener } from '@angular/core';

import { SnakeCell, Directions, Snake } from './interfaces';

@Component({
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {
  size = 20;
  initialCell: SnakeCell = { isSnakeTail: false, isApple: false };
  board: SnakeCell[] = new Array(this.size * this.size).fill(this.initialCell);
  snake: Snake = {
    tail: [{ idx: 0 }, { idx: 1 }, { idx: 2 }],
    moveDirection: Directions.RIGHT
  };

  ngOnInit() {
    this.setSnake();
    this.snakeMove();
  }

  clearBoard() {
    this.board.fill(this.initialCell);
  }

  setSnake() {
    for (const tail of this.snake.tail) {
      if (tail.idx !== 0 && tail.idx % 20 === 0) {
        tail.idx -= 20;
      }

      this.board[tail.idx] = { isSnakeTail: true, isApple: false };
    }
  }

  snakeMove() {
    setTimeout(() => {
      this.snake.tail.map((tail) => {
        tail.idx += 1;
      });
      this.clearBoard();
      this.setSnake();
      this.snakeMove();
    }, 300);
  }

  setSnakeStyle(cell: SnakeCell) {
    return {
      'background-color': cell.isSnakeTail ? '#755de2' : '#cccccc'
    };
  }

  @HostListener('window:keydown', ['$event'])
  addKeyListener(event) {
    switch (event.keyCode) {
      case Directions.RIGHT:
        if (this.snake.moveDirection !== Directions.LEFT) {
          this.snake.moveDirection = Directions.RIGHT;
        }
        break;

      case Directions.LEFT:
        if (this.snake.moveDirection !== Directions.RIGHT) {

          this.snake.moveDirection = Directions.LEFT;
        }
        break;

      case Directions.UP:
        if (this.snake.moveDirection !== Directions.DOWN) {
          this.snake.moveDirection = Directions.UP;
        }
        break;

      case Directions.DOWN:
        if (this.snake.moveDirection !== Directions.UP) {
          this.snake.moveDirection = Directions.DOWN;
        }
        break;
      default:
    }
  }
}
