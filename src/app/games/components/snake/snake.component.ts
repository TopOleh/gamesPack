import { Component, OnInit } from '@angular/core';

import { Snake } from './interfaces/snake';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {
  size = 20;
  board: number[] = new Array(this.size * this.size);

  constructor() { }

  ngOnInit() {
  }

  setCellStyle() {
    return {
      color: '#ccc',
      height: '10px',
      width: '10px',
    };
  }
}
