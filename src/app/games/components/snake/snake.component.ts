import { Component, HostListener, OnDestroy } from '@angular/core';

// rxjs
import { interval, Observable, Subscription } from 'rxjs';

import { SnakeCell, Directions, Snake } from './interfaces';

@Component({
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnDestroy {
  gameStarted = false;
  size = 20;
  initialCell: SnakeCell = { isSnakeTail: false, isApple: false };
  board: SnakeCell[] = new Array(this.size * this.size).fill(this.initialCell);
  snake: Snake;
  moveInterval: Observable<number> = interval(1000);
  subscription: Subscription;

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startGame(): void {
    this.snake = {
      tail: [{ idx: 0 }, { idx: 1 }, { idx: 2 }],
      moveDirection: Directions.RIGHT,
      eatPoints: 1
    };
    this.setSnake();
    this.setFruit();
    this.gameStarted = true;
    this.subscription = this.moveInterval.subscribe(() => this.snakeMove(this.snake));
  }

  setSnake(): any {
    for (const tail of this.snake.tail) {
      this.board[tail.idx] = { isSnakeTail: true, isApple: false };
    }
  }

  snakeMove(snake) {
    const snakeHead = snake.tail[snake.tail.length - 1];

    this.board[snake.tail[0].idx] = { isSnakeTail: false, isApple: false };

    snake.tail.map((tail, idx, tails) => {
      const nextTail = tails[idx + 1];
      if (nextTail) {
        tail.idx = nextTail.idx;
      }
    });

    this.headMove(snakeHead);
    if (this.board[snakeHead.idx].isSnakeTail) {
      return this.eatTail() ? alert(`You loose your score is: ${this.snake.eatPoints}`) : false;
    }
    if (this.board[snakeHead.idx].isApple) {
      this.eatPoint();
    }
    this.setSnake();
  }

  headMove(head): void {
    if (this.snake.moveDirection === Directions.RIGHT) {
      head.idx += 1;
      if (head.idx !== 0 && head.idx % 20 === 0) {
        head.idx -= 20;
      }
    } else if (this.snake.moveDirection === Directions.LEFT) {
      if (head.idx % 20 === 0) {
        head.idx += 19;
      } else {
        head.idx -= 1;
      }
    } else if (this.snake.moveDirection === Directions.DOWN) {
      const newIndex = this.board.length - head.idx - this.size;
      if (newIndex <= 0) {
        head.idx = Math.abs(newIndex);
      } else {
        head.idx += 20;
      }
    } else if (this.snake.moveDirection === Directions.UP) {
      if (head.idx >= 0 && head.idx < 20) {
        head.idx = this.board.length - this.size + head.idx;
      } else {
        head.idx -= 20;
      }
    }
  }

  eatPoint(): void {
    this.setFruit();
    const newTail = { idx: this.snake.tail[0].idx - 1 };
    this.snake.tail.unshift(newTail);
    this.snake.eatPoints += 1;

    const intervalTime = this.snake.eatPoints < 10 ? 1050 - this.snake.eatPoints * 100 : 50;
    this.subscription.unsubscribe();
    this.moveInterval = interval(intervalTime);
    this.subscription = this.moveInterval.subscribe(() => this.snakeMove(this.snake));
  }

  eatTail(): boolean {
    this.subscription.unsubscribe();
    this.gameStarted = false;
    this.board.fill(this.initialCell);

    return true;
  }

  setSnakeStyle(cell: SnakeCell) {
    return {
      'background-color': cell.isSnakeTail ? '#755de2' : cell.isApple ? '#eca451' : '#cccccc'
    };
  }

  setFruit(): void {
    const fruitPlace = Math.floor(Math.random() * this.board.length);
    if (this.board[fruitPlace].isSnakeTail) {
      this.setFruit();
    } else {
      this.board[fruitPlace] = { isSnakeTail: false, isApple: true };
    }
  }

  @HostListener('window:keydown', ['$event'])
  snakeDirectionListener(event): void {
    switch (event.keyCode) {
      case Directions.RIGHT:
        if (this.snake.moveDirection !== Directions.LEFT) {
          this.snake.moveDirection = Directions.RIGHT;
          this.snakeMove(this.snake);
        }
        break;

      case Directions.LEFT:
        if (this.snake.moveDirection !== Directions.RIGHT) {
          this.snake.moveDirection = Directions.LEFT;
          this.snakeMove(this.snake);
        }
        break;

      case Directions.UP:
        if (this.snake.moveDirection !== Directions.DOWN) {
          this.snake.moveDirection = Directions.UP;
          this.snakeMove(this.snake);
        }
        break;

      case Directions.DOWN:
        if (this.snake.moveDirection !== Directions.UP) {
          this.snake.moveDirection = Directions.DOWN;
          this.snakeMove(this.snake);
        }
        break;
    }
  }
}
